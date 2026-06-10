import React from 'react'
import { GitCommit, AlertTriangle, Cloud } from 'lucide-react'

export default function CommitTree({ commits, currentBranch, isLinkedToRemote, isPushedToRemote }) {
  return (
    <div className="glass-premium rounded-2xl p-5 flex flex-col justify-between h-[400px]">
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center shrink-0">
          <GitCommit className="h-4 w-4 mr-2 text-emerald-500" />
          Commit Tree History
        </h3>
        
        {commits.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs py-8">
            <AlertTriangle className="h-6 w-6 mb-2 text-amber-500/70" />
            No commits yet. Stage files and run:
            <code className="mt-1 text-zinc-350 px-2 py-0.5 bg-zinc-950 border border-zinc-850 rounded font-mono">git commit -m "msg"</code>
          </div>
        ) : (
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 min-h-0">
            {commits.map((c, i) => (
              <div key={c.id} className="flex items-center space-x-3 text-xs bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
                <div className="relative flex flex-col items-center">
                  <div className="h-6.5 w-6.5 rounded-full bg-zinc-950 border border-zinc-750 flex items-center justify-center text-[9px] font-mono text-zinc-400 font-bold">
                    C
                  </div>
                  {i < commits.length - 1 && <div className="w-0.5 h-6 bg-zinc-800" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-zinc-450 font-semibold">{c.id}</span>
                    <span className="text-[10px] text-zinc-450 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/50">{c.branch}</span>
                  </div>
                  <p className="text-zinc-200 truncate font-semibold mt-0.5">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GitHub Cloud Mirror */}
      <div className="border-t border-zinc-800/60 mt-4 pt-4 shrink-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-zinc-450 flex items-center">
            <Cloud className="h-4 w-4 mr-1.5 text-zinc-400" />
            GitHub Cloud Sync
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${isPushedToRemote ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-950 text-zinc-650'}`}>
            {isPushedToRemote ? 'Synced' : 'Not Pushed'}
          </span>
        </div>

        {isLinkedToRemote ? (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-xs">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-zinc-300 font-semibold truncate">origin: https://github.com/...</span>
            </div>
            <p className="text-zinc-550 text-[10px]">
              {isPushedToRemote ? 'Your commits are pushed to main branch on GitHub!' : 'Linked. Commits ready to push.'}
            </p>
          </div>
        ) : (
          <div className="text-[11px] text-zinc-550 text-center py-2 bg-zinc-950/40 rounded-xl border border-dashed border-zinc-850">
            Link to GitHub by running remote command
          </div>
        )}
      </div>
    </div>
  )
}
