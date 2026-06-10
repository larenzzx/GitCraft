import { INITIAL_FILES } from './initialFiles'

export const WORKFLOWS = [
  {
    id: 'upload',
    title: 'Publish to GitHub',
    description: 'Learn how to take your local folder and push it onto a brand new GitHub repository.',
    steps: [
      {
        instruction: 'Initialize your local Git repository. Type or click: git init',
        command: 'git init',
        highlight: 'git-init',
        validation: (state) => state.isInitialized
      },
      {
        instruction: 'Stage all of your files for the commit. Type or click: git add .',
        command: 'git add .',
        highlight: 'git-add',
        validation: (state) => state.files.every(f => f.state === 'staged' || f.state === 'committed')
      },
      {
        instruction: 'Commit your staged files. Type or click: git commit -m "project uploaded"',
        command: 'git commit -m "project uploaded"',
        highlight: 'git-commit',
        validation: (state) => state.commits.length > 0
      },
      {
        instruction: 'Set the main branch. Type or click: git branch -M main',
        command: 'git branch -M main',
        highlight: 'git-branch',
        validation: (state) => state.currentBranch === 'main'
      },
      {
        instruction: 'Link to GitHub remote repo. Type or click: git remote add origin https://github.com/larenzz15/landingPage-login.git',
        command: 'git remote add origin https://github.com/larenzz15/landingPage-login.git',
        highlight: 'git-remote',
        validation: (state) => state.isLinkedToRemote
      },
      {
        instruction: 'Push your commits to GitHub. Type or click: git push -u origin main',
        command: 'git push -u origin main',
        highlight: 'git-push',
        validation: (state) => state.isPushedToRemote
      }
    ]
  },
  {
    id: 'branching',
    title: 'Feature Branching & Merging',
    description: 'Create a feature branch, make a change, commit it, switch back, and merge it.',
    steps: [
      {
        instruction: 'Make sure your repo is initialized. (Runs automatically if not: git init)',
        command: 'git init',
        highlight: 'git-init',
        validation: (state) => state.isInitialized
      },
      {
        instruction: 'Create and switch to a new branch for authentication. Type: git checkout -b auth-ui',
        command: 'git checkout -b auth-ui',
        highlight: 'git-checkout-b',
        validation: (state) => state.currentBranch === 'auth-ui'
      },
      {
        instruction: 'Create a new file named login.html. Click "New File" and name it login.html, or click auto-create:',
        command: 'create-file login.html',
        highlight: 'new-file',
        validation: (state) => state.files.some(f => f.name === 'login.html')
      },
      {
        instruction: 'Stage the new login.html file. Type: git add login.html',
        command: 'git add login.html',
        highlight: 'git-add',
        validation: (state) => state.files.find(f => f.name === 'login.html')?.state === 'staged'
      },
      {
        instruction: 'Commit the authentication layout. Type: git commit -m "add login UI"',
        command: 'git commit -m "add login UI"',
        highlight: 'git-commit',
        validation: (state) => state.commits.some(c => c.branch === 'auth-ui')
      },
      {
        instruction: 'Switch back to the main branch. Type: git checkout main',
        command: 'git checkout main',
        highlight: 'git-checkout',
        validation: (state) => state.currentBranch === 'main'
      },
      {
        instruction: 'Merge auth-ui changes into main. Type: git merge auth-ui',
        command: 'git merge auth-ui',
        highlight: 'git-merge',
        validation: (state) => state.files.some(f => f.name === 'login.html' && f.state === 'committed')
      }
    ]
  },
  {
    id: 'stashing',
    title: 'Context Switching with Stash',
    description: 'Save temporary changes without committing so you can work on a hotfix.',
    steps: [
      {
        instruction: 'Initialize repo and add baseline commit first. (Or click auto-run):',
        command: 'git init-preset',
        highlight: 'git-init',
        validation: (state) => state.commits.length > 0
      },
      {
        instruction: 'Modify main.js (Click on main.js in workspace or run mock edit):',
        command: 'edit-file main.js',
        highlight: 'edit-file',
        validation: (state) => state.files.find(f => f.name === 'main.js')?.state === 'modified'
      },
      {
        instruction: 'Stash your uncommitted changes. Type: git stash -u',
        command: 'git stash -u',
        highlight: 'git-stash',
        validation: (state) => state.stashes.length > 0
      },
      {
        instruction: 'Create emergency hotfix branch. Type: git checkout -b hotfix-alert',
        command: 'git checkout -b hotfix-alert',
        highlight: 'git-checkout-b',
        validation: (state) => state.currentBranch === 'hotfix-alert'
      },
      {
        instruction: 'Switch back to main branch. Type: git checkout main',
        command: 'git checkout main',
        highlight: 'git-checkout',
        validation: (state) => state.currentBranch === 'main'
      },
      {
        instruction: 'Recover your stashed work. Type: git stash pop',
        command: 'git stash pop',
        highlight: 'git-stash-pop',
        validation: (state) => state.files.find(f => f.name === 'main.js')?.state === 'modified' && state.stashes.length === 0
      }
    ]
  }
]
