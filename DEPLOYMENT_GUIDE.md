# Complete Deployment Guide for Fraud Detection Backend

This guide provides step-by-step instructions for deploying your Flask-based fraud detection API to Render.

## Prerequisites

1. *GitHub Account*: Your code must be in a GitHub repository
2. *Render Account*: Sign up at [render.com](https://render.com)
3. *Python Knowledge*: Basic understanding of Python and Flask

## Step 1: Prepare Your Repository

### 1.1 Ensure All Files Are Committed

Make sure your backend code is properly committed to your GitHub repository:

bash
# Navigate to your project directory
cd /path/to/your/project

# Add all files
git add .

# Commit changes
git commit -m "Add Render deployment configuration"

# Push to GitHub
git push origin main


### 1.2 Verify Required Files

Ensure these files are in your backend/ directory:

- ✅ app.py - Main Flask application
- ✅ main.py - Entry point
- ✅ fraud_detection.py - Fraud detection logic
- ✅ requirements.txt - Python dependencies
- ✅ build.sh - Build script
- ✅ start.sh - Start script
- ✅ render.yaml - Render configuration
- ✅ Procfile - Alternative deployment config
- ✅ .gitignore - Git ignore rules

## Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

## Step 3: Deploy to Render

### Method 1: Using Web Interface (Recommended)

1. *Navigate to Dashboard*
   - Log in to your Render account
   - You'll see the dashboard

2. *Create New Web Service*
   - Click the "New" button
   - Select "Web Service"

3. *Connect Repository*
   - Click "Connect a repository"
   - Select your GitHub repository
   - Choose the repository containing your fraud detection code

4. *Configure Service Settings*

   *Basic Configuration:*
   - *Name*: fraud-detection-api (or your preferred name)
   - *Language*: Python
   - *Branch*: main (or your default branch)
   - *Root Directory*: backend (since your Flask app is in the backend folder)

   *Build & Deploy Settings:*
   - *Build Command*: chmod +x build.sh && ./build.sh
   - *Start Command*: chmod +x start.sh && ./start.sh

   *Environment Variables* (optional):
   
   FLASK_ENV=production
   FLASK_DEBUG=0
   MAX_CONTENT_MB=2048
   STATUS_CHECK_COOLDOWN=30
   

5. *Choose Plan*
   - Select "Free" plan for testing
   - Free plan includes:
     - 750 hours/month
     - 512 MB RAM
     - Shared CPU

6. *Deploy*
   - Click "Create Web Service"
   - Render will start building and deploying your application
   - This process typically takes 5-10 minutes

### Method 2: Using render.yaml (Blueprint)

If you have the render.yaml file in your repository:

1. Go to Render Dashboard
2. Click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the render.yaml configuration
5. Click "Apply" to deploy

### Method 3: Using Procfile

The Procfile provides an alternative deployment method:

1. Create a new Web Service
2. Connect your repository
3. Render will automatically detect the Procfile
4. Configure other settings as needed
5. Deploy

## Step 4: Monitor Deployment

### 4.1 Check Build Logs

During deployment, you can monitor the build process:

1. Click on your service in the Render dashboard
2. Go to the "Logs" tab
3. Watch for any build errors

### 4.2 Common Build Issues

*Issue*: Build fails with dependency errors
*Solution*: Ensure all dependencies are in requirements.txt

*Issue*: Port binding error
*Solution*: The app should use $PORT environment variable (already configured)

*Issue*: Permission denied on scripts
*Solution*: The build script includes chmod +x commands

### 4.3 Verify Deployment

Once deployment is complete:

1. *Check Health Endpoint*
   
   https://your-app-name.onrender.com/api/health
   

2. *Expected Response*:
   json
   {
     "status": "healthy",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "model_loaded": false
   }
   

## Step 5: Test Your API

### 5.1 Test Endpoints

Use tools like Postman, curl, or your frontend to test:

1. *Health Check*:
   bash
   curl https://your-app-name.onrender.com/api/health
   

2. *Model Status*:
   bash
   curl https://your-app-name.onrender.com/api/model-status
   

3. *Batch Analysis* (requires CSV file):
   bash
   curl -X POST \
     -F "file=@your-data.csv" \
     https://your-app-name.onrender.com/api/batch-analysis
   

### 5.2 Update Frontend Configuration

Update your frontend to use the new API URL:

javascript
// In your frontend configuration
const API_BASE_URL = 'https://your-app-name.onrender.com';


## Step 6: Environment Variables (Optional)

### 6.1 Add Environment Variables

In your Render dashboard:

1. Go to your service
2. Click "Environment"
3. Add these variables:


FLASK_ENV=production
FLASK_DEBUG=0
MAX_CONTENT_MB=2048
STATUS_CHECK_COOLDOWN=30


### 6.2 Redeploy After Changes

After adding environment variables:
1. Click "Manual Deploy"
2. Select "Deploy latest commit"

## Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Configure DNS records as instructed

## Troubleshooting

### Common Issues

1. *Application Crashes*
   - Check logs in Render dashboard
   - Verify all dependencies are installed
   - Check for missing environment variables

2. *Build Failures*
   - Review build logs
   - Ensure requirements.txt is complete
   - Check for syntax errors in Python files

3. *API Not Responding*
   - Verify the service is running
   - Check health endpoint
   - Review application logs

4. *Memory Issues*
   - Reduce MAX_CONTENT_MB for large file uploads
   - Consider upgrading to a paid plan for more resources

### Getting Help

1. *Render Documentation*: [docs.render.com](https://docs.render.com)
2. *Render Support*: Available in the dashboard
3. *Community*: Render Discord and forums

## Performance Optimization

### For Production Use

1. *Upgrade Plan*: Consider paid plans for better performance
2. *Caching*: Implement Redis for session storage
3. *CDN*: Use Cloudflare for static assets
4. *Database*: Add PostgreSQL for persistent storage

### Monitoring

1. *Logs*: Monitor application logs regularly
2. *Metrics*: Use Render's built-in metrics
3. *Alerts*: Set up alerts for downtime

## Security Considerations

1. *Environment Variables*: Store sensitive data in environment variables
2. *HTTPS*: Render provides SSL certificates automatically
3. *Rate Limiting*: Implement rate limiting for API endpoints
4. *Input Validation*: Validate all user inputs

## Cost Management

### Free Plan Limitations

- 750 hours/month (about 31 days)
- 512 MB RAM
- Shared CPU
- Sleep after 15 minutes of inactivity

### Paid Plans

- $7/month for always-on service
- More RAM and CPU
- Custom domains
- Team collaboration

## Next Steps

1. *Deploy Frontend*: Deploy your React frontend to Vercel or Netlify
2. *Database*: Add a database for persistent storage
3. *Monitoring*: Set up monitoring and alerting
4. *CI/CD*: Implement continuous deployment

## Support

For additional help:
- Check the backend/README.md file
- Review Render documentation
- Contact Render support through the dashboard

---

*Note*: This deployment guide assumes you're using the free tier of Render. For production applications, consider upgrading to a paid plan for better performance and reliability.