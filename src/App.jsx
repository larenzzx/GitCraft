import React, { useState } from 'react'
import { Cloud, Laptop, GitBranch, GitCommit, Layers } from 'lucide-react'

// Custom Hooks
import { useGitEngine } from './hooks/useGitEngine'

// Components
import Header from './components/Header'
import GitVsGithubModal from './components/GitVsGithubModal'
import FolderExplorer from './components/FolderExplorer'
import CommitTree from './components/CommitTree'
import Terminal from './components/Terminal'
import SidebarGuide from './components/SidebarGuide'
import TutorialPage from './components/TutorialPage'
import { NewFileModal, ConfirmationModal } from './components/CustomModals'

export default function App() {
  const {
    isInitialized,
    files,
    commits,
    branches,
    currentBranch,
    stashes,
    isLinkedToRemote,
    isPushedToRemote,
    terminalHistory,
    commandHistory,
    activeWorkflow,
    setActiveWorkflow,
    workflowStepIndex,
    setWorkflowStepIndex,
    successAnimation,
    executeCommand,
    makeLocalModification,
    addNewFile,
    deleteFile,
    resetEngine
  } = useGitEngine()

  // App Page State
  const [currentPage, setCurrentPage] = useState('tutorials') // 'sandbox' | 'tutorials'
  const [prefilledCommand, setPrefilledCommand] = useState('')

  // Explanation banner visibility state
  const [showAlertBanner, setShowAlertBanner] = useState(true)

  // Custom Modal States
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {}
  })

  // Guided flow selection helpers
  const handleSelectWorkflow = (workflowId) => {
    setActiveWorkflow(workflowId)
    setWorkflowStepIndex(0)
  }

  const handleCancelWorkflow = () => {
    setActiveWorkflow(null)
    setWorkflowStepIndex(0)
  }

  // Deletion trigger handler
  const handleTriggerDelete = (filename) => {
    setConfirmConfig({
      title: 'Delete Local File?',
      message: `Are you sure you want to delete "${filename}"? This action will permanently remove the file from your local sandbox workspace.`,
      onConfirm: () => deleteFile(filename)
    })
    setIsConfirmOpen(true)
  }

  // Reset repository state confirmation trigger
  const handleTriggerReset = () => {
    setConfirmConfig({
      title: 'Reset Repository State?',
      message: 'Are you sure you want to completely reset the repository? This will clear all local commits, branches, stashes, remote links, and custom files, returning the project back to baseline.',
      onConfirm: () => resetEngine()
    })
    setIsConfirmOpen(true)
  }

  // Link tutorials click macros back to sandbox inputs
  const handleTryInSandbox = (commandName) => {
    setPrefilledCommand(commandName)
    setCurrentPage('sandbox')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 flex flex-col antialiased">
      {/* Header bar */}
      <Header
        currentBranch={currentBranch}
        commitsCount={commits.length}
        stashCount={stashes.length}
        onOpenInfo={() => setShowAlertBanner(true)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onTriggerReset={handleTriggerReset}
      />

      {/* Info explanation overlay */}
      <GitVsGithubModal
        show={showAlertBanner}
        onClose={() => setShowAlertBanner(false)}
      />

      {/* Page Selector Router */}
      {currentPage === 'sandbox' ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
          
          {/* Left column: Simulator & CLI Terminal */}
          <div className="flex-1 flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <Laptop className="h-5 w-5 mr-2 text-indigo-400" />
                  Local Sandbox Workspace
                </h2>
                <div className="text-xs text-gray-400 flex items-center">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full mr-2 ${isInitialized ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {isInitialized ? '.git Initialized' : 'Git Repository Offline'}
                </div>
              </div>

              {/* Mobile/Tablet Stats Row (Visible on screens < lg) */}
              {isInitialized && (
                <div className="flex lg:hidden flex-wrap gap-2 text-xs">
                  <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                    <GitBranch className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                    Branch: <strong className="text-zinc-200 ml-1">{currentBranch}</strong>
                  </span>
                  <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                    <GitCommit className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                    Commits: <strong className="text-zinc-200 ml-1">{commits.length}</strong>
                  </span>
                  {stashes.length > 0 && (
                    <span className="flex items-center px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                      <Layers className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
                      Stash: <strong className="text-zinc-200 ml-1">{stashes.length}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Explorer and Visual Commit Trees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FolderExplorer
                files={files}
                onTriggerNewFile={() => setIsNewFileOpen(true)}
                onTriggerDeleteFile={handleTriggerDelete}
                onMakeLocalModification={makeLocalModification}
              />

              <CommitTree
                commits={commits}
                currentBranch={currentBranch}
                isLinkedToRemote={isLinkedToRemote}
                isPushedToRemote={isPushedToRemote}
              />
            </div>

            {/* Console CLI Terminal */}
            <Terminal
              terminalHistory={terminalHistory}
              commandHistory={commandHistory}
              onExecuteCommand={executeCommand}
              prefilledInput={prefilledCommand}
              onClearPrefill={() => setPrefilledCommand('')}
            />
          </div>

          {/* Right column: Cheat Sheet & Guides Academy */}
          <SidebarGuide
            activeWorkflow={activeWorkflow}
            workflowStepIndex={workflowStepIndex}
            onSelectWorkflow={handleSelectWorkflow}
            onCancelWorkflow={handleCancelWorkflow}
            onExecuteCommand={executeCommand}
          />
        </main>
      ) : (
        <TutorialPage onTryInSandbox={handleTryInSandbox} />
      )}

      {/* ==================== CUSTOM DIALOG MODALS ==================== */}
      <NewFileModal
        isOpen={isNewFileOpen}
        onClose={() => setIsNewFileOpen(false)}
        onCreate={addNewFile}
        existingFiles={files}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type="danger"
      />

      {/* Toast popup on remote synchronization success */}
      {successAnimation && (
        <div className="fixed bottom-8 right-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl flex items-center space-x-4 z-50">
          <div className="bg-zinc-950 border border-zinc-850 p-2 rounded-xl text-zinc-100">
            <Cloud className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-zinc-50">Push to GitHub Successful</h4>
            <p className="text-[10px] text-zinc-400">Local commits successfully synchronized to remote repository origin.</p>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <footer className="border-t border-zinc-800 bg-zinc-950/40 py-6 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 GitCraft Platform. Designed for modern developer workflows.</p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">GitHub Platform</a>
            <span>•</span>
            <a href="https://git-scm.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">Git Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
