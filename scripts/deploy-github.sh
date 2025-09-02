#!/bin/bash

# Script to initialize git repository and prepare for GitHub upload
# Run this script from the project root directory

echo "Initializing git repository..."

# Initialize git repository
git init

# Add all files
git add .

# Make the first commit
git commit -m "Initial commit: DEX TradingView Clone with webhook features"

# Add the remote origin (you'll need to set this to your actual GitHub repo)
echo "Repository prepared for upload to GitHub"
echo "To push to your repository, run the following commands:"
echo "git remote add origin https://github.com/xnox-me/End-verBlac.git"
echo "git branch -M main"
echo "git push -u origin main"

echo "Setup complete!"