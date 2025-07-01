import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Terms of Service</h1>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">1. Acceptance of Terms</h2>
            <p className="text-slate-700">By using Trust Market, you agree to abide by these terms and all applicable laws and regulations. If you do not agree, please do not use the platform.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">2. Permitted Use</h2>
            <p className="text-slate-700">This platform is for educational and non-commercial use only. You may not use it for unlawful purposes or to disrupt the service.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">3. User Conduct</h2>
            <ul className="list-disc ml-6 text-slate-700 mb-2">
              <li>Respect the privacy and rights of other users.</li>
              <li>Do not attempt to hack, disrupt, or misuse the service.</li>
              <li>Do not post offensive or illegal content.</li>
            </ul>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">4. Disclaimer</h2>
            <p className="text-slate-700">Content and results are for informational purposes only and do not constitute professional advice. AiEconLab is not liable for any damages arising from use of the platform.</p>
          </section>
          <div className="border-b border-blue-100 my-4"></div>
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">5. Changes to Terms</h2>
            <p className="text-slate-700">AiEconLab reserves the right to update these terms at any time. Continued use of the platform constitutes acceptance of any changes.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
} 