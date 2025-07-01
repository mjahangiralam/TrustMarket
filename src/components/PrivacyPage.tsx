import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Privacy Policy</h1>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">1. Information Collection</h2>
            <p className="text-slate-700">We collect minimal information necessary to provide and improve the game experience. This may include session data and analytics.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">2. Use of Information</h2>
            <p className="text-slate-700">Information is used solely for improving the platform and is never sold or shared with third parties.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">3. Cookies</h2>
            <p className="text-slate-700">We use cookies for session management and analytics. You can disable cookies in your browser settings, but some features may not work properly.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">4. Data Deletion</h2>
            <p className="text-slate-700">You may contact us at any time to request deletion of your data. We will comply promptly with all such requests.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">5. Contact</h2>
            <p className="text-slate-700">For questions about our privacy practices, please contact <a href="mailto:info@aieconlab.com" className="text-blue-600 underline">info@aieconlab.com</a>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
} 