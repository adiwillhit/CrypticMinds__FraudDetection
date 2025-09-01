#!/usr/bin/env bash
# Start script for Render deployment

echo "Starting Fraud Detection API Server..."

# Set environment variables for production
export FLASK_ENV=production
export FLASK_DEBUG=0

# Start the Flask application with Gunicorn for production
gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 main:app