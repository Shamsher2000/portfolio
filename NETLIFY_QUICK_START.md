# Quick Netlify Deployment Setup

Follow these steps to deploy your portfolio to Netlify in 10 minutes.

## 🎯 Quick Setup (10 Minutes)

### 1. Connect to Netlify (2 min)
```bash
# Push your latest code to GitHub
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

Go to [Netlify.com](https://netlify.com):
- Click "New site from Git"
- Select GitHub
- Choose your `portfolio` repository
- Netlify auto-detects configuration from `netlify.toml` ✅

### 2. Configure Build Settings (2 min)

In Netlify dashboard:

**Site Settings → Build & deploy → Build settings**
- Build command: `npm run build --workspace client`
- Publish directory: `client/dist`
- Node.js version: 18.17.1

Click "Save"

### 3. Add Environment Variables (3 min)

**Site Settings → Build & deploy → Environment**

Add these variables:
```
REACT_APP_BACKEND_URL = https://your-backend-url.com
```

(Leave other variables empty for now, we'll update after backend deployment)

### 4. Deploy Backend (3 min)

Choose one platform:

#### Railway (Easiest)
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select `portfolio`
4. Add Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

Backend URL: `https://portfolio-[random].up.railway.app`

#### OR Render (Also Easy)
1. Go to [render.com](https://render.com)
2. "New Web Service" → Connect GitHub
3. Root directory: `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add Environment Variables

Backend URL will be: `https://portfolio-api.onrender.com`

---

## ⚙️ Configuration Files Included

These files are already in your project:

### `netlify.toml`
Main Netlify configuration:
- Specifies build command
- Configures publish directory
- Sets up SPA routing
- Handles caching

### `DEPLOYMENT.md`
Detailed deployment guide with:
- Step-by-step instructions
- Multiple deployment options
- Environment setup
- Troubleshooting guide
- Security best practices

### `.env.example` files
Template files showing required variables:
- `server/.env.example` - Backend variables
- `client/.env.example` - Frontend variables

---

## 🚀 After Initial Deployment

### Update Netlify with Backend URL

1. Copy your Railway/Render backend URL
2. Netlify dashboard → Environment variables
3. Update `REACT_APP_BACKEND_URL` with your backend URL
4. **Trigger rebuild**: Netlify will auto-rebuild

### Test Your Deployment

1. Visit your Netlify URL (e.g., `https://portfolio-abc123.netlify.app`)
2. Check browser console for any errors (F12)
3. Try the resume download button
4. Test API endpoints

### Common Issues & Fixes

**"Cannot GET /"**
- This happens with SPA routing
- Already fixed with `netlify.toml` configuration ✅

**API calls failing**
- Check backend URL in environment variables
- Ensure CORS is configured on backend
- Check Network tab in DevTools

**Resume not downloading**
- Ensure resume PDF is at `public/resume/resume.pdf`
- Push the file to GitHub
- Trigger redeploy on Netlify

---

## 📦 What Gets Deployed

**To Netlify (Frontend):**
- React app from `client/src`
- Built assets in `client/dist`
- Public files from `public/`
- Your `resume.pdf`

**To Railway/Render (Backend):**
- Node.js/Express server
- Database connection
- API endpoints
- Resume parsing logic

---

## 🔄 Deployment Workflow (After Setup)

Every time you push to GitHub:

```bash
# 1. Make changes locally
# 2. Commit and push
git add .
git commit -m "Your feature"
git push origin main

# 3. Netlify automatically:
#    - Pulls latest code
#    - Runs: npm run build --workspace client
#    - Deploys to: client/dist
#    - Live in ~1-2 minutes

# 4. Railway/Render automatically:
#    - Pulls latest code
#    - Installs dependencies
#    - Restarts server
#    - Live in ~2-3 minutes
```

---

## 📋 Pre-Deployment Checklist

- [ ] Latest code pushed to GitHub
- [ ] `netlify.toml` in root directory
- [ ] Build works locally: `npm run build --workspace client`
- [ ] Server works locally: `npm run start --workspace server`
- [ ] `.env` files NOT committed
- [ ] `.env.example` files present and updated
- [ ] MongoDB connection string ready
- [ ] Netlify account created
- [ ] Railway/Render account created
- [ ] GitHub repository connected to Netlify

---

## 🎯 Next Steps

1. **For detailed instructions**: See `DEPLOYMENT.md`
2. **For local testing**: Run `npm run dev`
3. **For production**: Follow steps above

---

## 💬 Quick Reference

| What | Where | How Long |
|------|-------|----------|
| Connect Netlify | GitHub integration | 2 min |
| Configure build | Netlify dashboard | 2 min |
| Add env vars | Netlify → Environment | 3 min |
| Deploy backend | Railway/Render | 3 min |
| Total | | ~10 min |

---

## 🔗 Resources

- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Full Guide**: See `DEPLOYMENT.md`

---

**Need help? Check `DEPLOYMENT.md` for detailed troubleshooting! 🚀**
