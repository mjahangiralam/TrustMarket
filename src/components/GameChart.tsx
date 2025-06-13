import React from 'react';
import { TrendingUp, BarChart3, ToggleLeft, ToggleRight } from 'lucide-react';
import { GameRound } from '../types/game';

interface GameChartProps {
  rounds: GameRound[];
  showPerRound?: boolean;
  onToggleMode?: () => void;
}

export function GameChart({ rounds, showPerRound = false, onToggleMode }: GameChartProps) {
  if (rounds.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center text-slate-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Performance chart will appear after the first round</p>
        </div>
      </div>
    );
  }

  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 50;

  // Calculate data points based on display mode
  const dataPoints = rounds.map((round, index) => ({
    round: round.round,
    value: showPerRound ? round.humanPayoff : round.cumulativePayoff,
    choice: round.humanChoice
  }));

  const maxValue = Math.max(...dataPoints.map(p => p.value));
  const minValue = Math.min(...dataPoints.map(p => p.value), 0);
  const range = maxValue - minValue || 1;

  // Reference lines
  const neutralLine = showPerRound ? 2 : rounds.length * 2; // Neutral baseline
  const cooperativeLine = showPerRound ? 3 : rounds.length * 3; // Average cooperative payoff
  const defectionLine = showPerRound ? 1.5 : rounds.length * 1.5; // Average defection payoff

  // Calculate points for the line
  const points = dataPoints.map((point, index) => {
    const x = padding + (index / (dataPoints.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((point.value - minValue) / range) * (chartHeight - 2 * padding);
    return { x, y, ...point };
  });

  // Create path string for the line
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Helper function to calculate Y position for reference lines
  const getRefLineY = (value: number) => {
    return chartHeight - padding - ((value - minValue) / range) * (chartHeight - 2 * padding);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <TrendingUp className="w-6 h-6 mr-3" />
          Cumulative Payoff Over Rounds
        </h3>
        <div className="flex items-center space-x-4">
          {onToggleMode && (
            <button
              onClick={onToggleMode}
              className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showPerRound ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              <span className="text-sm">
                {showPerRound ? 'Per-Round' : 'Cumulative'}
              </span>
            </button>
          )}
          <div className="text-right">
            <p className="text-slate-300 text-sm">Current Score</p>
            <p className="text-2xl font-bold text-green-400">
              {showPerRound ? rounds[rounds.length - 1]?.humanPayoff || 0 : rounds[rounds.length - 1]?.cumulativePayoff || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-slate-800 rounded-lg p-4">
        <svg width={chartWidth} height={chartHeight} className="w-full h-64">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Reference lines */}
          {!showPerRound && (
            <>
              {/* Neutral line (zero baseline) */}
              <line
                x1={padding}
                y1={getRefLineY(0)}
                x2={chartWidth - padding}
                y2={getRefLineY(0)}
                stroke="#6B7280"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <text x={chartWidth - padding + 5} y={getRefLineY(0) + 5} fill="#6B7280" fontSize="12">
                Neutral (0)
              </text>
              
              {/* Cooperative payoff line */}
              <line
                x1={padding}
                y1={getRefLineY(cooperativeLine)}
                x2={chartWidth - padding}
                y2={getRefLineY(cooperativeLine)}
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <text x={chartWidth - padding + 5} y={getRefLineY(cooperativeLine) + 5} fill="#10B981" fontSize="12">
                Cooperative
              </text>
              
              {/* Defection payoff line */}
              <line
                x1={padding}
                y1={getRefLineY(defectionLine)}
                x2={chartWidth - padding}
                y2={getRefLineY(defectionLine)}
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <text x={chartWidth - padding + 5} y={getRefLineY(defectionLine) + 5} fill="#EF4444" fontSize="12">
                Defection
              </text>
            </>
          )}
          
          {/* Y-axis labels */}
          <text x="10" y="50" fill="#9CA3AF" fontSize="12">{maxValue}</text>
          <text x="10" y={chartHeight/2} fill="#9CA3AF" fontSize="12">{Math.round((maxValue + minValue) / 2)}</text>
          <text x="10" y={chartHeight - 20} fill="#9CA3AF" fontSize="12">{minValue}</text>
          
          {/* X-axis label */}
          <text x={chartWidth/2} y={chartHeight - 5} fill="#9CA3AF" fontSize="14" textAnchor="middle">
            Gaming Round
          </text>
          
          {/* Y-axis label */}
          <text x="20" y="30" fill="#9CA3AF" fontSize="14" textAnchor="middle">
            Payoff
          </text>
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, index) => {
            const isCooperate = point.choice === 'cooperate';
            
            return (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={isCooperate ? '#10B981' : '#EF4444'}
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="hover:r-8 transition-all cursor-pointer"
                />
                
                {/* Round labels - FIXED Y POSITION */}
                <text
                  x={point.x}
                  y={chartHeight - padding + 15}
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {point.round}
                </text>
                
                {/* Tooltip on hover */}
                <title>
                  Round {point.round}: {point.value} points
                  Choice: {point.choice}
                  {showPerRound ? `Round Gain: +${point.value}` : `Cumulative: ${point.value}`}
                </title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-slate-300">Cooperate</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-slate-300">Defect</span>
        </div>
        {!showPerRound && (
          <>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-gray-500 mr-2" style={{opacity: 0.7}}></div>
              <span className="text-sm text-slate-300">Neutral</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-green-500 mr-2" style={{opacity: 0.7}}></div>
              <span className="text-sm text-slate-300">Cooperative Avg</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-red-500 mr-2" style={{opacity: 0.7}}></div>
              <span className="text-sm text-slate-300">Defection Avg</span>
            </div>
          </>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.filter(r => r.humanChoice === 'cooperate').length}
          </p>
          <p className="text-sm text-slate-400">Cooperations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.filter(r => r.humanChoice === 'defect').length}
          </p>
          <p className="text-sm text-slate-400">Defections</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.length > 0 ? Math.round((rounds[rounds.length - 1].cumulativePayoff / rounds.length) * 10) / 10 : 0}
          </p>
          <p className="text-sm text-slate-400">Avg/Round</p>
        </div>
      </div>
    </div>
  );
}