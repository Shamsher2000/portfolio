# PDF-Based Portfolio Seeding Guide

This system automatically reads your resume PDF and dynamically populates your portfolio website. Update your resume once, and the website reflects your changes instantly—no code modifications needed.

## Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```
This installs `pdf-parse` which enables PDF parsing.

### 2. Prepare Your Resume PDF

Place your resume PDF at:
```
resume/public/resume/resume.pdf
```

The parser will automatically extract and structure your resume data.

### 3. Start the Server

```bash
npm run dev
```

On startup, you'll see:
```
📄 Reading resume from PDF: .../public/resume/resume.pdf
✅ Successfully parsed resume PDF
```

If PDF parsing fails, the server falls back to default data with a warning.

## PDF Format Specification

For optimal parsing, structure your resume PDF with these section markers. The parser uses headings and keywords to identify sections.

### Example Resume Structure

```
=== PERSONAL INFORMATION ===
Name: John Doe
Title: Senior Software Engineer
Email: john@example.com
Phone: +1-555-0123
Location: San Francisco, CA

Professional Summary
Experienced full-stack developer passionate about scalable systems.

LinkedIn: https://linkedin.com/in/johndoe
GitHub: https://github.com/johndoe

=== TECHNICAL SKILLS ===
JavaScript, React, Node.js, MongoDB, Docker, AWS, PostgreSQL

=== EXPERIENCE ===

Company: Acme Corp
Role: Senior Developer
Period: Jan 2022 - Present
Location: San Francisco, CA
Summary: Led backend services and mentored junior engineers.

Achievements:
- Designed microservices architecture supporting 1M+ requests/day
- Implemented CI/CD pipeline reducing deploy time by 60%
- Mentored 3 junior developers who were promoted within 2 years

Stack: Node.js, Express, MongoDB, Docker, AWS

---

Company: TechStart Inc
Role: Full Stack Developer
Period: Jun 2020 - Dec 2021
Location: Remote

Achievements:
- Built React dashboard with real-time updates using WebSocket
- Optimized database queries improving response time by 40%

Stack: React, Node.js, PostgreSQL, Socket.IO

=== PROJECTS ===

Project: E-Commerce Platform
Category: Full Stack Web Application
Tagline: Complete shopping solution with payments and admin features.

Description: A production-ready e-commerce platform with user authentication, product management, and order processing.

Outcomes:
- Implemented JWT authentication with role-based access
- Integrated Stripe for secure payments
- Built admin dashboard for inventory management

Stack: React, Node.js, Express, MongoDB, Stripe

---

Project: Real-Time Chat
Category: Web Application
Tagline: Live messaging with presence and notifications.

Description: Feature-rich chat application with WebSocket support.

Outcomes:
- Enabled real-time messaging using Socket.IO
- Implemented user presence tracking
- Added image sharing with cloud storage

Stack: React, Node.js, Socket.IO, Cloudinary

=== SKILL BUCKETS ===

Skill Bucket: Frontend
- React
- JavaScript (ES6+)
- HTML5 & CSS3
- Redux

Skill Bucket: Backend
- Node.js
- Express
- MongoDB
- PostgreSQL

Skill Bucket: DevOps
- Docker
- Kubernetes
- CI/CD
- AWS

=== RECRUITER CHECKLIST ===
- 5+ years experience building production systems
- Proven ability to lead and mentor engineering teams
- Deep expertise in JavaScript/Node.js ecosystem
- Experience with cloud platforms and containerization
- Strong communication and presentation skills

=== EDUCATION ===
Institution: State University
Degree: B.S. in Computer Science
Score: 3.8 GPA
Period: Aug 2016 - May 2020
Location: College Station, TX
```

## Section Markers (Optional Enhancements)

The parser looks for these patterns. You can use simpler formatting, but these are recognized:

| Section | Parser Looks For |
|---------|-----------------|
| Personal Info | Name, Email, Phone, Location, LinkedIn, GitHub |
| Skills | "Technical Skills", "Skills", "Technologies" |
| Experience | Company, Role, Period, Location, Achievements, Stack |
| Projects | Project, Category, Tagline, Description, Outcomes, Stack |
| Education | Institution, Degree, Score, Period, Location |

## Configuration

### Environment Variables

Configure via `.env` file in the root:

```env
# Directory where resume PDFs are stored (default: public/resume)
RESUME_PDF_DIR=./public/resume

# Primary resume filename (default: resume.pdf)
PRIMARY_RESUME_NAME=resume.pdf

# Auto-reseed on startup (default: true)
AUTO_RESEED=true

# Use fallback data if PDF parsing fails (default: true)
USE_FALLBACK_ON_ERROR=true
```

### Programmatic Configuration

Edit `server/src/config/pdfConfig.js`:

```javascript
export const pdfConfig = {
  resumeDir: process.env.RESUME_PDF_DIR || path.resolve(__dirname, '../../../public/resume'),
  primaryResume: process.env.PRIMARY_RESUME_NAME || 'resume.pdf',
  autoReseedOnStartup: process.env.AUTO_RESEED !== 'false',
  useFallbackOnError: process.env.USE_FALLBACK_ON_ERROR !== 'false',
};
```

## API Endpoints

### Get Profile Data
```http
GET /api/profile
```

Returns the current portfolio data (from PDF or database).

### Reseed from Updated PDF
```http
POST /api/admin/reseed
```

Reload portfolio data from the resume PDF without restarting the server. Useful after updating your resume.

Response:
```json
{
  "success": true,
  "message": "Portfolio reseeded successfully from PDF",
  "profile": { ... portfolio data ... }
}
```

## How It Works

### Data Flow

1. **Server Startup** → Calls `initializePortfolio()`
2. **PDF Detection** → Checks for `resume.pdf` in configured directory
3. **Parsing** → Uses regex patterns to extract structured data
4. **Database Sync** → Stores in MongoDB if available
5. **API Response** → Serves data via `/api/profile` endpoint
6. **Frontend** → React app fetches and renders dynamically

### Fallback Strategy

If PDF parsing fails at any point:
1. Server logs an error with details
2. Returns fallback hardcoded data
3. Website remains functional
4. Logs location of the resume file

### Caching

- Portfolio data is cached in memory after initial load
- Database is used as persistent storage (if MongoDB is connected)
- Use `POST /api/admin/reseed` to reload from updated PDF

## Updating Your Resume

### Without Restarting Server

1. Update `public/resume/resume.pdf`
2. Call `POST /api/admin/reseed` endpoint
3. New data is immediately available via `/api/profile`

### With Server Restart

1. Update `public/resume/resume.pdf`
2. Restart server (`npm run dev`)
3. Check console for parsing status

## Troubleshooting

### PDF Not Found
```
📌 No PDF found at .../public/resume/resume.pdf
💡 To enable PDF-based seeding, place your resume PDF in: ...
```
**Solution:** Ensure `resume.pdf` exists in the correct directory.

### PDF Parsing Failed
```
⚠️  Error parsing PDF: Cannot read text from PDF
```
**Causes:**
- PDF is corrupted or scanned (image-based)
- PDF is password-protected
- File permissions issue

**Solutions:**
- Re-save PDF as text-based (export from Word/Google Docs)
- Remove password protection
- Check file permissions
- Server will use fallback data

### Some Sections Missing
The parser looks for specific patterns. Ensure:
- Section headers are on separate lines
- Important data uses consistent formatting
- No special characters breaking patterns

Fallback data is used for incomplete sections.

## Creating a PDF resume Compatible Format

### From Microsoft Word
1. Create resume in Word
2. Keep formatting simple (no complex tables)
3. Use clear section headings
4. File → Export as PDF

### From Google Docs
1. Create resume in Google Docs
2. File → Download → PDF Document

### From LaTeX
Use `pdflatex` or `xelatex`:
```bash
pdflatex resume.tex
```

## Directory Structure

```
resume/
├── public/
│   └── resume/
│       └── resume.pdf          # ← Place your PDF here
├── server/
│   ├── src/
│   │   ├── utils/
│   │   │   └── pdfParser.js    # PDF parsing logic
│   │   ├── config/
│   │   │   └── pdfConfig.js    # Configuration
│   │   ├── services/
│   │   │   └── portfolioService.js  # Service with PDF loading
│   │   ├── data/
│   │   │   └── seedPortfolio.js # Fallback data
│   │   ├── app.js
│   │   └── index.js
│   └── package.json
└── client/
    └── ...
```

## Benefits

✅ **Single Source of Truth** - Update PDF once, website reflects changes
✅ **No Code Changes** - Modify resume without touching code
✅ **Automatic Extraction** - Parser identifies sections intelligently
✅ **Fallback Safety** - Website works even if PDF parsing fails
✅ **Dynamic Content** - Frontend always serves latest data
✅ **Reusable** - Same system works for all resume updates
✅ **Database Sync** - Data persisted in MongoDB when available

## Tips for Best Results

1. **Keep PDF Simple** - Avoid complex formatting, images, and tables
2. **Use Clear Headings** - Section headers help the parser
3. **Consistent Structure** - Similar formatting for related items
4. **File Format** - Ensure PDF is text-based, not scanned
5. **Test After Updates** - Check website after updating resume
6. **Backup Data** - Fallback data is always available
7. **Use Reseed Endpoint** - No restart needed for quick updates

## Development

### Run Server
```bash
cd server
npm install
npm run dev
```

### Run Client
```bash
cd client
npm install
npm run dev
```

### Build for Production
```bash
cd client
npm run build
cd ../server
npm install  # Reinstall with production deps
npm start
```

## Support

If PDF parsing doesn't work as expected:

1. Check console logs for specific error messages
2. Verify PDF is text-based (not scanned)
3. Ensure section patterns match the specification
4. Check file permissions
5. Review regex patterns in `pdfParser.js`
6. Use fallback data as reference for expected structure
