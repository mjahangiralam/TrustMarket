import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../App';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex flex-col items-center p-8">
        <div className="flex space-x-4 mb-8">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Home</Link>
          <Link to="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">Game</Link>
        </div>
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Contact Us</h1>
          <p className="mb-6 text-lg text-slate-700">Have questions, feedback, or want to collaborate? Reach out to us using the form below or via our contact details.</p>
          <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
            <div className="flex-1 mb-6 md:mb-0 flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 shadow-sm">
              <div className="text-5xl mb-2">📧</div>
              <div className="text-blue-700 font-semibold">info@aieconlab.com</div>
              <div className="text-5xl mt-4 mb-2">📞</div>
              <div className="text-blue-700 font-semibold">+1 (234) 567-890</div>
            </div>
            <form className="flex-1 space-y-4">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Name</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Email</label>
                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Message</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" rows={4} placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Send Message</button>
            </form>
          </div>
          <div className="text-slate-500 text-sm text-center mt-4">
            We aim to respond to all inquiries within 2 business days.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 