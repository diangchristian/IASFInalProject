# IASF Login System (Hash Lab)

A simple full‑stack app where users can **sign up**, **log in**, and try a **hashing demo** after login. You don’t need to read code to run it—just follow the steps below.

## What this app does

1. **Create an account and log in**
2. **Open the Hash Demo page (protected)**
3. **Type text and see its SHA‑256 hash**
4. **Compare two inputs to see how small changes create very different hashes**
5. **Hashes are saved in the database**

## What you need before starting

- **Node.js 18+** (includes npm)
- **MongoDB** (local installation recommended for beginners)
- **Two terminals** (one for the backend, one for the frontend)

## One‑time setup (backend settings)

Create a file named: `server\.env.development.local`

Paste this and save:

```
NODE_ENV=development
PORT=3000
DB_URI=mongodb://127.0.0.1:27017/ias-local
JWT_SECRET=change-this-to-any-random-text
JWT_EXPIRES_IN=1d
```

**What these mean (plain English):**

- **PORT**: the backend runs on port 3000 (don’t change this)
- **DB_URI**: where your local MongoDB is running
- **JWT_SECRET**: a secret key used for login sessions
- **JWT_EXPIRES_IN**: how long a login stays valid

## Run the app (every time)

1. **Start MongoDB**
   - If you installed MongoDB as a Windows service, it usually runs automatically.
   - If not, start it manually:
     ```powershell
     Start-Service MongoDB
     ```

2. **Start the backend (server)**
   ```powershell
   cd server
   npm install
   npm run dev
   ```
   You should see:
   ```
   Server is running on port http://localhost:3000
   Connected to database in development mode
   ```

3. **Start the frontend (client)**
   ```powershell
   cd ..\client
   npm install
   npm run dev
   ```
   Open the link shown in the terminal (usually http://localhost:5173).

## How to use the app

1. Open the app in your browser
2. Click **Sign up** and create an account
3. Log in
4. Use the **Hash Demo** page to hash text and compare results

## Common problems (simple fixes)

- **“Cannot find module …”** → run `npm install` in that folder
- **Proxy errors / ECONNRESET** → backend isn’t running
- **Database errors** → MongoDB isn’t running or `DB_URI` is wrong
- **Atlas errors** → your IP isn’t allowed in Atlas Network Access
