# PowerShell build script for Render deployment

Write-Host "Starting build process..." -ForegroundColor Green

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Create uploads directory if it doesn't exist
Write-Host "Creating uploads directory..." -ForegroundColor Yellow
if (!(Test-Path "uploads")) {
    New-Item -ItemType Directory -Path "uploads"
}

Write-Host "Build completed successfully!" -ForegroundColor Green