# Portfolio Website with Resume PDF Seeding

A modern, full-stack portfolio website that automatically syncs with your resume PDF. Write your resume once, and watch your portfolio update instantly.

## ✨ Features

- **PDF-Based Data Seeding**: Automatically extracts and populates portfolio data from your resume PDF
- **Live Resume Download**: Users can download the latest resume directly from your portfolio
- **Automatic Hot Reload**: No server restart needed when you update your resume PDF
- **Fallback System**: Gracefully handles missing PDFs with built-in default data
- **Real-time Synchronization**: Backend and frontend stay perfectly in sync
- **Responsive Design**: Beautiful UI with Framer Motion animations
- **Full-Stack Architecture**: Node.js/Express backend, React frontend with Vite

## 🏗️ Project Structure

```
.
├── client/                          # React frontend
│   ├── src/
│   │   ├── App.jsx                 # Main component
│   │   ├── main.jsx                # Entry point
│   │   ├── styles.css              # Global styles
│   │   ├── components/
│   │   │   ├── Reveal.jsx          # Scroll reveal animation
│   │   │   ├── SectionHeading.jsx  # Section headers
│   │   │   └── TechBackground.jsx  # Tech stack background
│   │   └── hooks/
│   │       └── useResume.js        # Custom hooks for resume download
│   ├── public/
│   │   └── resume/                 # Resume PDF location
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js/Express backend
│   ├── src/
│   │   ├── app.js                  # Express app setup
│   │   ├── index.js                # Server entry point
│   │   ├── config/
│   │   │   └── db.js               # MongoDB configuration
│   │   ├── data/
│   │   │   └── seedPortfolio.js    # Fallback data
│   │   ├── models/
│   │   │   └── Portfolio.js        # MongoDB schema
│   │   ├── services/
│   │   │   └── portfolioService.js # Business logic
│   │   └── utils/
│   │       └── pdfParser.js        # PDF extraction & parsing
│   ├── package.json
│   └── .env                        # Environment variables
│
├── public/
│   └── resume/                     # Place your resume.pdf here
│
└── package.json                    # Root package.json for workspace

```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shamsher2000/portfolio.git
   cd portfolio
   ```

2. **Setup environment variables**

   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Place your resume PDF**
   
   Add your resume as `public/resume/resume.pdf`. The system will automatically parse it on startup.

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This command runs both the backend (port 5000) and frontend (port 5173/5174) concurrently.

6. **Open in browser**
   ```
   http://localhost:5173/
   ```

## 📋 Resume Requirements

Your resume PDF should be formatted with clear sections:

- **Header**: Name and contact information at the top
- **TECHNICAL SKILLS**: A section listing your technical abilities
- **EXPERIENCE**: Work experience with the following pattern:
  ```
  Company Name
  Role Title
  Date Range
  • Achievement 1
  • Achievement 2
  ```
- **PROJECTS**: Project listings with descriptions
- **EDUCATION**: Educational background

### Supported Resume Format
- Text-based PDFs (not scanned images)
- Standard resume layout with clear section headers
- Bullet points for achievements

## 🔧 Available Commands

### Root Level
```bash
npm run dev        # Start both client and server in development mode
npm run client     # Start only the frontend
npm run server     # Start only the backend
npm run reseed     # Manually trigger PDF parsing and data update
```

### Client
```bash
cd client
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Server
```bash
cd server
npm run dev        # Start with nodemon watch mode
npm run start      # Start in production mode
```

## 📡 API Endpoints

### GET `/api/resume/info`
Get parsed resume information
```json
{
  "slug": "primary",
  "personal": { ... },
  "heroMetrics": [ ... ],
  "experience": [ ... ],
  "projects": [ ... ],
  "education": { ... }
}
```

### GET `/api/resume/download`
Download the resume PDF file
- Returns the PDF with proper headers
- File streaming for performance

### POST `/api/portfolio/reseed`
Manually trigger PDF parsing and data reload
```json
{
  "success": true,
  "message": "Portfolio reseeded from PDF"
}
```

## 🎨 Features in Detail

### PDF Parser
The PDF parser (`server/src/utils/pdfParser.js`) intelligently extracts:
- **Personal Information**: Name, email, phone, location, links
- **Hero Metrics**: Key achievements and impact numbers
- **Technical Skills**: Programming languages, frameworks, tools
- **Work Experience**: Companies, roles, periods, achievements
- **Projects**: Project names, descriptions, tech stacks
- **Education**: Institution, degree, CGPA, period

### Frontend Hooks
`client/src/hooks/useResume.js` provides:
- `useResumeDownload()`: Handle resume downloads with loading states
- `useResumeInfo()`: Fetch parsed resume information
- `usePortfolioReseed()`: Trigger manual reseed from PDF

### Components
- **Reveal**: Scroll-triggered animations for sections
- **SectionHeading**: Consistent section headers
- **TechBackground**: Animated technology background

## 🔄 How It Works

1. **Initialization**: On server startup, the system checks for `public/resume/resume.pdf`
2. **PDF Parsing**: If found, it extracts structured data using regex patterns
3. **Data Caching**: Parsed data is stored in MongoDB for fast access
4. **Hot Reload**: No server restart needed - just replace the PDF and trigger reseed
5. **Frontend Sync**: React components automatically fetch and display the latest data
6. **Download Integration**: Users can download the original PDF from the "Download Resume" button

## 📦 Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Styling (if configured)

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **MongoDB**: Database (optional, uses in-memory fallback)
- **pdf-parse**: PDF text extraction

### DevOps
- **Concurrently**: Run multiple processes
- **Nodemon**: Auto-reload on file changes

## 🚨 Fallback System

The system gracefully handles missing PDFs:
- If `public/resume/resume.pdf` is not found, default data is used
- This allows the app to run without a PDF
- Data can be manually updated in `server/src/data/seedPortfolio.js`

## 📝 Environment Variables

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/portfolio

# Server Configuration
PORT=5000
NODE_ENV=development

# PDF Configuration (optional)
RESUME_PDF_DIR=public/resume
PRIMARY_RESUME_NAME=resume.pdf
```

## ⚙️ Separate Frontend and Backend Deployment

This repository already contains fully separated `client/` and `server/` services.

### Backend
- Deploy the `server/` folder as its own repository to GitHub: `portfolio-backend`
- Include `server/package.json`, `server/src/`, `server/.env.example`, and any required resume files
- Set backend environment variables like `MONGO_URI` and `PORT`
- After deployment, use the backend URL in Netlify as `VITE_API_URL`

### Frontend (Netlify)
- Keep this repo as the frontend repo, or use the `client/` folder as your Netlify source
- Netlify should build with:
  - `cd client && npm install && npm run build`
  - Publish directory: `client/dist`
- In Netlify site settings, add:
  - `VITE_API_URL=https://your-backend-url.com`
- Do not add `PORT` to the Netlify frontend environment variables.
- The frontend will then call your backend directly for all `/api/*` requests.

## 🐛 Troubleshooting

**Issue**: "No PDF found" message on startup
- **Solution**: Place your resume at `public/resume/resume.pdf` and restart the server

**Issue**: Portrait data not updating after PDF change
- **Solution**: Send a POST request to `/api/portfolio/reseed` or use the reseed button if available

**Issue**: MongoDB connection errors
- **Solution**: Ensure MongoDB is running or update MONGO_URI to use MongoDB Atlas

**Issue**: PDF parsing returns incomplete data
- **Solution**: Ensure your resume is a text-based PDF (not scanned) and matches the expected format

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. Feel free to use it for your own portfolio.

## 👤 Author

**Shamsher Tiwari**
- Email: contact@shamsher.dev
- LinkedIn: [linkedin.com/in/shamsher-tiwari](https://www.linkedin.com/in/shamsher-tiwari-a2314620b/)
- GitHub: [@Shamsher2000](https://github.com/Shamsher2000)

## 🙏 Acknowledgments

- Built with modern JavaScript frameworks and best practices
- Inspired by the need to keep portfolio and resume in sync
- Community feedback and contributions

## 📞 Support

For issues, questions, or feature requests, please:
1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue on GitHub
3. Contact via email or LinkedIn

---

**Made with ❤️ by Shamsher Tiwari**
