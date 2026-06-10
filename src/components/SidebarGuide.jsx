import React, { useState } from 'react'
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Play,
  Copy,
  Check,
  Laptop,
  GitPullRequest,
  Info
} from 'lucide-react'
import { WORKFLOWS } from '../constants/workflows'

// Custom inline SVG GitHub icon component (zinc style)
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function SidebarGuide({
  activeWorkflow,
  workflowStepIndex,
  onSelectWorkflow,
  onCancelWorkflow,
  onExecuteCommand
}) {
  const [activeTab, setActiveTab] = useState('sheet') // 'sheet' | 'workflows' | 'concept'
  const [sheetCategory, setSheetCategory] = useState('all')
  const [copiedText, setCopiedText] = useState('')

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const currentWorkflowData = WORKFLOWS.find(w => w.id === activeWorkflow)

  return (
    <div className="w-full lg:w-96 flex flex-col space-y-6 shrink-0">
      <h2 className="text-xl font-bold flex items-center text-zinc-100">
        <BookOpen className="h-5 w-5 mr-2 text-zinc-400" />
        GitForge Academy
      </h2>

      {/* Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-2xl flex space-x-1">
        {[
          { id: 'sheet', label: 'Cheat Sheet' },
          { id: 'workflows', label: 'Interactive Flows' },
          { id: 'concept', label: 'Git vs GitHub' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-zinc-800 text-zinc-50 border-zinc-700/50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Cheat Sheet */}
      {activeTab === 'sheet' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'setup', label: 'Setup' },
              { id: 'files', label: 'Files' },
              { id: 'branching', label: 'Branches' },
              { id: 'stash', label: 'Stash' },
              { id: 'undo', label: 'Restores' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSheetCategory(cat.id)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                  sheetCategory === cat.id
                    ? 'bg-zinc-800 border-zinc-750 text-zinc-50'
                    : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {[
              {
                cmd: 'git init',
                desc: 'Initialize a new local Git repository.',
                cat: 'setup',
                tip: 'Creates a hidden .git folder where Git keeps all historical snapshot data.'
              },
              {
                cmd: 'git clone <repo-url>',
                desc: 'Clone/download a GitHub repository.',
                cat: 'setup',
                tip: 'Downloads the entire source code and commit history to your desktop.'
              },
              {
                cmd: 'git status',
                desc: 'Check state of files in staging/workspace.',
                cat: 'files',
                tip: 'Indicates which files are untracked (red), modified, or ready to commit (green).'
              },
              {
                cmd: 'git add .',
                desc: 'Stage all files to prepare for a commit.',
                cat: 'files',
                tip: 'Prepares the files to be saved. Like getting everyone ready before taking a photo.'
              },
              {
                cmd: 'git commit -m "message"',
                desc: 'Save snapshot changes permanently.',
                cat: 'files',
                tip: 'Actually saves the photo snapshot of the project with a descriptive note.'
              },
              {
                cmd: 'git checkout -b <branch>',
                desc: 'Create and switch to a new branch.',
                cat: 'branching',
                tip: 'Allows you to work on features in isolation without impacting the main branch.'
              },
              {
                cmd: 'git merge <branch>',
                desc: 'Merge changes into current active branch.',
                cat: 'branching',
                tip: 'Combines independent development paths (branches) back together.'
              },
              {
                cmd: 'git stash -u',
                desc: 'Temporarily stash uncommitted changes.',
                cat: 'stash',
                tip: 'Saves your dirty local workspace layout to a temporary stack and returns you to a clean HEAD.'
              },
              {
                cmd: 'git stash pop',
                desc: 'Restore the last stashed changes.',
                cat: 'stash',
                tip: 'Recovers your stashed changes and drops them from the temporary stack.'
              },
              {
                cmd: 'git restore --staged <file>',
                desc: 'Unstage a file, keeping modifications.',
                cat: 'undo',
                tip: 'Moves a file from green (staged) back to red (modified/untracked).'
              },
              {
                cmd: 'git reset --hard <commit>',
                desc: 'Force reset workspace to specific commit.',
                cat: 'undo',
                tip: 'WARNING: Clears history and discards ALL uncommitted edits back to that commit.'
              }
            ]
              .filter(c => sheetCategory === 'all' || c.cat === sheetCategory)
              .map((item, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-3 hover:border-zinc-700/60 transition-all">
                  <div className="flex justify-between items-start mb-1.5">
                    <code className="text-zinc-100 font-semibold text-xs font-mono">{item.cmd}</code>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleCopy(item.cmd)}
                        className="p-1 text-zinc-500 hover:text-zinc-350 rounded"
                        title="Copy command"
                      >
                        {copiedText === item.cmd ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => onExecuteCommand(item.cmd)}
                        className="p-1 text-zinc-400 hover:text-zinc-300 rounded"
                        title="Simulate command in terminal"
                      >
                        <Play className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-350 mb-2 leading-relaxed">{item.desc}</p>
                  <div className="text-[10px] text-zinc-500 border-t border-zinc-850 pt-1.5 leading-relaxed">
                    <strong>Tip:</strong> {item.tip}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Workflows */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          {activeWorkflow && currentWorkflowData ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={onCancelWorkflow}
                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 flex items-center"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" /> All Flows
                </button>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-950 border border-zinc-850 px-2 py-0.5 rounded-full">
                  Step {workflowStepIndex + 1} of {currentWorkflowData.steps.length}
                </span>
              </div>

              <h3 className="font-bold text-sm text-zinc-200 mb-2">
                {currentWorkflowData.title}
              </h3>

              <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/80 mb-4">
                <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                  {currentWorkflowData.steps[workflowStepIndex].instruction}
                </p>
              </div>

              {/* Run macro helper */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-550">Stuck? Click play to auto-run:</span>
                <button
                  onClick={() => onExecuteCommand(currentWorkflowData.steps[workflowStepIndex].command)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold rounded-lg flex items-center transition-all border border-zinc-700"
                >
                  <Play className="h-3.5 w-3.5 mr-1 fill-current" /> Auto-Run
                </button>
              </div>

              {/* Progress dots */}
              <div className="mt-5 flex space-x-1.5">
                {currentWorkflowData.steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full ${
                      idx < workflowStepIndex ? 'bg-emerald-500/80' :
                      idx === workflowStepIndex ? 'bg-zinc-400 animate-pulse' : 'bg-zinc-950 border border-zinc-850'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-zinc-450 mb-2 leading-relaxed font-semibold">
                Select a guided flow. GitCraft will monitor your sandbox actions and guide you step-by-step:
              </p>
              {WORKFLOWS.map(flow => (
                <div
                  key={flow.id}
                  onClick={() => onSelectWorkflow(flow.id)}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 hover:border-zinc-700/60 transition-all cursor-pointer hover:bg-zinc-900 group"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-sm text-zinc-200 group-hover:text-zinc-50 transition-colors">
                      {flow.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-zinc-450 leading-relaxed">
                    {flow.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Concepts */}
      {activeTab === 'concept' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
            <div>
              <h3 className="font-bold text-xs text-zinc-200 uppercase tracking-wider mb-1 flex items-center">
                <Laptop className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                Git: The Local Tracker
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                An offline utility running entirely on your local machine. It manages branches, monitors text edits in files, and commits snapshots. It works without internet.
              </p>
            </div>

            <div className="border-t border-zinc-850 pt-3">
              <h3 className="font-bold text-xs text-zinc-200 uppercase tracking-wider mb-1 flex items-center">
                <GithubIcon className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                GitHub: The Remote Hub
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A cloud platform that hosts repositories, enables team collaboration, tracking bugs, and managing merge reviews (Pull Requests) before changes are applied.
              </p>
            </div>

            <div className="border-t border-zinc-850 pt-3">
              <h3 className="font-bold text-xs text-zinc-250 uppercase tracking-wider mb-1 flex items-center">
                <GitPullRequest className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                The Pull Request (PR) Flow
              </h3>
              <ol className="text-xs text-zinc-400 list-decimal list-inside space-y-1.5 leading-relaxed mt-1">
                <li><strong>Fork</strong> a remote repo (saves a personal copy under your GitHub account).</li>
                <li><strong>Clone</strong> it locally so you can edit the files on your desktop.</li>
                <li>Develop changes in a new <strong>branch</strong>.</li>
                <li><strong>Commit</strong> and <strong>push</strong> that branch to your GitHub fork.</li>
                <li>Create a <strong>Pull Request</strong> comparing your branch to the original project.</li>
                <li>A maintainer reviews, resolves conflicts, and <strong>merges</strong>.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
