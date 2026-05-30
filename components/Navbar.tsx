'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-blue-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
  <img src="/logo.svg" alt="CodeBrain" className="w-15 h-15" />
  CodeBrain
</Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/dashboard" className="hover:bg-blue-300 hover:bg-opacity-20 px-4 py-2 rounded transition">
            Dashboard
          </Link>
          <Link href="/auth" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}