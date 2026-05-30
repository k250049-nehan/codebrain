'use client';

import Link from 'next/link';

interface ProblemCardProps {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  solved: boolean;
}

export default function ProblemCard({ id, title, difficulty, description, solved }: ProblemCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-500 text-white-800',
    Medium: 'bg-yellow-500 text-white-800',
    Hard: 'bg-red-400 text-white-800',
  };

  return (
    <div className="bg-black rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white-800">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-white-600 mb-4 line-clamp-2">{description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          {solved ? '✅ Solved' : '⏳ Not Solved'}
        </span>
        <Link
          href={`/editor/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Solve
        </Link>
      </div>
    </div>
  );
}