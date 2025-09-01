# Fraud Detection API Backend

A Flask-based API for credit card fraud detection using machine learning models.

## Features

- Batch analysis of CSV files
- Real-time transaction analysis
- Real-time transaction simulation
- Model training and evaluation
- Export functionality for flagged transactions

## API Endpoints

### Health Check
- GET /api/health - Check API health status

### Model Status
- GET /api/model-status - Get current model status

### Batch Analysis
- POST /api/batch-analysis - Upload CSV file for fraud detection analysis
  - Form data: file (CSV file)
  - Optional: sample_size (integer)

### Real-time Analysis
- POST /api/real-time-analysis - Analyze single transaction
  - JSON body: transaction data

### Simulation
- POST /api/simulation/start - Start real-time transaction simulation
- POST /api/simulation/stop - Stop simulation
- GET /api/simulation/status - Get simulation status
- POST /api/simulation/analyze - Analyze simulated transactions

### Export
- POST /api/export-fraudulent-transactions - Export flagged transactions to CSV

## Deployment on Render

### Prerequisites
- GitHub repository with your code
- Render account

### Deployment Steps

1. *Push your code to GitHub*
   bash
   git add .
   git commit -m "Add Render deployment files"
   git push origin main
   

2. *Create Render Account*
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

3. *Deploy on Render*
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - *Name*: fraud-detection-api
     - *Language*: Python
     - *Branch*: main
     - *Build Command*: chmod +x build.sh && ./build.sh
     - *Start Command*: chmod +x start.sh && ./start.sh

4. *Environment Variables* (optional)
   - FLASK_ENV: production
   - FLASK_DEBUG: 0
   - MAX_CONTENT_MB: 2048
   - STATUS_CHECK_COOLDOWN: 30

5. *Deploy*
   - Click "Create Web Service"
   - Wait for deployment to complete

### Alternative Deployment Methods

#### Using render.yaml
If you have the render.yaml file in your repository:
1. Go to Render Dashboard
2. Click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the render.yaml configuration

#### Using Procfile
The Procfile provides an alternative deployment method that Render will automatically detect.

## Local Development

### Setup
bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py


### Environment Variables
Create a .env file:

FLASK_ENV=development
FLASK_DEBUG=1
MAX_CONTENT_MB=2048
STATUS_CHECK_COOLDOWN=30


## File Structure


backend/
├── app.py                 # Main Flask application
├── main.py               # Entry point
├── fraud_detection.py    # Fraud detection logic
├── requirements.txt      # Python dependencies
├── build.sh             # Build script for Render
├── start.sh             # Start script for Render
├── render.yaml          # Render configuration
├── Procfile             # Alternative deployment config
├── .gitignore           # Git ignore rules
└── README.md            # This file


## Troubleshooting

### Common Issues

1. *Build fails*: Check that all dependencies are in requirements.txt
2. *Port binding error*: Ensure the app uses $PORT environment variable
3. *Memory issues*: Reduce MAX_CONTENT_MB for large file uploads
4. *Timeout errors*: Increase timeout in Gunicorn configuration

### Logs
- Check Render logs in the dashboard
- Application logs are written to fraud_detection.log

## Support

For issues with the API, check the logs and ensure all dependencies are properly installed.