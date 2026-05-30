'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { useParams } from 'next/navigation';

export default function EditorPage() {
  const params = useParams();
  const problemId = parseInt(params.id as string);

  // Mock problem data (we'll replace with real data from database later)
  const problems: Record<number, any> = {
    1: {
      id: 1,
      title: 'Hello World',
      difficulty: 'Easy',
      description: 'Write a program that prints "Hello, World!"',
      examples: [
        { input: 'None', output: 'Hello, World!' },
      ],
    },
    2: {
      id: 2,
      title: 'Sum of Two Numbers',
      difficulty: 'Easy',
      description: 'Write a function that returns the sum of two numbers.',
      examples: [
        { input: 'sum(2, 3)', output: '5' },
        { input: 'sum(10, 20)', output: '30' },
      ],
    },
    3: {
      id: 3,
      title: 'Fibonacci Sequence',
      difficulty: 'Medium',
      description: 'Write a function that generates the Fibonacci sequence up to n terms.',
      examples: [
        { input: 'fibonacci(5)', output: '[0, 1, 1, 2, 3]' },
      ],
    },
  };

  const problem = problems[problemId];

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Problem not found</div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 min-h-screen bg-gradient-to-bl from-gray-800 to-gray-900 p-6">
      {/* Problem Description Panel */}
      <div className="w-1/3 bg-black rounded-lg shadow-lg p-8 overflow-y-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white-900 mb-2">{problem.title}</h1>
        <div className="flex gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            problem.difficulty === 'Easy' ? 'bg-green-500 text-white-800' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500 text-white-800' :
            'bg-red-400 text-white-800'
          }`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white-900 mb-3">Description</h2>
          <p className="text-white-700 leading-relaxed">{problem.description}</p>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white-900 mb-3">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example: any, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm font-semibold text-white-600 mb-2">Example {index + 1}</div>
                <div className="bg-gray-700 p-2 rounded mb-2">
                  <span className="text-white-700"><strong>Input:</strong> {example.input}</span>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <span className="text-white-700"><strong>Output:</strong> {example.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hints */}
        <div>
          <h2 className="text-xl font-bold text-white-900 mb-3">💡 Need a hint?</h2>
          <button className="text-blue-300 hover:underline text-sm">
            Click here to get AI-powered hints
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="w-2/3">
        <CodeEditor problemId={problemId} onSubmit={(code) => console.log(code)} />
      </div>
    </div>
  );
}