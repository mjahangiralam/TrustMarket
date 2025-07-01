import React from 'react';
import { FiKey, FiMic, FiUser } from 'react-icons/fi';

export function ApiKeySetup({ onSubmit }: { onSubmit: (keys: { elevenLabsKey: string; aiPersonalityKey: string }) => void }) {
  const [elevenLabsKey, setElevenLabsKey] = React.useState('');
  const [aiPersonalityKey, setAIPersonalityKey] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ elevenLabsKey, aiPersonalityKey });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{background: 'radial-gradient(circle at 30% 20%, #6366f1 0%, transparent 60%), radial-gradient(circle at 70% 80%, #a78bfa 0%, transparent 70%)'}}></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-blue-600/60 via-purple-600/60 to-slate-800/80 p-1 rounded-3xl shadow-2xl">
          <div className="bg-slate-900 rounded-3xl p-8">
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-tight">API Configuration</h2>
            <div className="mb-6 space-y-2 text-center">
              <div className="text-slate-300 text-sm">
                Need an API key?{' '}
                <a href="https://www.elevenlabs.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-semibold hover:text-blue-300 transition">Create an ElevenLabs account</a>{' '}and{' '}
                <a href="https://elevenlabs.io/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-semibold hover:text-blue-300 transition">get your API key</a>.<br/>
                For AI Personality,{' '}
                <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline font-semibold hover:text-purple-300 transition">sign up for OpenAI</a>{' '}and{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline font-semibold hover:text-purple-300 transition">create an API key</a>.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-7 mt-4">
              <div>
                <label className="block text-slate-200 font-semibold mb-2 flex items-center">
                  <FiMic className="mr-2 text-blue-400" /> ElevenLabs API Key
                </label>
                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type="text"
                    className="w-full rounded-lg pl-10 pr-4 py-3 bg-slate-800 text-white border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition"
                    placeholder="Enter your ElevenLabs API key"
                    value={elevenLabsKey}
                    onChange={e => setElevenLabsKey(e.target.value)}
                  />
                </div>
                <div className="text-slate-400 text-xs mt-1 ml-1">Used for text-to-speech conversion of AI discussions</div>
              </div>
              <div>
                <label className="block text-slate-200 font-semibold mb-2 flex items-center">
                  <FiUser className="mr-2 text-purple-400" /> AI Personality API Key
                </label>
                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                  <input
                    type="text"
                    className="w-full rounded-lg pl-10 pr-4 py-3 bg-slate-800 text-white border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder-slate-400 transition"
                    placeholder="Enter your AI Personality API key"
                    value={aiPersonalityKey}
                    onChange={e => setAIPersonalityKey(e.target.value)}
                  />
                </div>
                <div className="text-slate-400 text-xs mt-1 ml-1">Used to influence AI personalities and decision-making</div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-all duration-200 mt-2"
              >
                Save API Keys
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 