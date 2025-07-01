import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

const pages = [
  { path: '/', label: 'Home', desc: 'Landing page and introduction.' },
  { path: '/about', label: 'About', desc: 'Learn about AiEconLab and Trust Market.' },
  { path: '/how-to-play', label: 'How to Play', desc: 'Instructions and tips for playing.' },
  { path: '/faq', label: 'FAQ', desc: 'Frequently asked questions.' },
  { path: '/contact', label: 'Contact', desc: 'Contact form and information.' },
  { path: '/terms', label: 'Terms of Service', desc: 'Legal terms and conditions.' },
  { path: '/privacy', label: 'Privacy Policy', desc: 'How we handle your data.' },
  { path: '/accessibility', label: 'Accessibility', desc: 'Accessibility features and statement.' },
  { path: '/game', label: 'Trust Market Game', desc: 'Play the interactive game.' },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8 text-blue-800">Sitemap</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((p, i) => (
              <Link key={i} to={p.path} className="block bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm hover:bg-blue-100 transition">
                <div className="text-2xl font-bold text-blue-700 mb-1">{p.label}</div>
                <div className="text-slate-700">{p.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 