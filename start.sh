#!/bin/bash

echo "=========================================="
echo "    Starting QueueLess Application...     "
echo "=========================================="

# 1. Setup Server
echo -e "\n[1/3] Setting up Backend Server..."
cd server
if [ ! -d "node_modules" ]; then
  echo "Installing server dependencies..."
  npm install
fi

# Optional: Run seed script to ensure admin user and sample data exist
echo "Seeding database with sample data..."
npm run seed > /dev/null 2>&1

# Start server in background
echo "Starting server on port 5001..."
npm run dev &
SERVER_PID=$!

# 2. Setup Client
echo -e "\n[2/3] Setting up Frontend Client..."
cd ../client
if [ ! -d "node_modules" ]; then
  echo "Installing client dependencies..."
  npm install
fi

# Start client in background
echo "Starting frontend on port 5173..."
npm run dev &
CLIENT_PID=$!

echo -e "\n[3/3] QueueLess is successfully running!"
echo "=========================================="
echo "🌐 Frontend: http://localhost:5173"
echo "⚙️  Backend:  http://localhost:5001"
echo "=========================================="
echo "Press Ctrl+C to stop both servers."

# Trap Ctrl+C to kill both background processes
trap "echo -e '\nStopping QueueLess...'; kill $SERVER_PID; kill $CLIENT_PID; exit" SIGINT SIGTERM

# Keep script running
wait $SERVER_PID $CLIENT_PID
