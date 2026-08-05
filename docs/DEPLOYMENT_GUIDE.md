# Production Deployment Guide

This guide provides instructions for deploying the **Complaint Management System** to production using **MongoDB Atlas** (Database), **Render** (Backend API), and **Vercel** (Frontend SPA).

---

## 🗄️ Step 1: MongoDB Atlas Cloud Database Setup

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Shared Free Tier).
3. Navigate to **Database Access** → Add a Database User (e.g. `campus_user` / `secure_password`).
4. Navigate to **Network Access** → Add IP Address `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** → Choose **Drivers (Node.js)** → Copy your connection string:
   ```
   mongodb+srv://campus_user:<password>@cluster0.mongodb.net/complaint_system?retryWrites=true&w=majority
   ```

---

## ⚙️ Step 2: Deploy Backend to Render

1. Push your project code to a public/private GitHub repository.
2. Sign in to [Render](https://render.com/).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository and set Root Directory to `backend`.
5. Configure Build & Start Commands:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables in Render Console:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: *Your MongoDB Atlas Connection String*
   - `JWT_SECRET`: *Your random 32-character secret key*
   - `CLIENT_URL`: *Your Vercel Frontend URL (e.g. `https://complaint-portal.vercel.app`)*
7. Click **Deploy Web Service**. Render will issue your API production URL:
   `https://complaint-backend.onrender.com`

---

## 🌐 Step 3: Deploy Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New Project** → Import your GitHub repository.
3. Set Framework Preset to **Vite**.
4. Set Root Directory to `client`.
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://complaint-backend.onrender.com/api`
6. Click **Deploy**.
7. Once deployment finishes, Vercel will grant your live domain URL.

---

## 🔄 Step 4: Verification & Cors Whitelisting

1. Open your Vercel URL in a browser.
2. Register a new student account or log in with administrator credentials.
3. Submit a test complaint with an image attachment to verify end-to-end cloud integration!
