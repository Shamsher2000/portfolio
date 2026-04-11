# Portfolio Website with PDF-Based Resume Seeding

A dynamic portfolio website that reads your resume PDF and automatically populates your portfolio. Update your resume once, and the website reflects your changes instantly without any code modifications.

## Key Features

- **📄 PDF-Powered** - Upload your resume PDF once
- **🔄 Auto-Sync** - Website automatically serves your latest resume data
- **⚡ Dynamic Content** - No hardcoding needed; changes reflect instantly
- **💾 Database-Backed** - Data persists in MongoDB
- **🛡️ Fallback Safe** - Website works even if PDF parsing fails
- **🔁 Hot-Reload** - Reseed without server restart
- **♻️ Reusable** - Same system works for unlimited resume updates

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### 2. Setup Your Resume

Place your resume PDF at:
```
resume/public/resume/resume.pdf
```

The system will automatically parse and structure it.

### 3. Start Development

```bash
# Terminal 1: Start server
cd server
npm run dev

# Terminal 2: Start client
cd client
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

Check server console for:
```
📄 Reading resume from PDF: .../public/resume/resume.pdf
✅ Successfully parsed resume PDF
```

## How It Works

### Data Flow

```
Resume PDF
    ↓
PDF Parser (pdfParser.js)
    ↓
Extracted Data
    ↓
Database Storage (MongoDB)
    ↓
API Endpoint (/api/profile)
    ↓
Frontend (React)
    ↓
Rendered Portfolio Website
```

### Architecture

```
resume/
├── public/resume/
│   └── resume.pdf ..................... Your resume
├── server/
│   └── src/
│       ├── utils/pdfParser.js ......... PDF extraction
│       ├── config/pdfConfig.js ........ Configuration
│       ├── services/portfolioService.js  Data loading
│       └── app.js ..................... API endpoints
└── client/
    └── src/
        ├── App.jsx .................... Main component
        └── components/ ................ UI components
```

## Updating Your Resume

### Option 1: Hot-Reload (Recommended)

Update `public/resume/resume.pdf`, then run:

```bash
npm run reseed
```

Website updates instantly without restarting.

### Option 2: Server Restart

Update `public/resume/resume.pdf`, restart server:

```bash
npm run dev
```

## Resume PDF Format

Create your resume with these section markers for best results:

```
=== PERSONAL INFORMATION ===
Name: Your Name
Title: Your Title
Email: email@example.com
Phone: +1-234-567-8901
Location: City, State

LinkedIn: https://linkedin.com/in/yourprofile
GitHub: https://github.com/yourprofile

=== TECHNICAL SKILLS ===
JavaScript, React, Node.js, MongoDB, ...

=== EXPERIENCE ===

Company: Company Name
Role: Job Title
Period: Month Year - Month Year
Location: City, State

Achievements:
- Achievement 1 description
- Achievement 2 description

Stack: Tech1, Tech2, Tech3

=== PROJECTS ===

Project: Project Name
Category: Category
Tagline: Short description

Description: Longer description

Outcomes:
- Outcome 1
- Outcome 2

Stack: Tech1, Tech2, Tech3

=== SKILL BUCKETS ===

Skill Bucket: Category Name
- Skill 1
- Skill 2

=== EDUCATION ===
Institution: University Name
Degree: Your Degree
Score: Your GPA
Period: Start - End Year
Location: City, State
```

See [PDF Seeding Guide](server/src/docs/PDF_SEEDING_GUIDE.md) for detailed specifications.

## API Endpoints

### Get Portfolio Data
```http
GET /api/profile
```

Returns the current portfolio (from PDF or database).

### Reseed from Updated PDF
```http
POST /api/admin/reseed
```

Reload data from resume PDF. Useful after updating.

## Environment Configuration

Create `.env` file in root:

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# PDF Settings (optional)
RESUME_PDF_DIR=./public/resume
PRIMARY_RESUME_NAME=resume.pdf
AUTO_RESEED=true
USE_FALLBACK_ON_ERROR=true

# Server
PORT=5000
```

## Deployment

### Build for Production

```bash
# Build client
cd client
npm run build

# Start server (uses built client)
cd ../server
npm install
npm start
```

### Environment for Production

Set environment variables on your hosting platform:
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (usually auto-set by hosting)
- `NODE_ENV=production`

## Troubleshooting

### PDF Not Found

Server logs:
```
📌 No PDF found at .../public/resume/resume.pdf
```

**Solution:** Ensure `resume.pdf` exists in `public/resume/` folder.

### PDF Parsing Failed

Server logs:
```
⚠️ Error parsing PDF: Cannot read text from PDF
```

**Causes:**
- PDF is scanned or image-based
- PDF is password-protected
- Unsupported PDF format

**Solutions:**
- Re-save PDF as text-based from Word/Google Docs
- Remove password protection
- Use a modern PDF converter

### Website Shows Default Data

**Causes:**
- PDF parsing failed (check console)
- Fallback data is being used

**Solution:**
- Check console logs for parsing errors
- Verify PDF is readable text (not scanned)
- Use provided PDF format

### Server Won't Start

**Check:**
1. Port 5000 is available: `lsof -i :5000` (macOS/Linux)
2. Node.js is installed: `node --version`
3. Dependencies installed: `npm install` in server folder
4. MongoDB connection (if using database)

## Development Tools

### Server Development
```bash
cd server
npm run dev    # Run with auto-reload
npm start      # Run production
npm run reseed # Reload from updated PDF
```

### Client Development
```bash
cd client
npm run dev    # Run with hot reload
npm run build  # Build for production
```

## File Structure Reference

```
resume/
├── .env                                ← Configuration
├── public/
│   └── resume/
│       └── resume.pdf                  ← Your resume PDF
├── server/
│   ├── src/
│   │   ├── utils/
│   │   │   └── pdfParser.js           ← PDF extraction logic
│   │   ├── config/
│   │   │   ├── db.js                  ← Database connection
│   │   │   └── pdfConfig.js           ← PDF configuration
│   │   ├── services/
│   │   │   └── portfolioService.js    ← Data business logic
│   │   ├── models/
│   │   │   └── Portfolio.js           ← MongoDB schema
│   │   ├── data/
│   │   │   └── seedPortfolio.js       ← Fallback data + PDF loader
│   │   ├── app.js                     ← Express app
│   │   └── index.js                   ← Server entry point
│   ├── scripts/
│   │   └── reseed-cli.js              ← CLI reseed tool
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx                    ← Main component
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   └── components/
│   │       ├── Reveal.jsx
│   │       ├── SectionHeading.jsx
│   │       └── TechBackground.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Technology Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- pdf-parse (PDF extraction)

**Frontend:**
- React
- Vite (build tool)
- Modern CSS

## Key Benefits

1. **Single Source of Truth**
   - One PDF for your entire career narrative
   - Website always stays in sync

2. **No Code Changes Needed**
   - Update resume, website updates automatically
   - Perfect for frequent updates

3. **Professional Persistence**
   - Data backed by MongoDB
   - Fallback ensures website always works

4. **Developer Friendly**
   - Clear architecture
   - Well-commented code
   - Easy to extend

5. **Reusable System**
   - Same setup works for any resume
   - Share with others as template

## Tips for Success

- Keep PDF formatting **simple** (no complex tables/images)
- Use **clear section headings**
- Ensure PDF is **text-based** (not scanned)
- Test after each resume update
- Backup your resume PDF
- Use `npm run reseed` for quick updates

## Next Steps

1. ✅ Place your resume PDF in `public/resume/resume.pdf`
2. ✅ Run `npm install` in both server and client
3. ✅ Run `npm run dev` in server and client folders
4. ✅ Visit `http://localhost:5173`
5. ✅ If needed, adjust your PDF format using the guide

## Support & Docs

- **PDF Format Guide**: See `server/src/docs/PDF_SEEDING_GUIDE.md`
- **API Documentation**: Available in server code comments
- **Configuration**: Check `.env` template and `pdfConfig.js`

---

Made with ❤️ for developers who want to stop updating hardcoded resume data.
