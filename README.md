# 🛠️ ProjectForge

**ProjectForge** is an AI-powered software architect designed to build complete, production-ready project blueprints in minutes. Featuring an interactive 26-step builder, real-time live preview, and seamless AI integration, it transforms high-level ideas into structured development plans effortlessly.

---

## ✨ Features

* **🤖 AI-Powered Architecture:** Integrated with **OpenRouter AI** to generate comprehensive project blueprints.
* **🎯 26-Step Interactive Builder:** Guided step-by-step workflow for precise architectural configuration.
* **👁️ Real-Time Live Preview:** See your blueprint take shape instantly as you make changes.
* **💾 Local Storage Persistence:** Automatically saves your progress locally so you never lose your work.
* **🌙 Dark Mode Support:** Sleek, modern dark aesthetic designed for high visibility and reduced eye strain.
* **🎨 Smooth Animations:** Powered by **Framer Motion** for a fluid, dynamic user interface.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Library:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **AI API Integration:** [OpenRouter API](https://openrouter.ai/)

---

# 🚀 Getting Started

Follow these steps to set up and run ProjectForge locally on your machine.

## Prerequisites

Ensure you have the following installed:

* **Node.js** (v18.17.0 or higher recommended)
* **npm**, **yarn**, or **pnpm**

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/projectforge.git
cd projectforge
```

---

### 2. Install Dependencies

If you recently deleted your `node_modules` folder, running this command will restore all required packages from `package.json`.

```bash
npm install
```

or:

```bash
yarn install
```

or:

```bash
pnpm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Replace `your_openrouter_api_key_here` with your actual OpenRouter API key.

---

### 4. Start Development Server

```bash
npm run dev
```

or:

```bash
yarn dev
```

or:

```bash
pnpm dev
```

---

### 5. Open ProjectForge

Visit:

```
http://localhost:3000
```

---

# 📂 Project Structure

```
projectforge/
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # API integrations and utilities
│   └── styles/           # Global styles and Tailwind configuration
│
├── public/               # Static assets
├── .env.local            # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

---

# 🛠️ Troubleshooting & FAQ

## 1. `node_modules` Missing / Project Won't Run

### Problem:
The project fails with errors like:

```
Module not found
```

### Solution:

Reinstall dependencies:

```bash
npm install
```

This will recreate the missing `node_modules` folder.

---

## 2. Next.js / React Version Issues

If you encounter dependency conflicts due to newer React or Next.js versions:

```bash
npm install --legacy-peer-deps
```

---

## 3. OpenRouter AI Integration Problems

If AI generation is not working:

### Check:

- Your `.env.local` file exists.
- Your API key is correctly added.
- The development server was restarted after changing environment variables.
- Your OpenRouter account has available usage/credits.

Restart the server:

```bash
npm run dev
```

---

## 4. Live Preview / Local Storage Problems

If your saved progress is not updating:

### Clear Local Storage:

1. Open Developer Tools:
   - Windows/Linux: `F12`
   - Mac: `Cmd + Option + I`

2. Open:

```
Application → Local Storage
```

3. Select:

```
http://localhost:3000
```

4. Clear stored data.

5. Refresh the page.

---

## 5. Tailwind CSS / Styling Problems

If the UI looks broken:

Delete the Next.js cache:

```bash
rm -rf .next
```

Restart:

```bash
npm run dev
```

---

# 📜 License

This project is licensed under the **MIT License**.
