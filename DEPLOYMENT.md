# Netlify Deployment Guide

This guide walks you through deploying your portfolio website to Netlify with backend API.

## 📋 Deployment Options

### Option 1: Frontend on Netlify + Backend on Railway/Render (Recommended)
Best for full-stack applications with separate backend and frontend.

### Option 2: Frontend on Netlify + Backend API Hosted Elsewhere
Deploy frontend to Netlify, keep backend on your current server or other platforms.

---

## 🚀 Option 1: Complete Deployment with Separate Backend

### Step 1: Prepare Your Project

1. **Ensure your project is clean**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Build the frontend locally to test**
   ```bash
   npm run build --workspace client
   ```

### Step 2: Deploy Frontend to Netlify

#### Via GitHub Integration (Recommended)

1. **Go to [Netlify](https://netlify.com)**
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your `portfolio` repository

2. **Configure Build Settings**
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/dist`
   - **Node version**: **20.19.0** (Required for Vite compatibility)

3. **Add Environment Variables**
   - In Netlify Dashboard → Site Settings → Build & deploy → Environment
   - Add: `REACT_APP_BACKEND_URL` = `https://your-backend-url.com`

4. **Deploy**
   - Click Deploy
   - Netlify will automatically build and deploy on every push

#### Via Netlify CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to your project
cd d:\codeit\webdeb\resume

# Deploy
netlify deploy --prod
```

### Step 3: Deploy Backend to Railway or Render

#### Option A: Railway (Easiest)

1. **Go to [Railway.app](https://railway.app)**
   - Sign up/Login
   - Create a new project
   - Click "Deploy from GitHub"
   - Select your portfolio repository

2. **Configure Variables**
   - Go to Variables tab
   - Add:
     ```
     MONGO_URI=your_mongodb_uri
     PORT=5000
     NODE_ENV=production
     ```

3. **Add Start Command**
   - In Deployment tab, set Start Command: `npm run start --workspace server`

4. **Deploy**
   - Railway auto-deploys on push
   - Note your domain (e.g., `https://portfolio-production.up.railway.app`)

#### Option B: Render

1. **Go to [Render.com](https://render.com)**
   - Sign up/Login
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub

2. **Configure**
   - **Name**: portfolio-api
   - **Root directory**: server
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment**: Node
   - **Plan**: Free tier available

3. **Add Environment Variables**
   - In Environment tab:
     ```
     MONGO_URI=your_mongodb_uri
     NODE_ENV=production
     ```

4. **Deploy**
   - Click Deploy Service
   - Note your URL (e.g., `https://portfolio-api.onrender.com`)

#### Option C: Heroku (No longer free, but available)

1. **Go to [Heroku.com](https://heroku.com)**
   - Create account
   - Create new app
   - Connect to GitHub repository

2. **Add Buildpacks**
   - Settings → Buildpacks
   - Add `heroku/nodejs`

3. **Configure Procfile**
   - Create `Procfile` in root:
     ```
     web: npm run start --workspace server
     ```

4. **Set Config Variables**
   - Settings → Config Vars
   - Add: MONGO_URI, NODE_ENV=production

### Step 4: Connect Frontend to Backend

1. **Update Frontend Environment**
   
   Create `client/.env.production`:
   ```env
   VITE_API_URL=https://portfolio-api.onrender.com
   VITE_BACKEND_URL=https://portfolio-api.onrender.com
   ```

2. **Update useResume.js Hook**
   
   Modify `client/src/hooks/useResume.js`:
   ```javascript
   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   
   export function useResumeDownload() {
     const downloadResume = async () => {
       try {
         const response = await fetch(`${API_BASE}/api/resume/download`);
         // ... rest of code
       } catch (error) {
         // ... error handling
       }
     };
     return { downloadResume };
   }
   ```

3. **Commit and Push**
   ```bash
   git add .
   git commit -m "Update backend API URL for production"
   git push origin main
   ```
   
   Netlify will auto-deploy with the new environment variables.

---

## 🔌 Step 5: Configure CORS

Update your Express backend for CORS:

```javascript
// server/src/app.js
import cors from 'cors';

app.use(cors({
  origin: [
    'https://your-netlify-domain.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Install cors if needed:
```bash
cd server
npm install cors
```

---

## 📝 Environment Variables Required

### Frontend (.env files in `client/`)
```env
VITE_API_URL=https://your-backend-url.com
VITE_BACKEND_URL=https://your-backend-url.com
```

**CRITICAL:** These environment variables MUST be set in Netlify dashboard, or your site will show "Unexpected token '<', "<!doctype "... is not valid JSON" errors. This happens because API calls return HTML error pages instead of JSON data.

### Backend (.env files in `server/`)
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

---

## ✅ Deployment Checklist

- [ ] Frontend builds locally: `npm run build --workspace client`
- [ ] Backend starts locally: `npm run start --workspace server`
- [ ] GitHub repository is up to date
- [ ] MongoDB connection string is ready
- [ ] Netlify account created
- [ ] Railway/Render account created
- [ ] Created `netlify.toml` in root directory
- [ ] Added environment variables to Netlify
- [ ] Added environment variables to backend platform
- [ ] Updated frontend API URLs
- [ ] CORS configured on backend
- [ ] Initial deployment successful
- [ ] Resume PDF placed at `public/resume/resume.pdf`

---

## 🔄 Deployment Workflow

After initial setup, your deployment workflow is simple:

1. **Make Changes Locally**
   ```bash
   # Make your changes
   npm run dev  # Test locally
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

3. **Auto-Deploy**
   - Netlify automatically builds and deploys frontend
   - Railway/Render automatically deploys backend
   - Your site is live in ~2-5 minutes

4. **Update Resume**
   ```bash
   # Replace public/resume/resume.pdf with your new resume
   # Push changes
   git add public/resume/resume.pdf
   git commit -m "Update resume"
   git push origin main
   # Both frontend and backend update automatically
   ```

---

## 🐛 Troubleshooting Deployment

### Build Failures

**"npm: not found"**
- Netlify/Railway needs Node.js
- Ensure `netlify.toml` specifies `NODE_VERSION = "18.17.1"`
- Check platform's Node version settings

**"Unexpected token '<', "<!doctype "... is not valid JSON"?**
- This error occurs when API calls return HTML instead of JSON
- **Cause:** Missing or incorrect `VITE_API_URL` / `VITE_BACKEND_URL` environment variables
- **Fix:** Set the environment variables in Netlify dashboard with your backend URL
- **Example:** `VITE_API_URL = https://portfolio-api.onrender.com`
- Redeploy after setting the variables

**"TypeError: manualChunks is not a function" or "Invalid output options"**
- The `manualChunks` configuration was using object syntax instead of function syntax
- The Vite config has been updated to use the correct function syntax
- Redeploy to apply the manualChunks fix

**"terser not found" or "esbuild not found"**
- Vite 8.x has different dependency requirements
- Downgraded to stable Vite 5.4.10 which includes all necessary dependencies
- Redeploy to apply the Vite version fix

**"Cannot find module 'express'"**
- Ensure dependencies are installed in server
- Check `server/package.json` has all required packages
- Run `npm install` in server directory locally first

### API Connection Issues

**"Failed to fetch from API"**
```javascript
// Debug: Check what URL is being used
console.log('API URL:', import.meta.env.VITE_API_URL);
```

**CORS Error: "Origin not allowed"**
- Update CORS configuration on backend with your Netlify domain
- Ensure `Access-Control-Allow-Origin` header includes Netlify URL

### Environment Variables Not Loading

- Netlify: Site Settings → Build & deploy → Environment
- Railway: Variables tab in dashboard
- Render: Environment tab
- **Redeploy** after adding variables

### Resume PDF Not Found

```bash
# Ensure public/resume/resume.pdf exists
ls -la public/resume/

# Add and commit
git add public/resume/resume.pdf
git commit -m "Add resume PDF"
git push origin main

# Trigger reseed endpoint after deployment
curl -X POST https://your-backend-url/api/portfolio/reseed
```

---

## 📊 Monitoring

### Netlify
- Dashboard → Analytics
- View build logs: Deploys → Deploy logs
- View runtime logs: Logs → Runtime logs

### Railway/Render
- View deployment status on dashboard
- Check logs for errors
- Monitor resource usage

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
   ```bash
   # Ensure .env is in .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use strong MongoDB passwords**
   - Random, 16+ character passwords
   - MongoDB Atlas: Set IP whitelist (allow Netlify IPs)

3. **Keep dependencies updated**
   ```bash
   npm update
   npm audit fix
   ```

4. **Monitor deployments**
   - Set up Netlify notifications
   - Monitor backend logs regularly

---

## 📞 Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Express CORS**: https://expressjs.com/en/resources/middleware/cors.html

---

## ✨ What's Next?

After deployment:

1. **Test Everything**
   - Visit your Netlify URL
   - Test resume download
   - Test API endpoints

2. **Custom Domain** (Optional)
   - Netlify: Site settings → Domain management
   - Point custom domain to Netlify DNS

3. **SSL/HTTPS**
   - Netlify automatically provides HTTPS
   - Enable auto-renewal for custom domains

4. **Performance Optimization**
   - Enable Netlify edge caching
   - Optimize images
   - Monitor Lighthouse scores

---

**Happy Deploying! 🚀**
