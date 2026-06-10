import React from 'react'
import { FolderGit, GitBranch, GitCommit, Layers, Info, RotateCcw, Monitor, BookOpen } from 'lucide-react'

export default function Header({ 
  currentBranch, 
  commitsCount, 
  stashCount, 
  onOpenInfo,
  currentPage,
  onPageChange,
  onTriggerReset
}) {
  return (
    <header className="border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-3">
            <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-200 shadow-sm">
              <FolderGit className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-50 select-none hidden min-[480px]:inline">
              GitCraft
            </span>
          </div>

          {/* Central Tabs: Routing */}
          <div className="flex bg-zinc-900/60 border border-zinc-800/80 p-1 rounded-xl space-x-1">
            <button
              onClick={() => onPageChange('tutorials')}
              className={`flex items-center px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentPage === 'tutorials'
                  ? 'bg-zinc-800 text-zinc-50 border-zinc-700/50 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Detailed Tutorials</span>
            </button>
            <button
              onClick={() => onPageChange('sandbox')}
              className={`flex items-center px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentPage === 'sandbox'
                  ? 'bg-zinc-800 text-zinc-50 border-zinc-700/50 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
              }`}
            >
              <Monitor className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Sandbox</span>
            </button>
          </div>
        </div>

        {/* Right Side Widgets */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Status widgets for Sandbox page */}
          {currentPage === 'sandbox' && (
            <div className="hidden lg:flex items-center space-x-2 text-xs">
              <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                <GitBranch className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                Branch: <strong className="text-zinc-200 ml-1">{currentBranch}</strong>
              </span>
              <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                <GitCommit className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                Commits: <strong className="text-zinc-200 ml-1">{commitsCount}</strong>
              </span>
              {stashCount > 0 && (
                <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <Layers className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                  Stash: <strong className="text-zinc-200 ml-1">{stashCount}</strong>
                </span>
              )}
            </div>
          )}

          {/* Reset Repository Button */}
          <button
            onClick={onTriggerReset}
            className="flex items-center px-2 py-1.5 sm:px-2.5 sm:py-1.5 border border-zinc-800 hover:bg-zinc-900/60 text-zinc-400 hover:text-rose-450 rounded-lg text-xs font-bold transition-all cursor-pointer"
            title="Reset repository to initial files"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:mr-1.5" />
            <span className="hidden sm:inline">Reset State</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 p-2 rounded-lg border border-zinc-800 transition-colors"
            title="Git vs GitHub Explanation"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
