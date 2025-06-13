import React from 'react';
import { Handshake, Sword, Brain } from 'lucide-react';
import { AIAgent } from '../types/game';

interface DecisionPhaseProps {
  currentRound: number;
  aiAgents: AIAgent[];
  onMakeDecision: (choice: 'cooperate' | 'defect') => void;
}

export function DecisionPhase({ currentRound, aiAgents, onMakeDecision }: DecisionPhaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-600 p-4 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Round {currentRound}</h2>
          <p className="text-xl text-slate-300">Make your strategic decision</p>
        </div>

        {/* AI Agents Status - STRATEGIES HIDDEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {aiAgents.map((agent) => (
            <div key={agent.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-center">
                <span className="text-4xl mb-3 block">{agent.avatar}</span>
                <h3 className="font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-slate-300 mb-4">{agent.personality}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Trust Level:</span>
                    <span className={`font-semibold ${
                      agent.trustLevel > 70 ? 'text-green-400' :
                      agent.trustLevel > 40 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {agent.trustLevel}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Strategy:</span>
                    <span className="text-slate-500 text-xs">Hidden</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => onMakeDecision('cooperate')}
            className="group bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <div className="text-center">
              <Handshake className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-4">Cooperate</h3>
              <p className="text-green-100 mb-4">
                Work together for mutual benefit. Trust that others will do the same.
              </p>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-sm">
                  <strong>If all cooperate:</strong> +3 points each<br />
                  <strong>If you cooperate, others defect:</strong> 0 points for you
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onMakeDecision('defect')}
            className="group bg-gradient-to-br from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <div className="text-center">
              <Sword className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-4">Defect</h3>
              <p className="text-red-100 mb-4">
                Prioritize your own gain. Take advantage while you can.
              </p>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-sm">
                  <strong>If you defect, others cooperate:</strong> +5 points for you<br />
                  <strong>If all defect:</strong> +1 point each
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Strategic Consideration</h4>
            <p className="text-slate-300 text-sm">
              Your choice will affect AI trust levels and influence their future decisions. 
              Consider the long-term implications of your strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}