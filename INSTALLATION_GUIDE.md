# Installation Guide - Node.js Setup

## ⚠️ Node.js Not Installed

You need to install Node.js to run this Next.js project. Node.js includes npm (Node Package Manager).

## 📥 How to Install Node.js

### Option 1: Download from Official Website (Recommended)

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version (recommended)
3. Run the installer
4. Follow the installation wizard
5. **Important**: Make sure to check "Add to PATH" during installation
6. Restart your terminal/PowerShell after installation

### Option 2: Using Chocolatey (Windows Package Manager)

If you have Chocolatey installed:

```powershell
choco install nodejs-lts
```

### Option 3: Using Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ Verify Installation

After installing, restart your terminal and run:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`).

## 🚀 After Installation

Once Node.js is installed, you can:

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Run development server:**
   ```powershell
   npm run dev
   ```

3. **Build for production:**
   ```powershell
   npm run build
   ```

## 🌐 Alternative: Deploy Directly to Vercel

If you want to skip local setup, you can:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically install dependencies and deploy

No local Node.js installation needed for deployment!

## 📝 Current Project Status

✅ All code files are ready
✅ Project structure is complete
✅ Configuration files are set up
⏳ Just need Node.js to run locally (or deploy to Vercel)

## 🆘 Troubleshooting

### If npm is still not recognized after installation:

1. **Restart your terminal/PowerShell** (close and reopen)
2. **Check PATH environment variable:**
   - Search "Environment Variables" in Windows
   - Check if Node.js is in your PATH
   - Usually: `C:\Program Files\nodejs\`
3. **Reinstall Node.js** and make sure "Add to PATH" is checked

### If you get permission errors:

Run PowerShell as Administrator and try again.

