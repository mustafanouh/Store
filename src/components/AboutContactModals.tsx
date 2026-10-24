import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ViewMode } from '../types';

interface ModalProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
}

export const AboutContactModals: React.FC<ModalProps> = ({ currentView, setCurrentView }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (currentView !== 'about' && currentView !== 'contact') return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: 'Message Sent!',
      text: 'Thank you for reaching out to us. We will get back to you shortly.',
      icon: 'success',
      confirmButtonColor: '#3b82f6',
    });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setCurrentView('home');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-neutral-700 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100 dark:border-neutral-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentView === 'about' ? 'About Us' : 'Contact Us'}
          </h3>
          <button
            onClick={() => setCurrentView('home')}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {currentView === 'about' ? (
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="flex justify-center mb-4">
              <img src="/img/icon.png" alt="Store Logo" className="w-24 h-24 object-contain" />
            </div>
            <p className="text-sm leading-relaxed">
              Welcome to <strong className="text-blue-600 dark:text-blue-400">Product Store</strong>.
            </p>
            <p className="text-sm leading-relaxed">
              We offer a curated selection of products across men's clothing, women's fashion, fine jewelry, and the latest consumer electronics. Browse our collections, save your favorites, and manage your cart with seamless real-time interactions.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg text-xs space-y-2 border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-semibold">
                <i className="fa-solid fa-check-circle"></i>
                <span>Fast & Reliable FakeStore API Integration</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-semibold">
                <i className="fa-solid fa-check-circle"></i>
                <span>Add custom products with instant persistence</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-semibold">
                <i className="fa-solid fa-check-circle"></i>
                <span>Saved favorites & shopping cart tracking</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('home')}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center gap-3 text-sm text-blue-700 dark:text-blue-300">
              <i className="fa-solid fa-phone text-lg"></i>
              <div>
                <div className="font-semibold">Call or WhatsApp us directly:</div>
                <a href="tel:+963985690091" className="font-bold underline text-blue-600 dark:text-blue-400">
                  +963985690091
                </a>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2.5 text-sm border border-gray-300 dark:border-neutral-600 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-2.5 text-sm border border-gray-300 dark:border-neutral-600 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full p-2.5 text-sm border border-gray-300 dark:border-neutral-600 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition cursor-pointer text-sm"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
