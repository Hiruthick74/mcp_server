@echo off
echo ============================================
echo Starting Movie List Application
echo ============================================
echo.

echo [1/3] Starting Backend Server...
start "Movie Backend" cmd /k "cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend && npm start"
timeout /t 3 /nobreak > nul

echo [2/3] Starting Frontend...
start "Movie Frontend" cmd /k "cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend && npm start"
timeout /t 3 /nobreak > nul

echo [3/3] Starting MCP Server for Claude...
start "MCP Server" cmd /k "cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server && node index.js"

echo.
echo ============================================
echo All services starting!
echo ============================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo MCP Server: Running for Claude integration
echo.
echo To stop: Close all Command Prompt windows
echo          or press Ctrl+C in each window
echo.
pause
