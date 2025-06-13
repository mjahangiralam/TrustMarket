import React from 'react';
import { Key, Mic, Brain } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeysSubmit: (keys: { elevenLabsKey: string; aiPersonalityKey: string }) => void;
}

export function ApiKeySetup({ onApiKeysSubmit }: ApiKeySetupProps) {
  const [apiKeys, setApiKeys] = React.useState({
    elevenLabsKey: '',
    aiPersonalityKey: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeysSubmit(apiKeys);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">API Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Mic className="w-5 h-5 mr-2" />
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={apiKeys.elevenLabsKey}
              onChange={(e) => setApiKeys(prev => ({ ...prev, elevenLabsKey: e.target.value }))}
              placeholder="Enter your ElevenLabs API key"
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="text-sm text-slate-400 mt-1">
              Used for text-to-speech conversion of AI discussions
            </p>
          </div>

          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Brain className="w-5 h-5 mr-2" />
              AI Personality API Key
            </label>
            <input
              type="password"
              value={apiKeys.aiPersonalityKey}
              onChange={(e) => setApiKeys(prev => ({ ...prev, aiPersonalityKey: e.target.value }))}
              placeholder="Enter your AI Personality API key"
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="text-sm text-slate-400 mt-1">
              Used to influence AI personalities and decision-making
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Save API Keys
        </button>
      </form>
    </div>
  );
} 