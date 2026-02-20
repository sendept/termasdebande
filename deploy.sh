#!/bin/bash

# Deploy script for termasdebande.com
# Run this from inside the termasdebande folder: ./deploy.sh

set -e  # Stop on any error

REMOTE_USER="dh_termasdebande"
REMOTE_HOST="iad1-shared-e1-32.dreamhost.com"
REMOTE_PATH="~/termasdebande.com/"
PORT=22

echo "🔄 Pulling latest code from GitHub..."
git pull

echo "📦 Installing dependencies (in case anything changed)..."
npm install

echo "🔨 Building..."
npm run build

echo "🚀 Uploading to DreamHost..."
scp -P $PORT -r dist/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "✅ Done! Site is live at https://termasdebande.com"
