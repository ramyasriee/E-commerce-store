#!/bin/bash

echo "🚀 Pushing code to GitHub..."
echo ""
echo "Repository: https://github.com/your-username/ecom-project-.git"
echo ""

cd "/path/to/ecom"

# Remove old remote if exists
git remote remove origin 2>/dev/null

# Add your repository
git remote add origin https://github.com/your-username/ecom-project-.git

# Set branch to main
git branch -M main

# Push to GitHub
echo "Pushing code now..."
git push -u origin main

echo ""
echo "✅ Done! Check your GitHub repo at:"
echo "https://github.com/your-username/ecom-project-"
