# GitCraft Local Setup Guide

Follow these steps to run the GitCraft platform locally on your machine.

## Prerequisites

Before setting up, make sure you have the following installed on your system:
* **Node.js** (Version 18.0 or higher is recommended)
* **npm** (comes packaged with Node.js)

---

## 🛠️ Step-by-Step Installation

### 1. Navigate to the Project Folder
Open your terminal and change directories to the folder where you cloned or extracted the project:
```bash
cd gitcraft
```

### 2. Install Project Dependencies
Run the install command to download all required packages:
```bash
npm install
```

### 3. Launch the Development Server
Start the local server. It compiles the assets and watches for changes:
```bash
npm run dev
```

Once started, the terminal will display the local URL. Open this in your browser:
* 👉 **http://localhost:5173/**

---

## 🏗️ Production Build (Optional)

If you want to compile and build the final static application:
```bash
# Build the production application
npm run build

# Preview the built application locally
npm run preview
```
