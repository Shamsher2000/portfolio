# Resume Sync Implementation - Complete Guide

## Overview

Your portfolio website now has **complete resume synchronization** between backend and frontend. Your resume PDF is the single source of truth - update it once, and everything else follows automatically.

## What Changed

### New Features Added

1. **Backend Resume Download Endpoint** (`GET /api/resume/download`)
   - Serves the actual PDF file
   - Always returns the latest version
   - Proper file streaming and content-type headers

2. **Resume Metadata Endpoint** (`GET /api/resume/info`)
   - Returns file info: size, last modified, availability
   - Useful for checking if resume is available

3. **Frontend Download Hook** (`useResumeDownload`)
   - Handles file download with proper Blob API
   - Manages loading and error states
   - Cross-browser compatible

4. **PDF Parser Enhancement**
   - Optimized for your specific resume template
   - Better extraction of metrics, skills, and achievements
   - Improved fallback handling

5. **Bidirectional Sync**
   - Backend: Updates database from PDF
   - Frontend: Downloads latest PDF instantly
   - Both stay in sync automatically

## File Changes Summary

### Backend Files Modified

#### `server/src/app.js`
- Added `GET /api/resume/download` endpoint
- Added `GET /api/resume/info` endpoint
- Updated `POST /api/admin/reseed` endpoint

#### `server/src/utils/pdfParser.js`
- Completely rewritten for your resume template
- Better section extraction
- Improved data merging

#### `server/src/services/portfolioService.js`
- Enhanced initialization logic
- Better error handling

### Frontend Files Modified

#### `client/src/App.jsx`
- Import `useResumeDownload` hook
- Updated `TopBar` component to use download function
- Updated `MobileMenu` component to use download function
- Added download state management

#### `client/src/hooks/useResume.js` (NEW)
- `useResumeDownload()` - Download latest resume
- `useResumeInfo()` - Get resume metadata
- `usePortfolioReseed()` - Trigger server reseed

## How It Works Now

### When You Update Your Resume

```
1. Edit your resume.pdf file
   └─ Save to: public/resume/resume.pdf

2. Run npm run reseed (in server terminal)
   └─ Backend parses updated PDF
   └─ Data cache refreshed
   └─ Database updated

3. Keep browser open or refresh
   └─ Frontend displays new portfolio data
   └─ Download button serves new PDF
```

### When User Downloads Resume

```
1. User clicks "Download Resume" button
   └─ Triggers useResumeDownload() hook

2. Frontend makes GET /api/resume/download
   └─ Server streams PDF from disk

3. Browser receives blob
   └─ Automatically saves as Shamsher_Tiwari_resume.pdf

4. User gets latest version every time
```

## API Endpoints Reference

### GET /api/profile
Returns portfolio data parsed from PDF

### GET /api/resume/download
Downloads the actual PDF file
- Always returns latest version
- Filename: `Shamsher_Tiwari_resume.pdf`

### GET /api/resume/info
Returns metadata about resume file
```json
{
  "available": true,
  "filename": "Shamsher_Tiwari_resume.pdf",
  "size": 245000,
  "sizeKB": 239,
  "lastModified": "2024-01-15T...",
  "downloadUrl": "/api/resume/download"
}
```

### POST /api/admin/reseed
Reloads portfolio from updated PDF
- No server restart needed
- Synchronizes backend and frontend

## Frontend Implementation Details

### Download Hook Usage

```javascript
import { useResumeDownload } from './hooks/useResume.js';

function MyComponent() {
  const { downloadResume, isDownloading, downloadError } = useResumeDownload();

  return (
    <button 
      onClick={downloadResume}
      disabled={isDownloading}
    >
      {isDownloading ? 'Downloading...' : 'Download Resume'}
    </button>
  );
}
```

### What Happens on Download

1. User clicks button
2. `downloadResume()` called
3. Fetch to `/api/resume/download`
4. Response converted to Blob
5. Temporary URL created
6. Anchor element triggers download
7. Browser saves file
8. Temporary URL cleaned up

## Your Resume Template

Since you provided your specific resume format, the PDF parser is now optimized for this structure:

```
Your Name
+91 8765616755 | email@gmail.com | LinkedIn | GitHub

EXPERIENCE
Company (Job Title) Month Year-Present
• Achievement with impact metrics
• Achievement with technologies
...

PROJECTS
Project Name - Category
Description
React, NodeJS, ExpressJS, MongoDB, ...

TECHNICAL SKILLS
Programming Languages / Skills- ...
Libraries Framework- ...
...

EDUCATION
Institution Name
Degree – CGPA
Year – Year, Location
```

The parser automatically:
- Extracts name, email, phone, social links
- Parses work experience with dates and achievements
- Extracts project names, descriptions, and tech stacks
- Identifies skill categories
- Pulls education information
- Generates metrics from achievement text

## Configuration

### Environment Variables (.env)

```env
# PDF Location
RESUME_PDF_DIR=./public/resume
PRIMARY_RESUME_NAME=resume.pdf

# Behavior
AUTO_RESEED=true
USE_FALLBACK_ON_ERROR=true

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server
PORT=5000
NODE_ENV=development
```

### File Permissions

Ensure your resume has read permissions:

```bash
chmod 644 public/resume/resume.pdf
```

## Development Commands

### Server

```bash
cd server
npm run dev      # Development with auto-reload
npm start        # Production mode
npm run reseed   # Reload from updated PDF
```

### Client

```bash
cd client
npm run dev      # Development with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
```

## Testing the Sync

### Test Complete Workflow

1. **Start both servers:**
   ```bash
   # Terminal 1
   cd server && npm run dev
   
   # Terminal 2
   cd client && npm run dev
   ```

2. **Open browser:** `http://localhost:5173`

3. **Download resume:**
   - Click "Resume" button in header
   - Should download latest PDF

4. **Update resume:**
   - Edit `public/resume/resume.pdf`
   - Run `npm run reseed` in server terminal
   - Refresh browser (or just click resume again)

5. **Verify sync:**
   - Check portfolio data updated
   - Download should serve new PDF

### Test API Endpoints

```bash
# Get portfolio data
curl http://localhost:5000/api/profile | json_pp

# Get resume info
curl http://localhost:5000/api/resume/info | json_pp

# Download resume
curl http://localhost:5000/api/resume/download -o test.pdf

# Reseed from PDF
curl -X POST http://localhost:5000/api/admin/reseed
```

## Troubleshooting

### Download Button Shows "Downloading..." Forever

**Causes:**
- Server not running
- PDF file not found
- CORS issues
- Network error

**Solutions:**
```bash
# Check server is running
curl http://localhost:5000/api/health

# Verify resume file exists
ls -la public/resume/resume.pdf

# Check file permissions
chmod 644 public/resume/resume.pdf

# Check browser console for errors
# F12 → Console → Look for fetch errors
```

### Download Gives Wrong File

The server always sends the same filename. To change download name, edit `server/src/app.js`:

```javascript
res.download(resumePath, 'YOUR_NAME_resume.pdf', (err) => {
  // ...
});
```

### Data Not Updating After Reseed

1. Check server console for errors after `npm run reseed`
2. Verify PDF is valid and text-based (not scanned)
3. Refresh browser page `Ctrl+F5` (hard refresh)
4. Check that `/api/profile` returns new data:
   ```bash
   curl http://localhost:5000/api/profile | json_pp
   ```

### Portfolio Not Parsing Correctly

1. Check PDF format matches your template
2. Ensure PDF is text-based, not image-based
3. Run `npm run reseed` and check console output
4. Verify fallback data is shown (check browser)

**To use fallback manually:**
- Temporarily rename `public/resume/resume.pdf`
- Run `npm run reseed`
- Should show message about using fallback

## Production Deployment

### Build Steps

```bash
# Build client
cd client
npm run build

# Verify build
ls -la dist/

# (Server uses built client automatically)
```

### Environment Setup

On your hosting platform set:
```
MONGODB_URI=your_mongo_uri
PORT=5000 (or auto-detected)
NODE_ENV=production
```

### File Structure on Server

```
/var/www/app/
├── public/
│   └── resume/
│       └── resume.pdf
├── server/
│   ├── src/
│   ├── dist/
│   └── package.json
├── client/
│   └── dist/
└── .env
```

### Starting on Server

```bash
cd server
npm install --production
npm start
```

The server automatically serves the built client from `../client/dist`.

## Performance Considerations

- **Caching**: Portfolio data cached in memory, clears on reseed
- **Database**: Optional MongoDB, not required
- **Downloads**: Direct file streaming, no memory buffering
- **Resume Size**: Recommended < 500KB

## Security Notes

- **Download Endpoint**: Public, no authentication required
- **Reseed Endpoint**: Has no auth (add if needed for production)
- **File Access**: Only serves files from public/resume directory
- **CORS**: Enabled for development, configure for production

To add auth to reseed:

```javascript
app.post('/api/admin/reseed', authenticateUser, async (req, res) => {
  // Only authenticated users can reseed
});
```

## Next Steps

1. Verify both download and data sync work correctly
2. Test with your actual resume PDF
3. Update any custom branding in download filename
4. Deploy to production
5. Monitor resume changes and reseed as needed

## Quick Reference

| Task | Command |
|------|---------|
| Update resume | Edit `public/resume/resume.pdf` |
| Reload data | `npm run reseed` (in server) |
| Download works? | Click "Resume" button |
| Check data? | `curl http://localhost:5000/api/profile` |
| Dev server | `npm run dev` (in server) |
| Build client | `npm run build` (in client) |

---

**Everything is now synced!** Your portfolio and resume download are always in perfect harmony.
