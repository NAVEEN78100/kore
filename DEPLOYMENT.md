# Vercel Deployment Guide

This guide will help you deploy your KORE Food Ordering System to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas**: Set up your cloud database
4. **Environment Variables**: Prepare your production environment variables

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Environment Variables
Create these environment variables in your Vercel dashboard:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1d

# SMTP Configuration (Optional - for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=KORE Food Ordering System <your-email@gmail.com>

# Environment
NODE_ENV=production
```

## Step 2: Deploy to Vercel

### 2.1 Connect Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your project

### 2.2 Configure Build Settings
- **Framework Preset**: Other
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Environment Variables
Add all the environment variables listed above in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with its production value

## Step 3: Seed Your Database

After deployment, you'll need to seed your database with menu items:

### 3.1 Local Seeding (Recommended)
Run the seed script locally to populate your MongoDB Atlas database:

```bash
cd backend
npm run seed
```

### 3.2 Alternative: Vercel Function
You can also create a one-time seed function in Vercel.

## Step 4: Update Frontend Configuration

Update your frontend API base URL to point to your Vercel deployment:

```typescript
// In your frontend src/services/api.ts
const API_BASE_URL = 'https://your-app-name.vercel.app';
```

## Step 5: Test Your Deployment

### 5.1 Health Check
Visit: `https://your-app-name.vercel.app/health`

### 5.2 API Endpoints
- **Menu**: `https://your-app-name.vercel.app/api/menu`
- **Auth**: `https://your-app-name.vercel.app/api/auth`
- **Orders**: `https://your-app-name.vercel.app/api/orders`

## Step 6: Frontend Deployment

### 6.1 Deploy Frontend to Vercel
1. Create a new Vercel project for your frontend
2. Set the root directory to `frontend`
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 6.2 Environment Variables for Frontend
Add these environment variables to your frontend Vercel project:

```env
VITE_API_URL=https://your-backend-app.vercel.app
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation succeeds locally

2. **Database Connection Issues**
   - Verify MongoDB Atlas IP whitelist includes Vercel IPs
   - Check environment variables are correctly set

3. **CORS Issues**
   - Update CORS configuration in `backend/src/index.ts`
   - Add your frontend domain to allowed origins

4. **Function Timeout**
   - Vercel has a 10-second timeout for hobby plans
   - Consider upgrading to Pro for longer timeouts

### Useful Commands

```bash
# Test build locally
cd backend
npm run build

# Test production build
npm start

# Check environment variables
vercel env ls
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database seeded with menu items
- [ ] CORS configured for production domains
- [ ] Frontend API URL updated
- [ ] Health check endpoint working
- [ ] All API endpoints tested
- [ ] SSL certificate active (automatic with Vercel)

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB Atlas connection

Your KORE Food Ordering System should now be live on Vercel! 🚀
