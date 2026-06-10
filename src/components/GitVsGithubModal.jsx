import React from 'react'
import { HelpCircle } from 'lucide-react'

export default function GitVsGithubModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="bg-zinc-900/40 border-b border-zinc-800/80 px-4 py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-start space-x-4">
          <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl text-zinc-300 shrink-0">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-zinc-100 mb-1">Git vs. GitHub: What's the Difference?</h2>
            <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
              <strong>Git (Local Control):</strong> Think of it as a camera that takes snapshots (commits) of your codebase. It runs fully offline inside your local computer.
              <br />
              <strong className="inline-block mt-1">GitHub (Cloud Host):</strong> The cloud hosting hub where you upload (push) and share those snapshots to collaborate with other developers.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 rounded-lg border border-zinc-850 shrink-0 transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
