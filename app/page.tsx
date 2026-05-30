'use client';

import Link from 'next/link';
import { BookOpen, BrainCircuit, Code, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white-900 mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-200 to-blue-500">CodeBrain</span>
        </h1>
        <p className="text-xl text-white-700 mb-4">
          Learn to code. Practice problems. Get AI feedback. Improve faster.
        </p>
        <p className="text-lg text-white-600 mb-8">
          An interactive coding learning platform powered by AI
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-200 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition"
          >
            Start Learning
          </Link>
          <Link
            href="/auth"
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg border-2 border-blue-900 hover:bg-blue-300 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-t from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white-900 mb-12">
            Why CodeBrain?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-500 p-8 rounded-lg">
              <BookOpen size={48} className="text-white-600 mb-4" />
              <h3 className="text-2xl font-bold text-white-900 mb-3">Learn Concepts</h3>
              <p className="text-white-700">
                Understand programming concepts with AI-generated explanations and visual examples.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-purple-600 p-8 rounded-lg">
              <Code size={48} className="text-white-600 mb-4" />
              <h3 className="text-2xl font-bold text-white-900 mb-3">Practice Code</h3>
              <p className="text-white-700">
                Solve real coding problems in a live editor with instant feedback and hints.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-600 p-8 rounded-lg">
              <Zap size={48} className="text-white-600 mb-4" />
              <h3 className="text-2xl font-bold text-white-900 mb-3">AI Feedback</h3>
              <p className="text-white-700">
                Get personalized AI feedback on your code to improve faster and learn better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}