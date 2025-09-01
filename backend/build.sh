#!/usr/bin/env bash
# Build script for Render deployment

echo "Starting build process..."

# Upgrade pip to latest version
echo "Upgrading pip..."
pip install --upgrade pip setuptools wheel

# Install Python dependencies with retry logic
echo "Installing Python dependencies..."
for i in {1..3}; do
    echo "Attempt $i of 3..."
    if pip install -r requirements.txt; then
        echo "Dependencies installed successfully!"
        break
    else
        echo "Attempt $i failed, retrying..."
        if [ $i -eq 3 ]; then
            echo "All attempts failed. Trying minimal requirements..."
            pip install -r requirements-minimal.txt
        fi
    fi
done

# Verify gunicorn installation
echo "Verifying gunicorn installation..."
if python -c "import gunicorn; print('Gunicorn version:', gunicorn._version_)"; then
    echo "Gunicorn verified successfully!"
else
    echo "Gunicorn not found, installing separately..."
    pip install gunicorn
fi

# Create uploads directory if it doesn't exist
echo "Creating uploads directory..."
mkdir -p uploads

# Set permissions
echo "Setting permissions..."
chmod +x main.py

echo "Build completed successfully!"