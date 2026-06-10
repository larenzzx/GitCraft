import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

export default function Terminal({ terminalHistory, commandHistory, onExecuteCommand, prefilledInput, onClearPrefill }) {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistoryIndex, setTerminalHistoryIndex] = useState(-1)
  const terminalContainerRef = useRef(null)

  // Scroll to bottom of terminal container ONLY, preventing viewport jumps
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight
    }
  }, [terminalHistory])

  // Prefill command input from tutorial macro clicks
  useEffect(() => {
    if (prefilledInput) {
      setTerminalInput(prefilledInput)
      if (onClearPrefill) onClearPrefill()
    }
  }, [prefilledInput, onClearPrefill])

  const handleRun = () => {
    if (terminalInput.trim()) {
      onExecuteCommand(terminalInput)
      setTerminalInput('')
      setTerminalHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRun()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIdx = terminalHistoryIndex === -1 ? commandHistory.length - 1 : Math.max(0, terminalHistoryIndex - 1)
        setTerminalHistoryIndex(newIdx)
        setTerminalInput(commandHistory[newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (terminalHistoryIndex !== -1) {
        const newIdx = terminalHistoryIndex + 1
        if (newIdx >= commandHistory.length) {
          setTerminalHistoryIndex(-1)
          setTerminalInput('')
        } else {
          setTerminalHistoryIndex(newIdx)
          setTerminalInput(commandHistory[newIdx])
        }
      }
    }
  }

  return (
    <div className="glass-premium rounded-2xl overflow-hidden shadow-xl flex flex-col">
      <div className="bg-zinc-950/90 px-4 py-3 border-b border-zinc-800/80 flex justify-between items-center select-none">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-zinc-400" />
          <span className="font-mono text-xs font-semibold text-zinc-350">Terminal - gitcraft-console</span>
        </div>
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* Terminal History Logs */}
      <div 
        ref={terminalContainerRef}
        className="bg-zinc-950 p-4 h-64 overflow-y-auto font-mono text-xs text-zinc-350 space-y-1.5 scrollbar-thin select-text"
      >
        {terminalHistory.map((line, idx) => {
          if (line.startsWith('$ ')) {
            return <div key={idx} className="text-zinc-200 mt-2 font-semibold">{line}</div>
          }
          if (line.includes('green:')) {
            return <div key={idx} className="text-emerald-500">{line.replace('green:', '')}</div>
          }
          if (line.includes('red:')) {
            return <div key={idx} className="text-rose-500">{line.replace('red:', '')}</div>
          }
          if (line.includes('yellow:')) {
            return <div key={idx} className="text-amber-500">{line.replace('yellow:', '')}</div>
          }
          return <div key={idx} className="text-zinc-450 leading-relaxed whitespace-pre-wrap">{line}</div>
        })}
      </div>

      {/* Input prompt */}
      <div className="bg-zinc-900 border-t border-zinc-850 flex items-center px-3 py-2 shrink-0">
        <span className="font-mono text-xs text-zinc-500 font-bold mr-2 select-none">$</span>
        <input
          type="text"
          value={terminalInput}
          onChange={e => setTerminalInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="git init / git status / git add . / git commit -m 'message'..."
          className="flex-1 bg-transparent text-xs text-emerald-500 font-mono focus:outline-none placeholder-zinc-700"
        />
        <button
          onClick={handleRun}
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer shadow-sm"
        >
          Run
        </button>
      </div>
    </div>
  )
}
