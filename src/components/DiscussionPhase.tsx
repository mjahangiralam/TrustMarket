import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock, Send, BookOpen, Lightbulb, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { ChatMessage, AIAgent } from '../types/game';
import { elevenLabsService } from '../services/elevenLabsService';

interface DiscussionPhaseProps {
  topic: string;
  messages: ChatMessage[];
  timeRemaining: number;
  aiAgents: AIAgent[];
  onAddMessage: (message: string) => void;
  onTimeUp: () => void;
  educationalMode?: boolean;
  elevenLabsKey?: string;
}

export function DiscussionPhase({ 
  topic, 
  messages, 
  timeRemaining, 
  aiAgents,
  onAddMessage,
  onTimeUp,
  educationalMode = false,
  elevenLabsKey
}: DiscussionPhaseProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [showConcepts, setShowConcepts] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize ElevenLabs service when component mounts
  useEffect(() => {
    if (elevenLabsKey && !audioInitialized) {
      elevenLabsService.initialize(elevenLabsKey).then((success) => {
        setAudioInitialized(success);
        if (success) {
          elevenLabsService.resumeAudioContext();
        }
      });
    } else if (!elevenLabsKey && !audioInitialized) {
      // Try to initialize with fallback even without API key
      elevenLabsService.initialize('').then((success) => {
        setAudioInitialized(success);
      });
    }
  }, [elevenLabsKey, audioInitialized]);

  // Handle new AI messages with audio
  useEffect(() => {
    if (messages.length > 0 && audioEnabled && audioInitialized) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isAI && elevenLabsService.isReady()) {
        // Add a small delay to ensure the message is rendered first
        setTimeout(() => {
          elevenLabsService.speakMessage(lastMessage.message, lastMessage.sender);
        }, 500);
      }
    }
  }, [messages, audioEnabled, audioInitialized]);

  // Debug effect to log messages
  useEffect(() => {
    console.log('DiscussionPhase messages updated:', messages);
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onAddMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAgentInfo = (senderName: string) => {
    return aiAgents.find(agent => agent.name === senderName);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const glossaryTerms = [
    { term: 'Nash Equilibrium', definition: 'A stable strategy where no player benefits by changing their decision unilaterally.' },
    { term: 'Tit-for-Tat', definition: 'A strategy that mirrors the opponent\'s previous move.' },
    { term: 'Grim Trigger', definition: 'A strategy that cooperates until the first defection, then defects permanently.' },
    { term: 'Subgame Perfect', definition: 'A strategy that represents optimal play at every decision point.' }
  ];

  // Get human player name and avatar
  const humanName = 'You';
  const humanAvatar = '👤';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Discussion Phase</h2>
              {educationalMode && (
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => setShowConcepts(!showConcepts)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    Concepts
                  </button>
                  <button
                    onClick={() => setShowGlossary(!showGlossary)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Glossary
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {/* Audio Controls */}
              {(elevenLabsKey || audioInitialized) && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleAudio}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      audioEnabled 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                    title={audioEnabled ? 'Disable audio' : 'Enable audio'}
                  >
                    {audioEnabled ? (
                      <Volume2 className="w-4 h-4 mr-1" />
                    ) : (
                      <VolumeX className="w-4 h-4 mr-1" />
                    )}
                    {audioEnabled ? 'Audio On' : 'Audio Off'}
                  </button>
                  
                  <button
                    onClick={onTimeUp}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    title="Skip to next phase"
                  >
                    <SkipForward className="w-4 h-4 mr-1" />
                    Skip
                  </button>
                </div>
              )}
              
              {/* Timer */}
              <div className="flex items-center bg-slate-800 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                <span className={`font-mono text-lg font-bold ${timeRemaining <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-2">Discussion Topic:</h3>
            <p className="text-white text-lg">{topic}</p>
          </div>

          {/* Audio Status */}
          {(elevenLabsKey || audioInitialized) && (
            <div className={`mt-4 rounded-lg p-3 ${
              audioInitialized 
                ? 'bg-green-600/20 border border-green-500/30' 
                : 'bg-yellow-600/20 border border-yellow-500/30'
            }`}>
              <div className="flex items-center">
                {audioInitialized ? (
                  <Volume2 className="w-4 h-4 text-green-400 mr-2" />
                ) : (
                  <VolumeX className="w-4 h-4 text-yellow-400 mr-2" />
                )}
                <span className={`text-sm ${audioInitialized ? 'text-green-300' : 'text-yellow-300'}`}>
                  {audioInitialized 
                    ? `${elevenLabsService.getServiceType()} Ready (${elevenLabsService.getVoiceCount()} voices available)`
                    : 'Initializing TTS service...'
                  }
                </span>
              </div>
              {!elevenLabsKey && audioInitialized && (
                <p className="text-xs text-yellow-300 mt-1">
                  Using browser TTS (add ElevenLabs API key for premium voices)
                </p>
              )}
              {elevenLabsKey && audioInitialized && (
                <div className="text-xs text-blue-300 mt-2">
                  <p className="font-semibold mb-1">Voice Assignments:</p>
                  {aiAgents.map((agent) => {
                    const voiceIndex = elevenLabsService.getVoiceIndexForAgent(agent.name);
                    const voiceInfo = elevenLabsService.getVoiceInfo()[voiceIndex];
                    return (
                      <p key={agent.id} className="text-xs">
                        {agent.avatar} {agent.name}: {voiceInfo?.name || `Voice ${voiceIndex + 1}`}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Educational Concepts Panel */}
          {educationalMode && showConcepts && (
            <div className="mt-4 bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-3">💡 Key Concepts to Consider</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-800/50 rounded p-3">
                  <strong className="text-white">Prisoner's Dilemma:</strong>
                  <p className="text-slate-300 mt-1">Mutual cooperation benefits all, but individual defection offers higher immediate payoff.</p>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <strong className="text-white">Trust Building:</strong>
                  <p className="text-slate-300 mt-1">Consistent behavior builds reputation and influences future interactions.</p>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <strong className="text-white">Strategic Foresight:</strong>
                  <p className="text-slate-300 mt-1">Consider how current decisions affect future rounds and relationships.</p>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <strong className="text-white">Reputation Effects:</strong>
                  <p className="text-slate-300 mt-1">Your actions create expectations that influence others' strategies.</p>
                </div>
              </div>
            </div>
          )}

          {/* Inline Glossary */}
          {educationalMode && showGlossary && (
            <div className="mt-4 bg-indigo-600/20 border border-indigo-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-300 mb-3">📚 Game Theory Glossary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="bg-slate-800/50 rounded p-3">
                    <strong className="text-white">{item.term}:</strong>
                    <p className="text-slate-300 mt-1">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat Area - FIXED */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length > 0 ? (
              messages.map((message, idx) => {
                const agent = getAgentInfo(message.sender);
                const isHuman = !message.isAI;
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} animate-fade-in-slide`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div
                      className={`max-w-sm rounded-2xl p-4 shadow-lg relative transition-all duration-300 ${
                        message.isAI
                          ? 'bg-slate-700 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">
                          {message.isAI ? agent?.avatar : humanAvatar}
                        </span>
                        <span className="font-semibold text-sm">
                          {message.isAI ? message.sender : humanName}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-400 py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Discussion will begin shortly...</p>
                <p className="text-sm mt-2">AI agents will share their thoughts on the topic</p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share your thoughts on the topic..."
                disabled={timeRemaining === 0}
                className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || timeRemaining === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* AI Agents Info - Strategies Hidden */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {aiAgents.map((agent) => (
            <div key={agent.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{agent.avatar}</span>
                <div>
                  <h4 className="font-semibold text-white">{agent.name}</h4>
                  <p className="text-xs text-slate-400">Strategy Hidden</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>Trust Level</span>
                  <span>{agent.trustLevel}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      agent.trustLevel > 70
                        ? 'bg-green-500'
                        : agent.trustLevel > 40
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${agent.trustLevel}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-slate-400">
                <p>Messages: {agent.messageCount || 0}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Discussion Engagement Indicator */}
        <div className="mt-4 bg-green-600/20 border border-green-500/30 rounded-lg p-3">
          <p className="text-green-300 text-sm text-center">
            💬 AI agents are actively participating - each agent sends messages every 12 seconds minimum
          </p>
        </div>
      </div>
    </div>
  );
}