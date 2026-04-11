# Portfolio Backend Service

This directory contains the backend service for the portfolio application.
Use this service independently when hosting the frontend and backend separately.

## ✅ What is included

- `package.json` - backend dependencies and start scripts
- `src/` - Express app, database configuration, PDF parsing, and portfolio services
- `server/.env.example` - example environment variables

## 🚀 Recommended GitHub repo setup

Create a separate repository for the backend, for example:

- `https://github.com/Shamsher2000/portfolio-backend.git`

Then push the `server/` contents into that repository.

## 🧩 Backend deployment steps

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Shamsher2000/portfolio-backend.git
   cd portfolio-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   RESUME_PDF_DIR=./public/resume
   PRIMARY_RESUME_NAME=resume.pdf
   ```

4. Place your resume PDF in the expected folder:
   ```bash
   mkdir -p public/resume
   cp ../client/public/resume/resume.pdf public/resume/resume.pdf
   ```

5. Start the backend locally:
   ```bash
   npm run dev
   ```

6. Verify the backend is working:
   - `http://localhost:5000/api/profile`
   - `http://localhost:5000/api/resume/info`
   - `http://localhost:5000/api/resume/download`

## ☁️ Deploying the backend

Use any service that supports Node.js apps, such as:

- Railway
- Render
- Heroku
- Fly.io

### Example values

- Build command: `npm install`
- Start command: `npm run start`
- Root directory: `/`
- Environment variables:
  - `MONGO_URI`
  - `PORT` (optional, default is `5000`)

## 🔗 Connect the frontend

After deploying the backend, add the backend URL to your frontend host.
For Netlify, set the env var:

- `VITE_API_URL=https://your-backend-url.com`

Then redeploy the frontend.

## 📌 Notes

- The backend service is independent of Netlify.
- Netlify should only host the React frontend.
- All API requests from the frontend should use `VITE_API_URL`.
