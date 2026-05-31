'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // We'll implement actual auth later with Supabase
    console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password });
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
        <div className="bg-blue-800 rounded-lg shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Join CodeBrain'}
          </h1>
          <p className="text-gray-200 text-center mb-8">
            {isLogin ? 'Sign in to continue learning' : 'Start your coding journey today'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-8">
            <p className="text-gray-200">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-300 font-semibold hover:underline ml-1"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Continue as Guest */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <Link href="/dashboard" className="block text-center text-gray-300 hover:text-blue-300 font-semibold">
              Continue as Guest →
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}