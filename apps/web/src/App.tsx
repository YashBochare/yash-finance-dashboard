import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white">
      <div className="bg-surface p-8 rounded-xl border border-border shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-header font-bold text-indigo mb-4">
          Yash Finance
        </h1>
        <p className="text-gray-400 mb-6 font-sans">
          Project initialized successfully with Vite + React + TypeScript + Tailwind.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-12 bg-indigo rounded-lg flex items-center justify-center">Indigo</div>
          <div className="h-12 bg-green rounded-lg flex items-center justify-center">Green</div>
          <div className="h-12 bg-red rounded-lg flex items-center justify-center">Red</div>
        </div>
      </div>
    </div>
  )
}

export default App
