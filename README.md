# GitCraft — Interactive Git & GitHub Sandbox Simulator

GitCraft is an interactive learning platform designed to demystify Git version control and GitHub remote collaboration. Through a visual sandbox environment and a simulated command-line terminal, it provides a safe space for developers to practice, experiment, and master version control concepts without the risk of breaking real codebases.

---

## 🌟 What is GitCraft?

Version control can be intimidating for beginners, and command-line mistakes can feel costly. GitCraft bridges this gap by providing:
* **A Visual local sandbox workspace**: See files react in real-time as they move between untracked (red), staged (green), modified (yellow), and committed (gray) states.
* **A live Commit History Graph**: Watch your branches sprout and commits connect in a real-time, nodes-based commit tree visualization.
* **A responsive CLI Terminal**: Type standard commands like `git init`, `git add .`, `git commit`, `git stash`, and `git reset` to see the virtual project react immediately.
* **Structured Training Academies**: Follow step-by-step guided flows to upload projects to GitHub, manage feature branches, and switch work contexts using the stash.

---

## 🎯 The Purpose: Git vs. GitHub

GitCraft is designed to visually demonstrate the fundamental conceptual division between local operations and remote synchronization:

### 1. Local Version Control (Git)
Operates entirely inside your local sandbox. It behaves like a camera, capturing progress snapshots (commits) of your `/project` folder. You can create branches, stash work, and revert mistakes completely offline.

### 2. Cloud Collaboration (GitHub)
The remote hosting server. It stores a mirror of your local history online so other developers can collaborate. GitCraft simulates this connection by letting you link a remote origin and push local branch commits to the cloud.

---

## ⚡ Key Highlights

* **Guided Step-by-Step Training**: Walkthrough scripts monitor your workspace actions and guide you through daily development pipelines.
* **Tactile Command Sheet**: Access a quick reference table of common setup, branching, stashing, and restoring commands, and trigger them instantly in the terminal with one click.
* **Custom Modals**: Custom-designed prompts and danger dialogs guide file creation and deletions with styled safety confirmations.
* **CLI History Recall**: Use the Up and Down arrow keys inside the terminal input to search and repeat past command submissions.
