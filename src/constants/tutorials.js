export const TUTORIALS = [
  {
    cmd: 'git config',
    category: 'Configuration & Setup',
    syntax: 'git config --global user.name "your_name"\ngit config --global user.email "your_email@example.com"',
    desc: 'Configure your identity globally for all Git commits.',
    why: 'Git embeds your name and email inside every commit snapshot you create. This tells other developers (and hosting services like GitHub) who wrote each line of code in the repository history.',
    when: 'Run this once when you set up a new computer, or when you want to change your global Git credentials.',
    example: `# Set user details\ngit config --global user.name "John Doe"\ngit config --global user.email johndoe@example.com\n\n# Check configurations\ngit config --list`
  },
  {
    cmd: 'git init',
    category: 'Configuration & Setup',
    syntax: 'git init',
    desc: 'Initialize a brand new, empty local Git repository.',
    why: 'Creates a hidden directory named \`.git\` inside your project folder. This hidden database tracks all files, modifications, commit nodes, and configuration settings for the repository.',
    when: 'Run this once at the very beginning of a new project when you want to start tracking its files with Git version control.',
    example: `# Navigate to project folder\ncd my-project\n\n# Initialize git repository\ngit init`
  },
  {
    cmd: 'git clone',
    category: 'Configuration & Setup',
    syntax: 'git clone <repository_url>',
    desc: 'Clone/download an existing remote project from GitHub onto your computer.',
    why: 'Copies the complete repository directory, branches, and historical commit records from the remote host (GitHub) into a new folder on your local computer, automatically linking it as an active tracking origin.',
    when: 'Run this when you want to download and work on an existing repository already published on GitHub.',
    example: `# Clone landing page repo\ngit clone https://github.com/larenzz15/landingPage-login.git`
  },
  {
    cmd: 'git status',
    category: 'File Operations',
    syntax: 'git status',
    desc: 'Show the current status of files in the working directory.',
    why: 'Queries the index and folder workspace to display three groups of files:\n1. **Untracked files (red)**: New files Git is not watching yet.\n2. **Modified files (red)**: Existing tracked files that have uncommitted changes.\n3. **Staged files (green)**: Files staged and ready to be locked into the next commit.',
    when: 'Run this constantly! Check it before staging, before committing, and after switching branches to know the state of your project.',
    example: `# Check repository status\ngit status`
  },
  {
    cmd: 'git add',
    category: 'File Operations',
    syntax: 'git add <filename>\ngit add .',
    desc: 'Add file modifications or new files to the Staging Area.',
    why: 'Prepares files to be saved. The staging area is a temporary holding zone (index) where you review changes before taking a snapshot. Using \`git add .\` stages all modified/new files in the directory.',
    when: 'Run this whenever you have made code changes or added new files that you want to include in your next commit.',
    example: `# Stage a single file\ngit add index.html\n\n# Stage all changes\ngit add .`
  },
  {
    cmd: 'git commit',
    category: 'Saving Changes',
    syntax: 'git commit -m "your commit message"',
    desc: 'Create a permanent historical snapshot of staged changes.',
    why: 'Locks all staged (green) changes into a permanent commit node in the repository database. Each commit gets a unique SHA-1 hash identifier and records the author, date, and commit message describing the updates.',
    when: 'Run this once you have completed a logical unit of work (e.g., "fix button alignment" or "add authentication route"). Avoid committing broken code.',
    example: `# Commit changes with a descriptive message\ngit commit -m "Add responsive grid to landing page hero"`
  },
  {
    cmd: 'git branch',
    category: 'Branching & Merging',
    syntax: 'git branch\ngit branch <branch_name>\ngit checkout -b <branch_name>',
    desc: 'Create, list, or delete branches.',
    why: 'Branches are lightweight pointers to commits. They allow you to branch off the main line of code to experiment or fix bugs in isolation. Using \`git checkout -b\` creates a branch and switches to it in one step.',
    when: 'Create a new branch whenever you begin working on a new feature, fixing a bug, or experimenting with code without risk to the stable \`main\` branch.',
    example: `# List all local branches\ngit branch\n\n# Create feature branch and switch to it\ngit checkout -b feature-auth\n\n# Delete branch once merged\ngit branch -d feature-auth`
  },
  {
    cmd: 'git switch',
    category: 'Branching & Merging',
    syntax: 'git switch <branch_name>',
    desc: 'Switch checkout focus to another branch.',
    why: 'Updates the files in your working directory to match the commit snapshot pointed to by the target branch, updating the HEAD reference pointer.',
    when: 'Use this to toggle back and forth between active feature development branches or return to \`main\`.',
    example: `# Switch to main branch\ngit switch main\n\n# Switch back to development\ngit switch dev`
  },
  {
    cmd: 'git merge',
    category: 'Branching & Merging',
    syntax: 'git merge <branch_name>',
    desc: 'Combine history/files from another branch into your active branch.',
    why: 'Integrates commit histories of two different branches. If the target branch has commits not on the active branch, Git merges them (often fast-forwarding the history, or creating a Recursive Merge Commit if histories diverged).',
    when: 'Run this on your \`main\` branch when a feature branch is fully completed, tested, and ready to be integrated into the stable code.',
    example: `# Switch to target branch first\ngit switch main\n\n# Merge authentication changes\ngit merge feature-auth`
  },
  {
    cmd: 'git remote',
    category: 'GitHub Integration',
    syntax: 'git remote add origin <repository_url>',
    desc: 'Manage connections to remote repositories.',
    why: 'Tells your local Git repository where the online cloud server (like GitHub) is located. naming the connection \`origin\` is a default convention.',
    when: 'Run this once after initializing a local repository to link it to a newly created empty repository on GitHub.',
    example: `# Link local repo to GitHub origin URL\ngit remote add origin https://github.com/larenzz15/landingPage-login.git\n\n# Verify remote links\ngit remote -v`
  },
  {
    cmd: 'git push',
    category: 'GitHub Integration',
    syntax: 'git push -u origin <branch_name>',
    desc: 'Upload local commits onto your GitHub remote repository.',
    why: 'Transfers commit data and branch references from your local computer to the remote hosting server (GitHub). The \`-u\` flag sets the upstream tracking branch so future pushes only require running \`git push\`.',
    when: 'Run this after committing changes locally that you want to share with other developers, publish to the web, or back up online.',
    example: `# Push local commits on main branch to remote\ngit push -u origin main`
  },
  {
    cmd: 'git pull',
    category: 'GitHub Integration',
    syntax: 'git pull origin <branch_name>',
    desc: 'Fetch remote changes and merge them locally in one step.',
    why: 'Downloads historical commits and changes from the GitHub remote repository and automatically merges them into your active local branch, keeping you in sync with teammates.',
    when: 'Run this before starting to edit files each day to ensure you are developing on top of the latest updates made by others.',
    example: `# Download and merge main branch updates\ngit pull origin main`
  },
  {
    cmd: 'git stash',
    category: 'Context Switching',
    syntax: 'git stash\ngit stash -u\ngit stash pop',
    desc: 'Temporarily shelve uncommitted workspace changes.',
    why: 'Saves your uncommitted modifications (staged and unstaged) to a temporary stack and resets the workspace back to a clean HEAD. \`git stash -u\` includes untracked files as well. \`git stash pop\` restores the stashed changes.',
    when: 'Use this when you are in the middle of a feature and need to switch branches immediately to fix an urgent bug, but you aren\'t ready to commit your current half-written edits.',
    example: `# Stash dirty changes including new files\ngit stash -u\n\n# Switch branches, fix bug, commit...\ngit switch feature-auth\n\n# Switch back and restore stashed work\ngit stash pop`
  },
  {
    cmd: 'git restore',
    category: 'History & Restoring',
    syntax: 'git restore <filename>\ngit restore --staged <filename>',
    desc: 'Discard changes or unstage files.',
    why: 'Undoes file edits. Running \`git restore <file>\` discards modifications and reverts it back to the last commit. Running \`git restore --staged <file>\` unstages a file (moves it from staged back to modified/untracked state).',
    when: 'Use this when you made edits you want to throw away, or staged files by mistake that you aren\'t ready to commit yet.',
    example: `# Unstage index.html\ngit restore --staged index.html\n\n# Revert index.html edits\ngit restore index.html`
  },
  {
    cmd: 'git reset',
    category: 'History & Restoring',
    syntax: 'git reset HEAD~1\ngit reset --hard <commit_hash>',
    desc: 'Reset project history back to a specific commit.',
    why: 'Moves the active branch pointer back in history to a target commit. A soft/mixed reset (default) keeps the reverted edits in your files. A \`--hard\` reset completely discards all historical changes and uncommitted edits.',
    when: 'Use this when you committed code by mistake and want to roll back the history. Use \`--hard\` with extreme caution, as it permanently discards code.',
    example: `# Undo last commit, keeping files intact\ngit reset HEAD~1\n\n# Revert repository state back to a past commit\ngit reset --hard a1b2c3d`
  }
]
