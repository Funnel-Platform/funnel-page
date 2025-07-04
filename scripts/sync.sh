#!/bin/bash
set -e

# Load .env file if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -z "$GH_TOKEN" ]; then
  echo "ERROR: GH_TOKEN is not set. Please add it to .env or export it in your shell."
  exit 1
fi

# Optional filter for a single child repo
# Usage: `npm run sync -- CHILD_REPO_NAME`
FILTER_REPO_NAME="${1#--}"  # Remove leading double dash if present

# Define child repos as NAME=URL pairs
CHILD_REPOS=(
  "bitcoin-matrix-vip=https://x-access-token:${GH_TOKEN}@github.com/Funnel-Platform/bitcoin-matrix-vip.git"
  "bitcoinprism-tech=https://x-access-token:${GH_TOKEN}@github.com/Funnel-Platform/bitcoinprism-tech.git"
)

MASTER_REPO_PATH="$(pwd)"  # path to master repo files

for ENTRY in "${CHILD_REPOS[@]}"; do
  NAME="${ENTRY%%=*}"
  CHILD_REPO_URL="${ENTRY#*=}"

  # Skip if filter is set and this repo doesn't match
  if [[ -n "$FILTER_REPO_NAME" && "$NAME" != "$FILTER_REPO_NAME" ]]; then
    continue
  fi

  echo "🔁 Syncing to $NAME..."

  CHILD_TEMP_DIR="./tmp/$NAME"
  rm -rf "$CHILD_TEMP_DIR"
  mkdir -p "$CHILD_TEMP_DIR"

  git clone --depth=1 "$CHILD_REPO_URL" "$CHILD_TEMP_DIR" || { echo "Clone failed"; exit 1; }
  cd "$CHILD_TEMP_DIR"

  echo "Current dir: $(pwd)"
  echo "Contents:"
  ls -la

  git remote set-url origin "$CHILD_REPO_URL"
  git remote set-url --push origin "$CHILD_REPO_URL"

  git fetch origin main

  # Remove all files except .git
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

  # Copy master repo files into child repo directory
  rsync -av --delete \
    --exclude 'tmp' \
    --exclude 'node_modules' \
    --exclude '.nuxt' \
    --exclude '.output' \
    --exclude '.git' \
    --exclude '.github' \
    "$MASTER_REPO_PATH"/ ./

  git config user.name "Sync Script"
  git config user.email "you@example.com"

  git config http.postBuffer 524288000
  git add .

  if git diff --cached --quiet; then
    git commit --allow-empty -m "🔄 Initial sync (empty commit) - $(date +'%Y-%m-%d %H:%M:%S')"
  else
    git commit -m "🔄 Sync from master repo - $(date +'%Y-%m-%d %H:%M:%S')"
  fi

  git push --force-with-lease origin main

  echo "✅ Synced $NAME successfully!"

  cd "../../" # Go back to the master repo directory
  rm -rf "./tmp" # Clean up temporary directory
  echo "Cleaned up temporary directory for $NAME."
done

echo "✅ Completed syncing!"