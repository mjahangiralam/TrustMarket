interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
}

interface ElevenLabsResponse {
  audio: ArrayBuffer;
}

class ElevenLabsService {
  private apiKey: string | null = null;
  private voices: ElevenLabsVoice[] = [];
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private useFallback = false;
  private fallbackVoices: SpeechSynthesisVoice[] = [];

  async initialize(apiKey: string): Promise<boolean> {
    try {
      this.apiKey = apiKey;
      
      // Try to initialize ElevenLabs first
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        await this.loadVoices();
        this.isInitialized = true;
        this.useFallback = false;
        console.log('ElevenLabs service initialized successfully');
        return true;
      } catch (elevenLabsError) {
        console.warn('ElevenLabs initialization failed, falling back to browser TTS:', elevenLabsError);
        return this.initializeFallback();
      }
    } catch (error) {
      console.error('Failed to initialize any TTS service:', error);
      return this.initializeFallback();
    }
  }

  private initializeFallback(): boolean {
    try {
      if ('speechSynthesis' in window) {
        // Load available voices
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.fallbackVoices = voices;
        } else {
          // Wait for voices to load
          speechSynthesis.onvoiceschanged = () => {
            this.fallbackVoices = speechSynthesis.getVoices();
          };
        }
        
        this.useFallback = true;
        this.isInitialized = true;
        console.log('Browser speech synthesis fallback initialized');
        return true;
      }
    } catch (error) {
      console.error('Failed to initialize browser TTS fallback:', error);
    }
    return false;
  }

  private async loadVoices(): Promise<void> {
    if (!this.apiKey) throw new Error('API key not set');

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load voices: ${response.statusText}`);
      }

      const data = await response.json();
      this.voices = data.voices || [];
      console.log(`Loaded ${this.voices.length} voices from ElevenLabs`);
    } catch (error) {
      console.error('Error loading voices:', error);
      // Use default voices if API fails
      this.voices = [
        { voice_id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', category: 'premade' },
        { voice_id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', category: 'premade' },
        { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', category: 'premade' },
        { voice_id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', category: 'premade' },
        { voice_id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', category: 'premade' }
      ];
    }
  }

  async speakText(text: string, voiceIndex: number = 0): Promise<void> {
    if (!this.isInitialized) {
      console.warn('TTS service not initialized');
      return;
    }

    if (this.useFallback) {
      await this.speakWithFallback(text, voiceIndex);
    } else {
      await this.speakWithElevenLabs(text, voiceIndex);
    }
  }

  private async speakWithElevenLabs(text: string, voiceIndex: number): Promise<void> {
    if (!this.apiKey || !this.audioContext) {
      console.warn('ElevenLabs not properly initialized');
      return;
    }

    if (this.voices.length === 0) {
      console.warn('No voices available');
      return;
    }

    const voice = this.voices[voiceIndex % this.voices.length];
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.voice_id}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      await this.playAudio(audioBuffer);
      
    } catch (error) {
      console.error('Error in ElevenLabs text-to-speech:', error);
      // Fallback to browser TTS if ElevenLabs fails
      await this.speakWithFallback(text, voiceIndex);
    }
  }

  private async speakWithFallback(text: string, voiceIndex: number): Promise<void> {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select voice
    if (this.fallbackVoices.length > 0) {
      const voice = this.fallbackVoices[voiceIndex % this.fallbackVoices.length];
      utterance.voice = voice;
    }

    // Configure speech parameters
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    speechSynthesis.speak(utterance);
  }

  private async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext) return;

    try {
      const decodedAudio = await this.audioContext.decodeAudioData(audioBuffer);
      const source = this.audioContext.createBufferSource();
      source.buffer = decodedAudio;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async speakMessage(message: string, agentName: string): Promise<void> {
    // Map agent names to different voices for variety
    const voiceMap: Record<string, number> = {
      'Alex': 0,
      'Sam': 1,
      'Jordan': 2,
      'Casey': 3,
      'Taylor': 4,
      'Morgan': 0,
      'Riley': 1,
      'Quinn': 2,
      'Avery': 3,
      'Blake': 4
    };

    const voiceIndex = voiceMap[agentName] || 0;
    await this.speakText(message, voiceIndex);
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  getVoiceCount(): number {
    if (this.useFallback) {
      return this.fallbackVoices.length;
    }
    return this.voices.length;
  }

  getServiceType(): string {
    return this.useFallback ? 'Browser TTS' : 'ElevenLabs';
  }

  // Resume audio context if suspended (required for autoplay policies)
  async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Stop all speech
  stop(): void {
    if (this.useFallback) {
      speechSynthesis.cancel();
    }
    // Note: ElevenLabs audio can't be stopped once started, but we can prevent new ones
  }
}

export const elevenLabsService = new ElevenLabsService(); 