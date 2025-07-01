import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

const phases = [
  { title: 'Setup', desc: 'Configure your game: rounds, AIs, and options.' },
  { title: 'Discussion', desc: 'Chat with AI agents about the round topic.' },
  { title: 'Decision', desc: 'Choose to cooperate or defect in secret.' },
  { title: 'Results', desc: 'See payoffs and trust changes.' },
  { title: 'Debrief', desc: 'Review strategies and get feedback.' },
];

const tips = [
  { icon: '🤝', text: 'Build trust early for better outcomes.' },
  { icon: '🧠', text: 'Adapt to AI personalities and strategies.' },
  { icon: '💬', text: 'Use discussion to influence decisions.' },
  { icon: '🔄', text: 'Experiment with both cooperation and defection.' },
];

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">How to Play</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Game Phases</h2>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              {phases.map((p, i) => (
                <div key={i} className="flex-1 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow-sm">
                  <div className="text-xl font-bold text-blue-700 mb-1">{p.title}</div>
                  <div className="text-slate-700">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Step-by-Step</h2>
          <ol className="list-decimal ml-6 mb-8 text-lg text-slate-700">
            <li className="mb-2">Choose your game settings and start the game.</li>
            <li className="mb-2">Engage in discussion with AI agents to build trust or mislead.</li>
            <li className="mb-2">Make your decision: cooperate or defect. Each AI will do the same.</li>
            <li className="mb-2">Review the results and see how your choices affected payoffs and trust.</li>
            <li className="mb-2">At the end, analyze your performance and learn from the debrief.</li>
          </ol>
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Tips for Success</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((t, i) => (
              <li key={i} className="flex items-center bg-blue-100 rounded-lg p-3 text-lg">
                <span className="text-2xl mr-3">{t.icon}</span> {t.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
} 