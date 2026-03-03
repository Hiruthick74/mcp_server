@echo off
echo ============================================
echo First Time Setup - Movie List Application
echo ============================================
echo.
echo This script will install all dependencies.
echo This may take 5-10 minutes depending on your internet speed.
echo.
pause

echo.
echo [1/3] Installing Backend Dependencies...
cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Installing Frontend Dependencies...
cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Installing MCP Server Dependencies...
cd /d C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: MCP Server installation failed!
    pause
    exit /b 1
)

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo IMPORTANT: Before running the application:
echo.
echo 1. Get your FREE OMDB API key from:
echo    http://www.omdbapi.com/apikey.aspx
echo.
echo 2. Edit the .env file in the backend folder:
echo    C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend\.env
echo.
echo 3. Replace 'your_omdb_api_key_here' with your actual API key
echo.
echo 4. Run START_ALL.bat to start the application
echo.
echo See QUICK_START.md for detailed instructions
echo.
pause
