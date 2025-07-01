import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

const milestones = [
  { year: '2022', event: 'AiEconLab founded with a mission to make economics interactive.' },
  { year: '2023', event: 'Development of Trust Market game begins.' },
  { year: '2024', event: 'Beta launch of Trust Market with AI-powered agents.' },
  { year: '2025', event: 'Public release and educational outreach.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">About AiEconLab & Trust Market</h1>
          <p className="mb-4 text-lg text-slate-700">
            <b>AiEconLab</b> is dedicated to advancing the understanding of economics, trust, and cooperation through interactive technology and artificial intelligence. Our mission is to make complex social science concepts accessible and engaging for everyone.
          </p>
          <p className="mb-4 text-lg text-slate-700">
            <b>Trust Market</b> is an interactive game and experiment designed to explore the dynamics of trust, cooperation, and strategy in social dilemmas. By simulating repeated interactions with AI agents, players can experience firsthand how trust is built, maintained, or broken, and how different strategies impact outcomes.
          </p>
          <p className="mb-4 text-lg text-slate-700">
            <b>Our Vision:</b> We believe that learning is most effective when it is hands-on and immersive. Trust Market is not just a game—it's a research tool, a classroom resource, and a platform for discovery. We aim to bridge the gap between academic theory and real-world behavior.
          </p>
          <p className="mb-8 text-lg text-slate-700">
            <b>The Science:</b> Trust Market is based on principles from game theory, behavioral economics, and psychology. Each AI agent is programmed with a unique strategy, allowing players to explore classic dilemmas like the Prisoner's Dilemma in a modern, interactive way.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Project Milestones</h2>
          <div className="relative pl-8 mb-8">
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-200 rounded"></div>
            {milestones.map((m, i) => (
              <div key={i} className="mb-6 flex items-start">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold mr-4 z-10 border-2 border-white shadow-lg">{m.year}</div>
                <div className="text-slate-700 text-lg">{m.event}</div>
              </div>
            ))}
          </div>
          <p className="text-lg text-slate-700">
            Join us as we continue to innovate at the intersection of AI, economics, and education!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
} 