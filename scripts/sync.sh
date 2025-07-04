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

# Define child repos as NAME=URL pairs
CHILD_REPOS=(
  "bitcoin-matrix-vip=https://x-access-token:${GH_TOKEN}@github.com/Funnel-Platform/bitcoin-matrix-vip.git"
)

MASTER_REPO_PATH="$(pwd)"  # path to master repo files

for ENTRY in "${CHILD_REPOS[@]}"; do
  NAME="${ENTRY%%=*}"
  REPO_URL="${ENTRY#*=}"

  echo "🔁 Syncing to $NAME..."

  TARGET_DIR="/tmp/$NAME"
  rm -rf "$TARGET_DIR"
  git clone --depth=1 "$REPO_URL" "$TARGET_DIR" || true

  cd "$TARGET_DIR" || exit

  # Switch/create main branch as needed
  if [ ! -f .git/HEAD ] || [ -z "$(git rev-parse --branches)" ]; then
    git checkout --orphan main
  else
    git fetch origin
    git checkout main || git checkout -b main
  fi

  # Remove all files except .git
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

  # Copy master repo files into child repo directory
  cp -r "$MASTER_REPO_PATH"/* .
  cp -r "$MASTER_REPO_PATH"/.* . 2>/dev/null || true

  git config user.name "Sync Script"
  git config user.email "you@example.com"

  git add .

  if git diff --cached --quiet; then
    git commit --allow-empty -m "🔄 Initial sync (empty commit) - $(date +'%Y-%m-%d %H:%M:%S')"
  else
    git commit -m "🔄 Sync from master repo - $(date +'%Y-%m-%d %H:%M:%S')"
  fi

  git push --set-upstream origin main

  echo "✅ Synced $NAME successfully!"
done