import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

const faqs = [
  { q: 'What is Trust Market?', a: 'Trust Market is an interactive game that simulates social dilemmas and explores trust, cooperation, and strategy using AI agents.' },
  { q: 'Who can play?', a: 'Anyone! The game is designed for students, educators, researchers, and anyone interested in behavioral economics or game theory.' },
  { q: 'Is there a right way to play?', a: 'No single strategy guarantees success. Experiment with different approaches and learn from the outcomes!' },
  { q: 'What is educational mode?', a: 'Educational mode provides extra insights, prompts, and explanations to help you understand the underlying game theory concepts.' },
  { q: 'Can I use this for teaching?', a: 'Absolutely! Trust Market is a great tool for classroom demonstrations, assignments, or workshops.' },
  { q: 'What are the AI strategies?', a: 'Each AI agent uses a different game theory strategy, such as Tit-for-Tat, Grim Trigger, and more. This creates a dynamic and challenging environment.' },
  { q: 'Can I play multiple times?', a: 'Yes! Each game is unique, and you can experiment with different settings and strategies.' },
  { q: 'Is my data safe?', a: 'Yes. We do not sell or share your personal information. See our Privacy Policy for details.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8 text-blue-800">Frequently Asked Questions</h1>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="mb-4 border-b border-blue-100">
                <button
                  className="w-full text-left py-3 px-2 text-lg font-semibold text-blue-700 focus:outline-none flex justify-between items-center"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {faq.q}
                  <span className="ml-2 text-blue-400">{open === i ? '-' : '+'}</span>
                </button>
                {open === i && (
                  <div className="px-2 pb-3 text-slate-700 text-base animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 