'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/CodeEditor';
import PageTransition from '@/components/PageTransition';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{ input: string; output: string }>;
}

export default function EditorPage() {
  const params = useParams();
  const problemId = parseInt(params.id as string);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch('/api/problems');
        const data = await response.json();

        if (response.ok && data.problems) {
          const foundProblem = data.problems.find((p: any) => p.id === problemId);
          if (foundProblem) {
            // Parse examples if they're JSON strings
            const examples = typeof foundProblem.examples === 'string' 
              ? JSON.parse(foundProblem.examples) 
              : foundProblem.examples;

            setProblem({
              id: foundProblem.id,
              title: foundProblem.title,
              difficulty: foundProblem.difficulty,
              description: foundProblem.description,
              examples: Array.isArray(examples) ? examples : [],
            });
          } else {
            setError('Problem not found');
          }
        }
      } catch (err) {
        console.error('Error fetching problem:', err);
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleSubmitCode = async (code: string) => {
    if (!user) {
      alert('Please sign in to submit code');
      return;
    }

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          problemId: problem?.id,
          code,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Code submitted successfully!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to submit code');
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const exampleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-4xl"
          >
            ⏳
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  if (error || !problem) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-red-400"
          >
            {error || 'Problem not found'}
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex gap-6 min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
        {/* Problem Description Panel */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 overflow-y-auto border border-gray-700/50"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
            <div className="flex gap-3 mb-6">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                  problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                  problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' :
                  'bg-gradient-to-r from-red-500 to-red-600 text-white'
                }`}
              >
                {problem.difficulty}
              </motion.span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-3">Description</h2>
            <p className="text-gray-400 leading-relaxed">{problem.description}</p>
          </motion.div>

          {/* Examples */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-3">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example: any, index: number) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={exampleVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:border-blue-500/50 transition-colors"
                >
                  <div className="text-sm font-semibold text-blue-400 mb-2">Example {index + 1}</div>
                  <div className="bg-gray-900 p-2 rounded mb-2 border border-gray-700">
                    <span className="text-gray-300"><strong className="text-blue-400">Input:</strong> {example.input}</span>
                  </div>
                  <div className="bg-gray-900 p-2 rounded border border-gray-700">
                    <span className="text-gray-300"><strong className="text-green-400">Output:</strong> {example.output}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-gray-200 mb-3">💡 Need a hint?</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
            >
              Click here to get AI-powered hints
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-2/3"
        >
          <CodeEditor problemId={problemId} onSubmit={handleSubmitCode} />
        </motion.div>
      </div>
    </PageTransition>
  );
}