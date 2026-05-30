'use client';

import { useState } from 'react';
import ProblemCard from '@/components/ProblemCard';

export default function Dashboard() {
  // Mock problems (we'll replace with real data from database later)
  const [problems] = useState([
    {
      id: 1,
      title: 'Hello World',
      difficulty: 'Easy' as const,
      description: 'Write a program that prints "Hello, World!"',
      solved: false,
    },
    {
      id: 2,
      title: 'Sum of Two Numbers',
      difficulty: 'Easy' as const,
      description: 'Write a function that returns the sum of two numbers.',
      solved: true,
    },
    {
      id: 3,
      title: 'Fibonacci Sequence',
      difficulty: 'Medium' as const,
      description: 'Write a function that generates the Fibonacci sequence.',
      solved: false,
    },
    {
      id: 4,
      title: 'Binary Search',
      difficulty: 'Hard' as const,
      description: 'Implement binary search algorithm.',
      solved: false,
    },
  ]);

  const solvedCount = problems.filter((p) => p.solved).length;

  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white-900 mb-2">Dashboard</h1>
          <p className="text-white-600">Welcome back! Keep practicing to improve your skills.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-500 rounded-lg shadow p-6">
            <div className="text-white-600 text-sm font-semibold">Problems Solved</div>
            <div className="text-3xl font-bold text-white-900 mt-2">{solvedCount}</div>
          </div>
          <div className="bg-purple-500 rounded-lg shadow p-6">
            <div className="text-white-600 text-sm font-semibold">Problems Total</div>
            <div className="text-3xl font-bold text-white-900 mt-2">{problems.length}</div>
          </div>
          <div className="bg-green-500 rounded-lg shadow p-6">
            <div className="text-white-600 text-sm font-semibold">Success Rate</div>
            <div className="text-3xl font-bold text-white-900 mt-2">
              {Math.round((solvedCount / problems.length) * 100)}%
            </div>
          </div>
          <div className="bg-orange-400 rounded-lg shadow p-6">
            <div className="text-white-600 text-sm font-semibold">Streak</div>
            <div className="text-3xl font-bold text-white-600 mt-2">3 days</div>
          </div>
        </div>

        {/* Problems List */}
        <div>
          <h2 className="text-2xl font-bold text-white-900 mb-6">Practice Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} {...problem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}