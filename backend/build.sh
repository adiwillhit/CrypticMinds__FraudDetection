#!/usr/bin/env bash
# Build script for Render deployment

echo "Starting build process..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create uploads directory if it doesn't exist
echo "Creating uploads directory..."
mkdir -p uploads

# Set permissions
echo "Setting permissions..."
chmod +x main.py

echo "Build completed successfully!"