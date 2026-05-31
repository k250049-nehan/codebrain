'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProblemCard from '@/components/ProblemCard';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  solved: boolean;
}

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problems');
        const data = await response.json();

        if (response.ok) {
          // Format problems for display
          const formattedProblems = data.problems.map((p: any) => ({
            id: p.id,
            title: p.title,
            difficulty: p.difficulty,
            description: p.description,
            solved: false, // We'll get this from user_progress later
          }));
          setProblems(formattedProblems);
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const solvedCount = problems.filter((p) => p.solved).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Dashboard
              {user && <span className="text-blue-400 text-2xl ml-3">👋 {user.name || user.email}</span>}
            </h1>
            <p className="text-gray-400">Welcome back! Keep practicing to improve your skills.</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 hover:shadow-blue-500/50 transition-shadow">
              <div className="text-blue-100 text-sm font-semibold">Problems Solved</div>
              <div className="text-3xl font-bold text-white mt-2">{solvedCount}</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 hover:shadow-purple-500/50 transition-shadow">
              <div className="text-purple-100 text-sm font-semibold">Problems Total</div>
              <div className="text-3xl font-bold text-white mt-2">{problems.length}</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 hover:shadow-green-500/50 transition-shadow">
              <div className="text-green-100 text-sm font-semibold">Success Rate</div>
              <div className="text-3xl font-bold text-white mt-2">
                {problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0}%
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg shadow-lg p-6 hover:shadow-orange-500/50 transition-shadow">
              <div className="text-orange-100 text-sm font-semibold">Streak</div>
              <div className="text-3xl font-bold text-white mt-2">3 days</div>
            </motion.div>
          </motion.div>

          {/* Problems List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Practice Problems</h2>
            {loading ? (
              <div className="text-center text-gray-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block"
                >
                  ⏳
                </motion.div>
                <p className="mt-2">Loading problems...</p>
              </div>
            ) : problems.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {problems.map((problem) => (
                  <motion.div key={problem.id} variants={itemVariants}>
                    <ProblemCard {...problem} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center text-gray-400">
                <p>No problems available yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}