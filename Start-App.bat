@echo off
echo Starting INDISearch Backend...
cd backend
start cmd /k "node server.js"
cd ..

echo Starting INDISearch Frontend...
cd frontend
start cmd /k "npm run dev -- --host"

echo Waiting for server to start...
timeout /t 3 /nobreak > nul

echo Opening browser...
start http://localhost:5173
