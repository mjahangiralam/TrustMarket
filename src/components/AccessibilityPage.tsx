import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

const features = [
  { icon: '⌨️', text: 'Full keyboard navigation' },
  { icon: '🎨', text: 'High color contrast and readable fonts' },
  { icon: '🦻', text: 'Screen reader compatibility' },
  { icon: '📝', text: 'Descriptive alt text for images' },
  { icon: '🛠️', text: 'Continuous accessibility improvements' },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Accessibility</h1>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Commitment</h2>
            <p className="text-slate-700">We are committed to making Trust Market accessible to everyone, regardless of ability or technology. We follow best practices and welcome feedback to improve further.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Accessibility Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-center bg-blue-100 rounded-lg p-3 text-lg">
                  <span className="text-2xl mr-3">{f.icon}</span> {f.text}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Feedback</h2>
            <p className="text-slate-700">If you encounter any accessibility barriers, please contact us at <a href="mailto:info@aieconlab.com" className="text-blue-600 underline">info@aieconlab.com</a> so we can improve your experience.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
} 