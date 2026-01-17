# Pro Level Rental Website - Deployment Guide

## Project Overview

Your Pro Level Rental website has been successfully set up with:
- ✅ React 18 + Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ Black, White, and Gold color scheme (matching your brand)
- ✅ Logo integrated from prolevelrental.com
- ✅ Fully responsive design
- ✅ Admin dashboard, client portal, and technician portal
- ✅ Equipment catalog with filtering
- ✅ Quote request system

## Running Locally

The development server is currently running at: **http://localhost:3000**

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Color Scheme Applied

All color transitions have been updated from rose/pink/orange to your brand colors:
- **Gold**: Primary accent color (`gold-400` through `gold-600`)
- **Black**: Text and backgrounds
- **White**: Text and highlights
- **Gradients**: Gold gradients for buttons and CTAs

## Deploying to Railway

### Option 1: Deploy via GitHub (Recommended)

1. **Initialize Git Repository**:
   ```bash
   cd "/Users/kevin/Dropbox (Personal)/Development/PLRweb"
   git init
   git add .
   git commit -m "Initial commit: Pro Level Rental website"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/prolevel-rental.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `prolevel-rental` repository
   - Railway will auto-detect it's a Vite project
   - Click "Deploy"

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize and Deploy**:
   ```bash
   cd "/Users/kevin/Dropbox (Personal)/Development/PLRweb"
   railway init
   railway up
   ```

### Railway Configuration

The project includes:
- `railway.json` - Railway deployment configuration
- `railway.sh` - Build script

Railway will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Serve the production build
- Provide you with a public URL

## Environment Variables

No environment variables are currently required. If you need to add API keys or backend URLs later, you can add them in:
- Railway Dashboard → Your Project → Variables
- Or create a `.env` file locally (not committed to git)

## Custom Domain

After deploying to Railway:
1. Go to your project settings
2. Click on "Settings" → "Domains"
3. Add your custom domain (e.g., `app.prolevelrental.com`)
4. Update your DNS settings as instructed

## Default Login Credentials

For testing the dashboards:
- **Admin**: admin@prolevelrental.com / admin123
- **Technician**: tech@prolevelrental.com / tech123
- **Client**: client@example.com / client123

**⚠️ Important**: Change these credentials or add a real authentication system before going live!

## Next Steps

1. **Test the local site** at http://localhost:3000
2. **Review all content** and update as needed
3. **Deploy to Railway** using one of the methods above
4. **Set up custom domain** (optional)
5. **Add real authentication** for production use
6. **Connect to a real database** if you want to persist data

## File Structure

```
PLRweb/
├── public/
│   └── logo.png           # Your logo from prolevelrental.com
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind & custom styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── railway.json           # Railway deployment config
└── README.md              # This file

## Support & Maintenance

- All source code is in the `src/App.jsx` file
- To update content: Edit the `initialCMSData` object at the top of `src/App.jsx`
- To change colors: Update the Tailwind classes or modify `tailwind.config.js`
- For help: Railway has excellent documentation at docs.railway.app

## Production Checklist

Before going live:
- [ ] Update all demo content with real information
- [ ] Replace placeholder equipment images
- [ ] Set up real authentication (consider Auth0, Clerk, or Firebase)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up error monitoring (Sentry)
- [ ] Test on mobile devices
- [ ] Set up a database for equipment/quotes (Supabase, Firebase, Railway PostgreSQL)
- [ ] Add contact form email integration (Resend, SendGrid, etc.)
- [ ] Configure proper SEO meta tags
- [ ] Add sitemap and robots.txt
- [ ] Set up SSL certificate (automatic on Railway)

---

**Website is ready for local testing and Railway deployment!** 🚀
