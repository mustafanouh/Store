import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ViewMode, Language } from '../types';
import { translations } from '../translations';

interface LoginViewProps {
  currentUser: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
  setCurrentView: (view: ViewMode) => void;
  lang: Language;
}

export const LoginView: React.FC<LoginViewProps> = ({
  currentUser,
  onLogin,
  onLogout,
  setCurrentView,
  lang,
}) => {
  const t = translations[lang];
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter both email and password.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    const username = isSignUp && name.trim() ? name.trim() : email.split('@')[0];
    onLogin(username);

    Swal.fire({
      title: isSignUp ? 'Account Created!' : 'Logged In Successfully!',
      text: `Welcome back, ${username}!`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      setCurrentView('home');
    }, 1000);
  };

  const handleLogout = () => {
    onLogout();
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been signed out successfully.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        {currentUser ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Hello, {currentUser}!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your account is active. You can track your orders, manage your wishlist, and checkout with fast 1-click delivery.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setCurrentView('orders')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
              >
                {t.myOrders}
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-rose-500 hover:text-rose-700 text-xs font-semibold transition cursor-pointer"
              >
                {t.logout}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {isSignUp ? t.signUp : t.login}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Access your orders, favorites, and fast checkout
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mustafa Nouh"
                    className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
              >
                {isSignUp ? t.signUp : t.login}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              <span>{isSignUp ? 'Already registered? ' : "Don't have an account? "}</span>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isSignUp ? t.login : t.signUp}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
