#!/bin/bash

echo "Removing node_modules directories..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

echo "Clearing yarn cache..."
yarn cache clean

echo "Operation completed!"

# Run chmod +x cleanup.sh to make this script executable.
