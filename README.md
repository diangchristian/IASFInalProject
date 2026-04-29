# IASF Login System (Hash Lab)

A simple full‑stack app where users can **sign up**, **log in**, and try a **hashing demo** after login.

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js (Express) + MongoDB
- **Auth:** JWT
- **Deploy target:** **Vercel** (presentation/demo ready)

---

## Slide‑ready overview (talk track)

### Problem
- Demonstrate a secure login flow and show why hashing is useful.

### Solution
- Users create accounts and log in.
- A **protected Hash Demo** page lets users:
  - Hash text with **SHA‑256**
  - Compare two inputs to see the avalanche effect
  - Save hash attempts to the database

### Key features
- Signup + login (JWT sessions)
- Protected routes/pages
- SHA‑256 hashing demo
- Hash history persisted in MongoDB

### Tech stack
- **Client:** React, TypeScript, Vite, Tailwind CSS
- **Server:** Node.js, Express
- **DB:** MongoDB (Atlas recommended for deployment)

---

## Vercel deployment (recommended)

### 1) Prerequisites
- A MongoDB database reachable from the internet (e.g., **MongoDB Atlas**)
- A GitHub repo connected to Vercel

### 2) Deploy
1. Go to **Vercel → New Project**
2. Import this repository: `diangchristian/IASFInalProject`
3. When prompted, set the environment variables (below)
4. Click **Deploy**

> If your project is set up as a monorepo (client + server), configure Vercel to run the correct build/output for the frontend, and ensure the backend is deployed as Serverless Functions (or exposed via an API route). If you already have it working locally, mirror those URLs with Vercel environment variables.

### 3) Environment variables (Vercel)
Set these in **Vercel → Project → Settings → Environment Variables**:

- `NODE_ENV=production`
- `DB_URI=<your MongoDB connection string>`
- `JWT_SECRET=<a long random secret>`
- `JWT_EXPIRES_IN=1d`

If your backend expects a port locally, **do not set** `PORT` on Vercel unless your code explicitly needs it. Vercel provides the runtime port.

### 4) Post‑deploy checklist
- Confirm the app loads from the Vercel URL
- Test **Sign up** and **Log in**
- Verify the **Hash Demo** page is protected (requires auth)
- Confirm hashes are being saved (MongoDB)

---

## Run locally (development)

### What you need
- **Node.js 18+** (includes npm)
- **MongoDB** (local installation recommended for beginners)
- **Two terminals** (one for backend, one for frontend)

### One‑time setup (backend settings)
Create a file named: `server\.env.development.local`

Paste this and save:

```env
NODE_ENV=development
PORT=3000
DB_URI=mongodb://127.0.0.1:27017/ias-local
JWT_SECRET=change-this-to-any-random-text
JWT_EXPIRES_IN=1d
```

**What these mean:**
- **PORT**: backend port for local development
- **DB_URI**: where your MongoDB instance runs
- **JWT_SECRET**: secret key used for login sessions
- **JWT_EXPIRES_IN**: how long a login stays valid

### Run the app
1. **Start MongoDB**
   - If installed as a Windows service, it may already be running.
   - Otherwise (Windows):
     ```powershell
     Start-Service MongoDB
     ```

2. **Start the backend (server)**
   ```powershell
   cd server
   npm install
   npm run dev
   ```

3. **Start the frontend (client)**
   ```powershell
   cd ..\client
   npm install
   npm run dev
   ```

Open the link shown in the terminal (usually http://localhost:5173).

---

## Demo steps (for presentations)
1. Open the deployed app (Vercel URL)
2. Create a new account (Sign up)
3. Log in
4. Navigate to **Hash Demo**
5. Hash a word (e.g., `hello`) and then a near‑match (e.g., `hello!`)
6. Highlight the drastic hash change (avalanche effect)
7. Mention that hashes are stored in MongoDB for history/auditing

---

## Common problems (simple fixes)
- **“Cannot find module …”** → run `npm install` in that folder
- **Proxy errors / ECONNRESET** → backend isn’t running (local)
- **Database errors** → MongoDB isn’t running or `DB_URI` is wrong
- **Atlas errors** → your IP isn’t allowed in Atlas Network Access
