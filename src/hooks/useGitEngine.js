import { useState, useEffect } from 'react'
import { INITIAL_FILES } from '../constants/initialFiles'
import { WORKFLOWS } from '../constants/workflows'

export function useGitEngine() {
  // Git Repo State loaded from localStorage (safely structured fallback)
  const [isInitialized, setIsInitialized] = useState(() => {
    const stored = localStorage.getItem('gitcraft_isInitialized')
    return stored ? JSON.parse(stored) : false
  })
  const [files, setFiles] = useState(() => {
    const stored = localStorage.getItem('gitcraft_files')
    return stored ? JSON.parse(stored) : INITIAL_FILES
  })
  const [commits, setCommits] = useState(() => {
    const stored = localStorage.getItem('gitcraft_commits')
    return stored ? JSON.parse(stored) : []
  })
  const [branches, setBranches] = useState(() => {
    const stored = localStorage.getItem('gitcraft_branches')
    return stored ? JSON.parse(stored) : ['main']
  })
  const [currentBranch, setCurrentBranch] = useState(() => {
    return localStorage.getItem('gitcraft_currentBranch') || 'main'
  })
  const [stashes, setStashes] = useState(() => {
    const stored = localStorage.getItem('gitcraft_stashes')
    return stored ? JSON.parse(stored) : []
  })
  const [isLinkedToRemote, setIsLinkedToRemote] = useState(() => {
    const stored = localStorage.getItem('gitcraft_isLinkedToRemote')
    return stored ? JSON.parse(stored) : false
  })
  const [isPushedToRemote, setIsPushedToRemote] = useState(() => {
    const stored = localStorage.getItem('gitcraft_isPushedToRemote')
    return stored ? JSON.parse(stored) : false
  })
  const [remoteCommits, setRemoteCommits] = useState(() => {
    const stored = localStorage.getItem('gitcraft_remoteCommits')
    return stored ? JSON.parse(stored) : []
  })
  const [remoteFiles, setRemoteFiles] = useState(() => {
    const stored = localStorage.getItem('gitcraft_remoteFiles')
    return stored ? JSON.parse(stored) : []
  })

  // Git identity global configs
  const [gitConfigs, setGitConfigs] = useState(() => {
    const stored = localStorage.getItem('gitcraft_gitConfigs')
    return stored ? JSON.parse(stored) : {}
  })
  
  // Terminal Logs and History loaded from localStorage
  const [terminalHistory, setTerminalHistory] = useState(() => {
    const stored = localStorage.getItem('gitcraft_terminalHistory')
    return stored ? JSON.parse(stored) : [
      'Welcome to GitCraft Terminal v1.0.0',
      'Type commands below or click commands in the right-side panels to simulate them.',
      'Try typing "git status" or "git init" to get started!'
    ]
  })
  const [commandHistory, setCommandHistory] = useState(() => {
    const stored = localStorage.getItem('gitcraft_commandHistory')
    return stored ? JSON.parse(stored) : []
  })
  
  // Guided Workflows State
  const [activeWorkflow, setActiveWorkflow] = useState(null)
  const [workflowStepIndex, setWorkflowStepIndex] = useState(0)
  const [successAnimation, setSuccessAnimation] = useState(false)

  // LocalStorage State Syncer effects
  useEffect(() => {
    localStorage.setItem('gitcraft_isInitialized', JSON.stringify(isInitialized))
  }, [isInitialized])

  useEffect(() => {
    localStorage.setItem('gitcraft_files', JSON.stringify(files))
  }, [files])

  useEffect(() => {
    localStorage.setItem('gitcraft_commits', JSON.stringify(commits))
  }, [commits])

  useEffect(() => {
    localStorage.setItem('gitcraft_branches', JSON.stringify(branches))
  }, [branches])

  useEffect(() => {
    localStorage.setItem('gitcraft_currentBranch', currentBranch)
  }, [currentBranch])

  useEffect(() => {
    localStorage.setItem('gitcraft_stashes', JSON.stringify(stashes))
  }, [stashes])

  useEffect(() => {
    localStorage.setItem('gitcraft_isLinkedToRemote', JSON.stringify(isLinkedToRemote))
  }, [isLinkedToRemote])

  useEffect(() => {
    localStorage.setItem('gitcraft_isPushedToRemote', JSON.stringify(isPushedToRemote))
  }, [isPushedToRemote])

  useEffect(() => {
    localStorage.setItem('gitcraft_remoteCommits', JSON.stringify(remoteCommits))
  }, [remoteCommits])

  useEffect(() => {
    localStorage.setItem('gitcraft_remoteFiles', JSON.stringify(remoteFiles))
  }, [remoteFiles])

  useEffect(() => {
    localStorage.setItem('gitcraft_terminalHistory', JSON.stringify(terminalHistory))
  }, [terminalHistory])

  useEffect(() => {
    localStorage.setItem('gitcraft_commandHistory', JSON.stringify(commandHistory))
  }, [commandHistory])

  useEffect(() => {
    localStorage.setItem('gitcraft_gitConfigs', JSON.stringify(gitConfigs))
  }, [gitConfigs])

  // Auto-advance workflow step validation
  useEffect(() => {
    if (activeWorkflow) {
      const activeFlow = WORKFLOWS.find(w => w.id === activeWorkflow)
      if (!activeFlow) return

      const step = activeFlow.steps[workflowStepIndex]
      const isValid = step.validation({
        isInitialized,
        files,
        commits,
        currentBranch,
        stashes,
        isLinkedToRemote,
        isPushedToRemote
      })
      
      if (isValid) {
        if (workflowStepIndex < activeFlow.steps.length - 1) {
          setWorkflowStepIndex(prev => prev + 1)
        } else {
          setTerminalHistory(prev => [...prev, '🎉 Task Completed! You completed the workflow successfully.'])
          setActiveWorkflow(null)
          setWorkflowStepIndex(0)
        }
      }
    }
  }, [files, commits, isInitialized, currentBranch, stashes, isLinkedToRemote, isPushedToRemote, activeWorkflow, workflowStepIndex])

  // Custom File Modification triggers (simulating code edits in text editor)
  const makeLocalModification = (filename) => {
    setFiles(prev => prev.map(f => f.name === filename ? {
      ...f,
      state: f.state === 'committed' ? 'modified' : f.state,
      content: f.content + '\n// Local changes added.'
    } : f))
    setTerminalHistory(prev => [...prev, `[Local Edit] Modified local file ${filename}.`])
  }

  // Create a new untracked file
  const addNewFile = (filename) => {
    if (!filename) return
    if (files.some(f => f.name === filename)) {
      throw new Error(`File ${filename} already exists.`)
    }
    setFiles(prev => [...prev, { name: filename, state: 'untracked', content: '<!-- New file Content -->' }])
    setTerminalHistory(prev => [...prev, `Created untracked file ${filename}`])
  }

  // Delete local file
  const deleteFile = (filename) => {
    setFiles(prev => prev.filter(f => f.name !== filename))
    setTerminalHistory(prev => [...prev, `Deleted file ${filename}`])
  }

  // Core Command Executing Logic
  const executeCommand = (cmdStr) => {
    if (!cmdStr.trim()) return

    const trimmed = cmdStr.trim()
    setCommandHistory(prev => [...prev, trimmed])
    
    // Add command to log
    setTerminalHistory(prev => [...prev, `$ ${trimmed}`])
    
    const args = trimmed.split(/\s+/)
    const base = args[0]
    
    // Non-git convenience helpers for simulator
    if (base === 'create-file') {
      const filename = args[1] || 'newfile.html'
      try {
        addNewFile(filename)
      } catch (err) {
        setTerminalHistory(prev => [...prev, `Error: ${err.message}`])
      }
      return
    }

    if (base === 'edit-file') {
      const filename = args[1] || 'main.js'
      if (!files.some(f => f.name === filename)) {
        setTerminalHistory(prev => [...prev, `Error: File ${filename} not found.`])
      } else {
        makeLocalModification(filename)
      }
      return
    }

    // Initialize preset environment for stashing guide
    if (base === 'git' && args[1] === 'init-preset') {
      setIsInitialized(true)
      const baseCommits = [
        { id: 'a1b2c3d', message: 'initial commit', branch: 'main', filesSnap: [...INITIAL_FILES.map(f => ({ ...f, state: 'committed' }))] }
      ]
      setFiles(INITIAL_FILES.map(f => ({ ...f, state: 'committed' })))
      setCommits(baseCommits)
      setIsLinkedToRemote(false)
      setIsPushedToRemote(false)
      setTerminalHistory(prev => [...prev, 'Initialized empty Git repository in /project/.git/', 'Committed initial project snapshot to main.'])
      return
    }

    if (base !== 'git') {
      setTerminalHistory(prev => [...prev, `bash: command not found: ${base}. (Only "git" commands allowed.)`])
      return
    }

    const gitCmd = args[1]
    
    if (!gitCmd) {
      setTerminalHistory(prev => [...prev, 'git: No command specified. Try "git status" or "git init".'])
      return
    }

    // Restrict commands until repo is initialized
    if (!isInitialized && gitCmd !== 'init' && gitCmd !== 'config' && gitCmd !== 'clone') {
      setTerminalHistory(prev => [...prev, 'fatal: not a git repository (or any of the parent directories): .git'])
      return
    }

    switch (gitCmd) {
      case 'config': {
        const hasGlobal = args.includes('--global')
        const listIdx = args.indexOf('--list') !== -1 ? args.indexOf('--list') : args.indexOf('-l')
        
        if (listIdx !== -1) {
          const keys = Object.keys(gitConfigs)
          if (keys.length === 0) {
            setTerminalHistory(prev => [...prev, ''])
          } else {
            const listOut = keys.map(k => `${k}=${gitConfigs[k]}`)
            setTerminalHistory(prev => [...prev, ...listOut])
          }
          break
        }
        
        const configArgs = args.filter(a => a !== 'git' && a !== 'config' && a !== '--global')
        
        if (configArgs.length === 1) {
          const key = configArgs[0]
          const val = gitConfigs[key]
          if (val) {
            setTerminalHistory(prev => [...prev, val])
          } else {
            setTerminalHistory(prev => [...prev, `error: key "${key}" is not set`])
          }
        } else if (configArgs.length >= 2) {
          const key = configArgs[0]
          let val = configArgs.slice(1).join(' ')
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1)
          } else if (val.startsWith("'") && val.endsWith("'")) {
            val = val.substring(1, val.length - 1)
          }
          
          if (key === 'user.name' || key === 'user.email' || key === 'init.defaultBranch') {
            setGitConfigs(prev => ({ ...prev, [key]: val }))
            setTerminalHistory(prev => [...prev, `Set config ${key} to "${val}"${hasGlobal ? ' globally' : ''}.`])
          } else {
            setTerminalHistory(prev => [...prev, `error: unknown config key "${key}"`])
          }
        } else {
          setTerminalHistory(prev => [
            ...prev,
            'Usage:',
            '  git config --global user.name "Your Name"',
            '  git config --global user.email "you@example.com"',
            '  git config --list'
          ])
        }
        break
      }
      
      case 'init':
        if (isInitialized) {
          setTerminalHistory(prev => [...prev, 'Reinitialized existing Git repository in /project/.git/'])
        } else {
          setIsInitialized(true)
          setTerminalHistory(prev => [...prev, 'Initialized empty Git repository in /project/.git/'])
        }
        break
        
      case 'clone': {
        const url = args[2]
        if (!url) {
          setTerminalHistory(prev => [...prev, 'fatal: You must specify a repository to clone.'])
        } else {
          setIsInitialized(true)
          setFiles(INITIAL_FILES.map(f => ({ ...f, state: 'committed' })))
          setCommits([
            { id: 'f5d8e2a', message: 'Initial commit from clone', branch: 'main', filesSnap: INITIAL_FILES.map(f => ({ ...f, state: 'committed' })) }
          ])
          setTerminalHistory(prev => [
            ...prev,
            `Cloning into 'landingPage-login'...`,
            `remote: Enumerating objects: 4, done.`,
            `remote: Counting objects: 100% (4/4), done.`,
            `Receiving objects: 100% (4/4), done.`,
            `Switched to branch 'main'`
          ])
        }
        break
      }

      case 'status': {
        const stagedFiles = files.filter(f => f.state === 'staged')
        const untrackedFiles = files.filter(f => f.state === 'untracked')
        const modifiedFiles = files.filter(f => f.state === 'modified')
        
        let outputLines = [`On branch ${currentBranch}`]
        
        if (stagedFiles.length > 0) {
          outputLines.push('Changes to be committed:')
          outputLines.push('  (use "git restore --staged <file>..." to unstage)')
          stagedFiles.forEach(f => {
            outputLines.push(`\tgreen:new file:   ${f.name}`)
          })
        }
        
        if (modifiedFiles.length > 0) {
          outputLines.push('Changes not staged for commit:')
          outputLines.push('  (use "git add <file>..." to update what will be committed)')
          outputLines.push('  (use "git restore <file>..." to discard changes in working directory)')
          modifiedFiles.forEach(f => {
            outputLines.push(`\tred:modified:   ${f.name}`)
          })
        }
        
        if (untrackedFiles.length > 0) {
          outputLines.push('Untracked files:')
          outputLines.push('  (use "git add <file>..." to include in what will be committed)')
          untrackedFiles.forEach(f => {
            outputLines.push(`\tred:   ${f.name}`)
          })
        }
        
        if (stagedFiles.length === 0 && untrackedFiles.length === 0 && modifiedFiles.length === 0) {
          outputLines.push('nothing to commit, working tree clean')
        }
        
        setTerminalHistory(prev => [...prev, ...outputLines])
        break
      }
      
      case 'add': {
        const fileTarget = args[2]
        if (!fileTarget) {
          setTerminalHistory(prev => [...prev, 'Nothing specified, nothing added.'])
        } else if (fileTarget === '.') {
          setFiles(prev => prev.map(f => f.state === 'untracked' || f.state === 'modified' ? { ...f, state: 'staged' } : f))
          setTerminalHistory(prev => [...prev, 'Staged changes for all files.'])
        } else {
          if (files.some(f => f.name === fileTarget)) {
            setFiles(prev => prev.map(f => f.name === fileTarget ? { ...f, state: 'staged' } : f))
            setTerminalHistory(prev => [...prev, `Staged changes for ${fileTarget}.`])
          } else {
            setTerminalHistory(prev => [...prev, `fatal: pathspec '${fileTarget}' did not match any files`])
          }
        }
        break
      }

      case 'commit': {
        // Enforce user.name and user.email configuration
        if (!gitConfigs['user.name'] || !gitConfigs['user.email']) {
          setTerminalHistory(prev => [
            ...prev,
            '*** Please tell me who you are.',
            '',
            'Rerun',
            '',
            '  git config --global user.email "you@example.com"',
            '  git config --global user.name "Your Name"',
            '',
            "to set your account's default identity.",
            '',
            'fatal: unable to auto-detect email address (got empty local configuration)'
          ])
          break
        }

        const mIdx = args.indexOf('-m')
        let msg = ''
        if (mIdx !== -1 && args[mIdx + 1]) {
          msg = args.slice(mIdx + 1).join(' ').replace(/"/g, '')
        } else {
          setTerminalHistory(prev => [...prev, 'Aborting commit. Use: git commit -m "your message"'])
          break
        }
        
        const stagedFiles = files.filter(f => f.state === 'staged')
        
        if (stagedFiles.length === 0 && args.indexOf('-a') === -1) {
          setTerminalHistory(prev => [...prev, 'nothing to commit, working tree clean'])
        } else {
          let filesToCommit = [...files]
          if (args.indexOf('-a') !== -1) {
            filesToCommit = filesToCommit.map(f => f.state === 'modified' ? { ...f, state: 'staged' } : f)
          }
          
          const finalStaged = filesToCommit.filter(f => f.state === 'staged')
          
          if (finalStaged.length === 0) {
            setTerminalHistory(prev => [...prev, 'nothing to commit, working tree clean'])
            break
          }
          
          const commitId = Math.random().toString(16).substring(2, 9)
          const newCommit = {
            id: commitId,
            message: msg,
            branch: currentBranch,
            filesSnap: filesToCommit.map(f => f.state === 'staged' ? { ...f, state: 'committed' } : f)
          }
          
          setCommits(prev => [newCommit, ...prev])
          setFiles(prev => prev.map(f => f.state === 'staged' ? { ...f, state: 'committed' } : f))
          setTerminalHistory(prev => [
            ...prev,
            `[${currentBranch} ${commitId}] ${msg}`,
            ` ${finalStaged.length} file(s) changed, staged changes committed.`
          ])
        }
        break
      }
      
      case 'branch': {
        const opt = args[2]
        if (!opt) {
          const bList = branches.map(b => b === currentBranch ? `* green:${b}` : `  ${b}`)
          setTerminalHistory(prev => [...prev, ...bList])
        } else if (opt === '-M') {
          const newName = args[3]
          if (newName) {
            setBranches(prev => prev.map(b => b === currentBranch ? newName : b))
            setCurrentBranch(newName)
            setTerminalHistory(prev => [...prev, `Renamed default branch to '${newName}'`])
          } else {
            setTerminalHistory(prev => [...prev, 'Usage: git branch -M <new-name>'])
          }
        } else if (opt === '-d') {
          const bDel = args[3]
          if (bDel === currentBranch) {
            setTerminalHistory(prev => [...prev, `error: Cannot delete branch '${bDel}' checked out.`])
          } else if (branches.includes(bDel)) {
            setBranches(prev => prev.filter(b => b !== bDel))
            setTerminalHistory(prev => [...prev, `Deleted branch ${bDel}.`])
          } else {
            setTerminalHistory(prev => [...prev, `error: branch '${bDel}' not found.`])
          }
        } else {
          if (branches.includes(opt)) {
            setTerminalHistory(prev => [...prev, `fatal: A branch named '${opt}' already exists.`])
          } else {
            setBranches(prev => [...prev, opt])
            setTerminalHistory(prev => [...prev, `Created branch '${opt}'.`])
          }
        }
        break
      }
      
      case 'checkout': {
        const target = args[2]
        if (target === '-b') {
          const bName = args[3]
          if (!bName) {
            setTerminalHistory(prev => [...prev, 'fatal: branch name required'])
          } else if (branches.includes(bName)) {
            setTerminalHistory(prev => [...prev, `fatal: A branch named '${bName}' already exists.`])
          } else {
            setBranches(prev => [...prev, bName])
            setCurrentBranch(bName)
            setTerminalHistory(prev => [...prev, `Switched to a new branch '${bName}'`])
          }
        } else if (target) {
          if (branches.includes(target)) {
            setCurrentBranch(target)
            // Restore files to the state of the target branch's latest commit
            const targetCommit = commits.find(c => c.branch === target)
            if (targetCommit) {
              setFiles(targetCommit.filesSnap.map(f => ({ ...f })))
            } else {
              if (target === 'main' && !commits.some(c => c.branch === 'main')) {
                setFiles(INITIAL_FILES.map(f => ({ ...f })))
              }
            }
            setTerminalHistory(prev => [...prev, `Switched to branch '${target}'`])
          } else {
            setTerminalHistory(prev => [...prev, `error: pathspec '${target}' did not match any file(s)`])
          }
        } else {
          setTerminalHistory(prev => [...prev, 'Usage: git checkout <branch> or git checkout -b <new-branch>'])
        }
        break
      }
      
      case 'switch': {
        const target = args[2]
        if (target) {
          if (branches.includes(target)) {
            setCurrentBranch(target)
            // Restore files to the state of the target branch's latest commit
            const targetCommit = commits.find(c => c.branch === target)
            if (targetCommit) {
              setFiles(targetCommit.filesSnap.map(f => ({ ...f })))
            } else {
              if (target === 'main' && !commits.some(c => c.branch === 'main')) {
                setFiles(INITIAL_FILES.map(f => ({ ...f })))
              }
            }
            setTerminalHistory(prev => [...prev, `Switched to branch '${target}'`])
          } else {
            setTerminalHistory(prev => [...prev, `fatal: invalid reference: ${target}`])
          }
        } else {
          setTerminalHistory(prev => [...prev, 'Usage: git switch <branch-name>'])
        }
        break
      }

      case 'merge': {
        const bMerge = args[2]
        if (!bMerge) {
          setTerminalHistory(prev => [...prev, 'fatal: select branch to merge'])
        } else if (!branches.includes(bMerge)) {
          setTerminalHistory(prev => [...prev, `merge: ${bMerge} - not something we can merge`])
        } else if (bMerge === currentBranch) {
          setTerminalHistory(prev => [...prev, 'Already up to date.'])
        } else {
          const lastBranchCommit = commits.find(c => c.branch === bMerge)
          if (lastBranchCommit) {
            const mergedFiles = lastBranchCommit.filesSnap.map(f => ({ ...f, state: 'committed' }))
            setFiles(prev => {
              const updated = [...prev]
              mergedFiles.forEach(mf => {
                const idx = updated.findIndex(f => f.name === mf.name)
                if (idx !== -1) {
                  updated[idx] = mf
                } else {
                  updated.push(mf)
                }
              })
              return updated
            })
            
            const commitId = Math.random().toString(16).substring(2, 9)
            const newCommit = {
              id: commitId,
              message: `Merge branch '${bMerge}' into ${currentBranch}`,
              branch: currentBranch,
              filesSnap: files.map(f => ({ ...f, state: 'committed' }))
            }
            
            setCommits(prev => [newCommit, ...prev])
            setTerminalHistory(prev => [
              ...prev,
              `Updating ${commits[0]?.id || 'root'}..${lastBranchCommit.id}`,
              `Fast-forward`,
              `Merge made by the 'recursive' strategy.`
            ])
          } else {
            setTerminalHistory(prev => [...prev, `No commits on branch '${bMerge}' to merge.`])
          }
        }
        break
      }

      case 'remote': {
        const sub = args[2]
        if (sub === 'add' && args[3] === 'origin' && args[4]) {
          setIsLinkedToRemote(true)
          setTerminalHistory(prev => [...prev, `Origin linked to remote repository: ${args[4]}`])
        } else {
          setTerminalHistory(prev => [...prev, 'Usage: git remote add origin <github-repo-url>'])
        }
        break
      }

      case 'push': {
        if (!isLinkedToRemote) {
          setTerminalHistory(prev => [...prev, 'fatal: No remote repository configured. Use git remote add origin <url>'])
          break
        }
        
        if (commits.length === 0) {
          setTerminalHistory(prev => [...prev, 'Everything up-to-date (no commits found).'])
          break
        }
        
        setIsPushedToRemote(true)
        setRemoteCommits([...commits])
        setRemoteFiles([...files.map(f => ({ ...f, state: 'committed' }))])
        
        setTerminalHistory(prev => [
          ...prev,
          `Enumerating objects: ${commits.length * 3}, done.`,
          `Writing objects: 100%`,
          `To https://github.com/larenzz15/landingPage-login.git`,
          ` * [new branch]      ${currentBranch} -> ${currentBranch}`
        ])
        
        setSuccessAnimation(true)
        setTimeout(() => setSuccessAnimation(false), 3000)
        break
      }

      case 'pull': {
        if (!isLinkedToRemote) {
          setTerminalHistory(prev => [...prev, 'fatal: No remote repository configured.'])
          break
        }
        setTerminalHistory(prev => [
          ...prev,
          `From https://github.com/larenzz15/landingPage-login`,
          ` Already up to date.`
        ])
        break
      }

      case 'fetch':
        setTerminalHistory(prev => [
          ...prev,
          `Fetching origin...`,
          `From https://github.com/larenzz15/landingPage-login`,
          ` * [new branch]      main       -> origin/main`
        ])
        break

      case 'stash': {
        const action = args[2]
        if (!action || action === '-u') {
          const modifiedOrUntracked = files.filter(f => f.state === 'modified' || f.state === 'staged' || (action === '-u' && f.state === 'untracked'))
          if (modifiedOrUntracked.length === 0) {
            setTerminalHistory(prev => [...prev, 'No local changes to save'])
          } else {
            const stashId = `stash@{${stashes.length}}`
            const newStash = {
              id: stashId,
              filesSnap: files.map(f => ({ ...f }))
            }
            setStashes(prev => [newStash, ...prev])
            if (commits.length > 0) {
              setFiles(commits[0].filesSnap.map(f => ({ ...f })))
            } else {
              setFiles(INITIAL_FILES.map(f => ({ ...f })))
            }
            setTerminalHistory(prev => [
              ...prev,
              `Saved working directory state WIP on ${currentBranch}: local changes stashed.`
            ])
          }
        } else if (action === 'pop') {
          if (stashes.length === 0) {
            setTerminalHistory(prev => [...prev, 'No stash entries found.'])
          } else {
            const popped = stashes[0]
            setStashes(prev => prev.slice(1))
            setFiles(popped.filesSnap)
            setTerminalHistory(prev => [
              ...prev,
              `Restored stashed state for active working tree.`,
              `Dropped refs/stash@{0}`
            ])
          }
        } else if (action === 'apply') {
          if (stashes.length === 0) {
            setTerminalHistory(prev => [...prev, 'No stash entries found.'])
          } else {
            setFiles(stashes[0].filesSnap)
            setTerminalHistory(prev => [...prev, 'Applied stash@{0} (kept in stash stack)'])
          }
        } else if (action === 'list') {
          if (stashes.length === 0) {
            setTerminalHistory(prev => [...prev, 'Stash list is empty.'])
          } else {
            const sList = stashes.map(s => `${s.id}: WIP on ${currentBranch}`)
            setTerminalHistory(prev => [...prev, ...sList])
          }
        } else if (action === 'clear') {
          setStashes([])
          setTerminalHistory(prev => [...prev, 'Cleared all stash entries.'])
        } else {
          setTerminalHistory(prev => [...prev, `git stash: unknown command: ${action}`])
        }
        break
      }

      case 'diff': {
        const modifiedFiles = files.filter(f => f.state === 'modified')
        if (modifiedFiles.length === 0) {
          setTerminalHistory(prev => [...prev, 'No differences found. Working tree clean.'])
        } else {
          let diffOut = []
          modifiedFiles.forEach(f => {
            diffOut.push(`diff --git a/${f.name} b/${f.name}`)
            diffOut.push(`+ // Modified edits in active development`)
          })
          setTerminalHistory(prev => [...prev, ...diffOut])
        }
        break
      }

      case 'log': {
        if (commits.length === 0) {
          setTerminalHistory(prev => [...prev, `fatal: your branch '${currentBranch}' does not have commits yet`])
          break
        }
        let logLines = []
        const isOneLine = args.includes('--oneline')
        commits.forEach(c => {
          if (isOneLine) {
            logLines.push(`yellow:${c.id} ${c.message}`)
          } else {
            logLines.push(`yellow:commit ${c.id}`)
            logLines.push(`Author: larenzz <email@gmail.com>`)
            logLines.push(`Branch: ${c.branch}`)
            logLines.push(`\n    ${c.message}\n`)
          }
        })
        setTerminalHistory(prev => [...prev, ...logLines])
        break
      }

      case 'restore': {
        const targetFile = args[args.length - 1]
        const isStagedFlag = args.includes('--staged')
        if (!targetFile || targetFile === 'restore') {
          setTerminalHistory(prev => [...prev, 'fatal: you must specify a file to restore.'])
          break
        }
        const fIndex = files.findIndex(f => f.name === targetFile)
        if (fIndex === -1) {
          setTerminalHistory(prev => [...prev, `error: pathspec '${targetFile}' not matched.`])
          break
        }
        if (isStagedFlag) {
          setFiles(prev => prev.map(f => f.name === targetFile ? { ...f, state: 'modified' } : f))
          setTerminalHistory(prev => [...prev, `Unstaged changes in ${targetFile}.`])
        } else {
          if (commits.length > 0) {
            const originalFile = commits[0].filesSnap.find(f => f.name === targetFile)
            if (originalFile) {
              setFiles(prev => prev.map(f => f.name === targetFile ? { ...originalFile } : f))
            } else {
              setFiles(prev => prev.filter(f => f.name !== targetFile))
            }
          } else {
            const originalFile = INITIAL_FILES.find(f => f.name === targetFile)
            if (originalFile) {
              setFiles(prev => prev.map(f => f.name === targetFile ? { ...originalFile } : f))
            }
          }
          setTerminalHistory(prev => [...prev, `Discarded changes in ${targetFile}.`])
        }
        break
      }

      case 'reset': {
        const targetCommit = args[args.length - 1]
        const isHard = args.includes('--hard')
        if (!targetCommit || targetCommit === 'reset') {
          setTerminalHistory(prev => [...prev, 'fatal: commit reference required'])
          break
        }
        if (targetCommit === 'HEAD~1') {
          if (commits.length <= 1) {
            setTerminalHistory(prev => [...prev, 'fatal: no parent commit available'])
          } else {
            const rolledBack = commits.slice(1)
            setCommits(rolledBack)
            if (isHard) {
              setFiles(rolledBack[0].filesSnap.map(f => ({ ...f })))
              setTerminalHistory(prev => [...prev, `HEAD is now at ${rolledBack[0].id} (hard)`])
            } else {
              setFiles(prev => prev.map(f => ({ ...f, state: 'modified' })))
              setTerminalHistory(prev => [...prev, `Reset commit. HEAD is now at ${rolledBack[0].id}`])
            }
          }
          break
        }
        const cMatch = commits.find(c => c.id === targetCommit)
        if (!cMatch) {
          setTerminalHistory(prev => [...prev, `fatal: commit '${targetCommit}' not found`])
        } else {
          const cIndex = commits.indexOf(cMatch)
          const rolledBack = commits.slice(cIndex)
          setCommits(rolledBack)
          if (isHard) {
            setFiles(cMatch.filesSnap.map(f => ({ ...f })))
            setTerminalHistory(prev => [...prev, `HEAD is now at ${cMatch.id} (hard)`])
          } else {
            setFiles(prev => prev.map(f => ({ ...f, state: 'modified' })))
            setTerminalHistory(prev => [...prev, `HEAD is now at ${cMatch.id}`])
          }
        }
        break
      }

      case 'clean': {
        const isDry = args.includes('-n')
        const isForce = args.includes('-f')
        const untracked = files.filter(f => f.state === 'untracked')
        if (untracked.length === 0) {
          setTerminalHistory(prev => [...prev, 'Already clean.'])
          break
        }
        if (isDry) {
          setTerminalHistory(prev => [...prev, ...untracked.map(f => `Would remove ${f.name}`)])
        } else if (isForce) {
          setFiles(prev => prev.filter(f => f.state !== 'untracked'))
          setTerminalHistory(prev => [...prev, ...untracked.map(f => `Removing ${f.name}`), 'Clean complete.'])
        } else {
          setTerminalHistory(prev => [...prev, 'fatal: clean requires -f or -n'])
        }
        break
      }

      default:
        setTerminalHistory(prev => [...prev, `git: '${gitCmd}' is not a valid command.`])
    }
  }

  // Clear states, variables and localStorage back to clean presets
  const resetEngine = () => {
    setIsInitialized(false)
    setFiles(INITIAL_FILES)
    setCommits([])
    setBranches(['main'])
    setCurrentBranch('main')
    setStashes([])
    setIsLinkedToRemote(false)
    setIsPushedToRemote(false)
    setRemoteCommits([])
    setRemoteFiles([])
    setGitConfigs({})
    setTerminalHistory([
      'Repository state reset completely.',
      'Welcome to GitCraft Terminal v1.0.0',
      'Type commands below or click commands in the right-side panels to simulate them.'
    ])
    setCommandHistory([])
    localStorage.clear()
  }

  return {
    isInitialized,
    setIsInitialized,
    files,
    setFiles,
    commits,
    setCommits,
    branches,
    currentBranch,
    setCurrentBranch,
    stashes,
    isLinkedToRemote,
    isPushedToRemote,
    remoteCommits,
    remoteFiles,
    gitConfigs,
    setGitConfigs,
    terminalHistory,
    setTerminalHistory,
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
  }
}
