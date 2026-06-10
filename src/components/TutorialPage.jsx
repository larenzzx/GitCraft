import React, { useState } from 'react'
import { TUTORIALS } from '../constants/tutorials'
import { Copy, Check, Play, BookOpen, Terminal, Info } from 'lucide-react'

export default function TutorialPage({ onTryInSandbox }) {
  const [selectedCmd, setSelectedCmd] = useState(TUTORIALS[0].cmd)
  const [copiedText, setCopiedText] = useState('')

  const activeTutorial = TUTORIALS.find(t => t.cmd === selectedCmd) || TUTORIALS[0]

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  // Group tutorials by category
  const categories = TUTORIALS.reduce((acc, current) => {
    if (!acc[current.category]) {
      acc[current.category] = []
    }
    acc[current.category].push(current)
    return acc
  }, {})

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
      {/* Left Column: Command Tree Selection */}
      <div className="w-full md:w-80 shrink-0 flex flex-col space-y-4">
        <h2 className="text-lg font-bold flex items-center text-zinc-200">
          <BookOpen className="h-5 w-5 mr-2 text-zinc-400" />
          Git Commands Syllabus
        </h2>
        
        <div className="glass-premium rounded-2xl p-4 overflow-y-auto max-h-48 md:max-h-[calc(100vh-14rem)] space-y-4 pr-2 scrollbar-thin">
          {Object.keys(categories).map(catName => (
            <div key={catName} className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block px-2 mb-1">
                {catName}
              </span>
              {categories[catName].map(item => (
                <button
                  key={item.cmd}
                  onClick={() => setSelectedCmd(item.cmd)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center justify-between border ${
                    selectedCmd === item.cmd
                      ? 'bg-zinc-800 text-zinc-50 border-zinc-700 shadow-sm'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <span>{item.cmd}</span>
                  {selectedCmd === item.cmd && <Play className="h-3 w-3 fill-current text-zinc-400" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Detailed Command Deep-Dive */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="premium-card p-6 md:p-8 flex flex-col justify-between min-h-[calc(100vh-14rem)] relative overflow-hidden">
          
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-4 shrink-0">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                  {activeTutorial.category}
                </span>
                <h1 className="font-mono font-bold text-2xl text-zinc-105 mt-2">
                  {activeTutorial.cmd}
                </h1>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400">
                <Terminal className="h-6 w-6" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-zinc-200 leading-relaxed font-semibold">
                {activeTutorial.desc}
              </p>
            </div>

            {/* Syntax Box */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-wider">Command Syntax</h3>
                <button
                  onClick={() => handleCopy(activeTutorial.syntax.split('\n')[0])}
                  className="text-xs text-zinc-500 hover:text-zinc-350 flex items-center transition-colors cursor-pointer"
                >
                  {copiedText === activeTutorial.syntax.split('\n')[0] ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl font-mono text-xs text-zinc-300 relative overflow-x-auto whitespace-pre-wrap select-text leading-relaxed">
                {activeTutorial.syntax}
              </div>
            </div>

            {/* Detailed Explanation / Why */}
            <div className="space-y-2 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-wider flex items-center">
                <Info className="h-3.5 w-3.5 mr-1.5 text-zinc-500" />
                Under the Hood (Why It Matters)
              </h3>
              <p className="text-xs text-zinc-350 leading-relaxed whitespace-pre-wrap">
                {activeTutorial.why}
              </p>
            </div>

            {/* When to use it */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-wider">When to use it</h3>
              <p className="text-xs text-zinc-350 leading-relaxed">
                {activeTutorial.when}
              </p>
            </div>

            {/* Example flow */}
            {activeTutorial.example && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-wider">Usage Example</h3>
                <pre className="bg-zinc-950/60 border border-zinc-850 p-4 rounded-xl font-mono text-[11px] text-zinc-400 overflow-x-auto select-text leading-relaxed">
                  {activeTutorial.example}
                </pre>
              </div>
            )}
          </div>

          {/* Try in Sandbox Button */}
          <div className="mt-8 pt-6 border-t border-zinc-800 shrink-0">
            <button
              onClick={() => onTryInSandbox(activeTutorial.cmd)}
              className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm"
            >
              <Play className="h-4 w-4 fill-current text-zinc-950" />
              <span>Try Command in Sandbox</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
