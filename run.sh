#!/bin/bash
# Run script for Brute Force Lottery Simulator
# Opens the game in the default browser using Python's simple HTTP server

# Port configuration
PORT=8000

echo "Starting Brute Force Lottery Simulator..."
echo "Serving files on http://localhost:$PORT"
echo "Press Ctrl+C to stop."

# Launch a simple HTTP server and open browser automatically
if command -v python3 &> /dev/null
then
    # Python 3
    python3 -m http.server $PORT &
    SERVER_PID=$!
    # Open browser (Linux/Mac)
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:$PORT
    elif command -v open &> /dev/null; then
        open http://localhost:$PORT
    fi
    # Wait for server to stop
    wait $SERVER_PID
else
    echo "Python3 is required to run this script. Please install Python 3."
    exit 1
fi
