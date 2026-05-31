'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-blue-700/50"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2 text-center">
              {isLogin ? 'Welcome Back' : 'Join CodeBrain'}
            </h1>
            <p className="text-blue-200 text-center mb-8">
              {isLogin ? 'Sign in to continue learning' : 'Start your coding journey today'}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border-2 border-blue-500 bg-blue-900/30 rounded-lg focus:border-blue-300 focus:outline-none transition text-white placeholder-blue-400"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-blue-500 bg-blue-900/30 rounded-lg focus:border-blue-300 focus:outline-none transition text-white placeholder-blue-400"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition disabled:from-gray-500 disabled:to-gray-600"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </form>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-blue-200">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-300 font-semibold hover:text-blue-100 underline ml-1 transition"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>

          {/* Continue as Guest */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 pt-6 border-t border-blue-700"
          >
            <Link href="/dashboard" className="block text-center text-blue-300 hover:text-blue-100 font-semibold transition">
              Continue as Guest →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}