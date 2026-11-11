#!/bin/bash

# Deploy script for termasdebande.com
# Run this from inside the termasdebande folder: ./deploy.sh

set -e  # Stop on any error

# Load nvm so npm is available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# "termasdebande" is a host alias defined in ~/.ssh/config
# (DreamHost user, server and SSH key), so no password is needed.
REMOTE="termasdebande"
REMOTE_PATH="~/termasdebande.com/"

echo "🔄 Pulling latest code from GitHub..."
git pull

echo "📦 Installing dependencies (in case anything changed)..."
npm install

echo "🔨 Building..."
npm run build

echo "🚀 Uploading to DreamHost..."
scp -r dist/* $REMOTE:$REMOTE_PATH

echo "✅ Done! Site is live at https://termasdebande.com"
