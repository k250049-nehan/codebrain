'use client';

import Link from 'next/link';
import { BookOpen, Code, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  // Animation variants


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -5,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <PageTransition>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6"
            >
              <div className="bg-blue-500/20 border border-blue-400/50 rounded-full px-4 py-2 text-blue-300 text-sm font-medium">
                ✨ Welcome to CodeBrain
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Learn to Code
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                Smarter & Faster
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto"
            >
              Practice coding problems. Get AI feedback. Improve instantly.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              An interactive learning platform that adapts to your pace
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link
                href="/dashboard"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
              >
                Start Learning
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg border border-gray-600 transition-all duration-300 shadow-lg"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-32 border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Why Choose CodeBrain?
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to become a better programmer
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              {/* Feature 1 */}
              <motion.div
                variants={featureVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 p-8 rounded-xl backdrop-blur-sm cursor-pointer"
              >
                <div className="bg-blue-500/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={28} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Learn Concepts</h3>
                <p className="text-gray-300">
                  Understand programming concepts with AI-generated explanations and visual examples.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={featureVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 p-8 rounded-xl backdrop-blur-sm cursor-pointer"
              >
                <div className="bg-purple-500/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Code size={28} className="text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Practice Code</h3>
                <p className="text-gray-300">
                  Solve real coding problems in a live editor with instant feedback and hints.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                variants={featureVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 p-8 rounded-xl backdrop-blur-sm cursor-pointer"
              >
                <div className="bg-green-500/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={28} className="text-green-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Feedback</h3>
                <p className="text-gray-300">
                  Get personalized AI feedback on your code to improve faster and learn better.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-32 border-t border-gray-700/50"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to level up your coding skills?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of developers learning and improving every day
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              Get Started Now →
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );

}