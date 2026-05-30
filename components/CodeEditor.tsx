'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  problemId: number;
  onSubmit: (code: string) => void;
}

export default function CodeEditor({ problemId, onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState(`// Write your solution here\nfunction solve() {\n  \n}`);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/submit-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, problemId }),
      });
      const result = await response.json();
      setOutput(result.feedback || 'Code submitted successfully!');
    } catch (error) {
      setOutput('Error submitting code. Try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 h-full bg-black p-6 rounded-lg">
      {/* Code Editor */}
      <div className="flex flex-col flex-1">
        <h2 className="text-white text-lg font-bold mb-2">Your Code</h2>
        <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
            }}
          />
        </div>
      </div>

      {/* Output / Feedback */}
      <div className="flex flex-col">
        <h2 className="text-white text-lg font-bold mb-2">Feedback</h2>
        <div className="bg-gray-800 rounded-lg p-4 min-h-24 text-white font-mono text-sm mb-4 overflow-y-auto">
          {output || 'Submit your code to see feedback...'}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:bg-gray-600 w-full"
        >
          {loading ? 'Submitting...' : 'Submit Code'}
        </button>
      </div>
    </div>
  );
}