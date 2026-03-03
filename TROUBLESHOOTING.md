# Troubleshooting Checklist

Use this checklist to diagnose and fix common issues.

## Before You Start

- [ ] Node.js is installed (check with `node --version`)
- [ ] You have an OMDB API key
- [ ] Your API key is activated (checked email)
- [ ] All npm packages are installed (`npm install` in each folder)

## Backend Issues

### Backend Won't Start

- [ ] You're in the correct directory (`backend` folder)
- [ ] `.env` file exists
- [ ] OMDB API key is in `.env` file (not `your_omdb_api_key_here`)
- [ ] Port 5000 is not in use by another application
- [ ] Run `npm install` completed without errors

**Test Backend:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
node index.js
```

Should see: "Server is running on port 5000"

### API Requests Failing

- [ ] Backend server is running (check Command Prompt)
- [ ] OMDB API key is correct and activated
- [ ] You haven't exceeded 1,000 requests today
- [ ] Internet connection is working

**Test API:**
Open browser and visit:
```
http://localhost:5000/api/health
```

Should see: `{"status":"OK","message":"Movie API is running"}`

**Test OMDB directly:**
Replace YOUR_KEY with your actual key:
```
http://www.omdbapi.com/?apikey=YOUR_KEY&s=matrix
```

### Reviews Not Saving

- [ ] Backend server is running
- [ ] `reviews.json` file can be created in backend folder
- [ ] You have write permissions in the backend folder
- [ ] Disk space is available

**Check reviews.json:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
type reviews.json
```

## Frontend Issues

### Frontend Won't Start

- [ ] You're in the correct directory (`frontend` folder)
- [ ] Run `npm install` completed without errors
- [ ] Port 3000 is not in use
- [ ] Backend is running first

**Test Frontend:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend
npm start
```

Should automatically open browser to `http://localhost:3000`

### Can't Search for Movies

- [ ] Backend is running (port 5000)
- [ ] Search query is not empty
- [ ] OMDB API is working (test backend first)
- [ ] Check browser console for errors (F12)

**Browser Console Check:**
1. Press F12 in your browser
2. Go to "Console" tab
3. Try searching
4. Look for red error messages

### Movies Don't Display

- [ ] Search returned results (check "Found X movies" message)
- [ ] Movie posters are loading (check internet connection)
- [ ] Browser JavaScript is enabled
- [ ] No browser console errors (F12)

### Reviews Not Appearing

- [ ] Backend is running
- [ ] Movie details dialog is open
- [ ] Reviews exist for that movie (check backend/reviews.json)
- [ ] No errors in browser console

## MCP Server Issues

### Claude Can't Find movie-server

- [ ] MCP server files exist in `mcp-server` folder
- [ ] `claude_desktop_config.json` exists
- [ ] Config file has correct JSON syntax (no trailing commas)
- [ ] Path in config uses double backslashes on Windows
- [ ] Path points to actual `index.js` file location
- [ ] Node.js is in system PATH
- [ ] Claude Desktop was completely restarted

**Verify Config File Location:**
Windows Key + R, then paste:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Test Path:**
```bash
node C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server\index.js
```

Should see: "Movie MCP server running on stdio"

### Claude Tools Not Working

- [ ] MCP server appears in Claude's available tools
- [ ] Backend API is running (port 5000)
- [ ] Backend API is accessible (`curl http://localhost:5000/api/health`)
- [ ] OMDB API key is set correctly
- [ ] No firewall blocking localhost connections

**Test MCP Independently:**
1. Start backend server
2. Run MCP server standalone:
   ```bash
   node C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server\index.js
   ```
3. Check for any error messages

### Slow Tool Responses

- [ ] Backend is running
- [ ] Internet connection is stable
- [ ] OMDB API is responding (external service, can be slow)
- [ ] First request after startup (initialization takes time)

**Note:** MCP tools are naturally slower than normal chat. This is expected behavior.

## Installation Issues

### npm install Fails

**Error: "npm not found"**
- [ ] Node.js is installed
- [ ] Node.js is in PATH
- [ ] Restart Command Prompt after installing Node.js

**Error: "Permission denied"**
- [ ] Run Command Prompt as Administrator
- [ ] Check antivirus isn't blocking
- [ ] Move project to a simpler path (e.g., C:\Projects\)

**Error: "Network error"**
- [ ] Internet connection is working
- [ ] Firewall allows npm
- [ ] Not behind a corporate proxy
- [ ] Try: `npm config set registry https://registry.npmjs.org/`

### Module Not Found Errors

- [ ] Run `npm install` in the correct folder
- [ ] Check `node_modules` folder exists
- [ ] Delete `node_modules` and `package-lock.json`, run `npm install` again
- [ ] Check Node.js version is 16 or higher

## Port Conflicts

### Port 5000 Already in Use

**Option 1: Change Backend Port**
Edit `backend/.env`:
```
PORT=5001
```

Update frontend `src/App.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

**Option 2: Kill Process on Port 5000**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

### Port 3000 Already in Use

**Option 1: Use Different Port**
When prompted, type `y` to run on different port

**Option 2: Kill Process**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

## OMDB API Issues

### "Invalid API key"

- [ ] API key is exactly as received (no extra spaces)
- [ ] API key is activated via email link
- [ ] Using correct environment variable name: `OMDB_API_KEY`

### "Daily request limit reached"

- [ ] Wait 24 hours for limit reset
- [ ] Consider caching popular searches (advanced)
- [ ] Upgrade to paid tier if needed

### "Movie not found"

- [ ] Movie exists in OMDB database (not all movies are included)
- [ ] Try different search terms
- [ ] Check spelling

## File Permission Issues

### Can't Create Files

- [ ] Not in a protected directory (e.g., Program Files)
- [ ] Have write permissions
- [ ] Disk space available
- [ ] Antivirus not blocking

**Solution:** Move project to:
```
C:\Users\rselv\Documents\mcp_server_movies
```

### Can't Read reviews.json

- [ ] File exists
- [ ] Not locked by another process
- [ ] Valid JSON format
- [ ] File isn't corrupted

**Reset reviews.json:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
echo [] > reviews.json
```

## Browser Issues

### Website Not Loading

- [ ] Frontend server is running
- [ ] Going to correct URL: `http://localhost:3000`
- [ ] Not `https` (should be `http`)
- [ ] Browser isn't blocking localhost
- [ ] Clear browser cache (Ctrl + Shift + Delete)

### Styling Looks Broken

- [ ] All npm packages installed correctly
- [ ] Material-UI installed (`@mui/material`)
- [ ] Clear browser cache
- [ ] Check browser console for CSS errors

### Features Not Working

- [ ] JavaScript is enabled in browser
- [ ] Browser console has no errors (F12)
- [ ] Backend is running
- [ ] Try different browser (Chrome, Firefox, Edge)

## Complete System Test

Run this test sequence to verify everything:

### 1. Backend Test
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
npm start
```
Wait for "Server is running on port 5000"

### 2. Test API Endpoint
Open new Command Prompt:
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"OK",...}`

### 3. Test Movie Search
```bash
curl "http://localhost:5000/api/movies/search?query=matrix"
```
Should return movie data (JSON)

### 4. Frontend Test
Open new Command Prompt:
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend
npm start
```
Browser should open to `http://localhost:3000`

### 5. Search Test
In the website:
- Type "Matrix" in search bar
- Click Search
- Should see movie results

### 6. Review Test
- Click on a movie
- Click "Add Review"
- Enter rating and comment
- Click Submit
- Should see review added

### 7. MCP Test
Open new Command Prompt:
```bash
node C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server\index.js
```
Should see "Movie MCP server running on stdio"
Press Ctrl+C to stop

### 8. Claude Test
- Restart Claude Desktop completely
- Ask: "Search for movies about space"
- Should see Claude using movie-server tool

## Still Having Issues?

### Collect Information

1. **Error Messages:** Copy exact error text
2. **Console Output:** What's in Command Prompt windows
3. **Browser Console:** Press F12, check Console tab
4. **File Locations:** Verify all paths are correct
5. **Versions:**
   ```bash
   node --version
   npm --version
   ```

### Reset Everything

**Nuclear Option** (when nothing else works):

```bash
# Stop all servers (Ctrl+C in each window)

# Delete node_modules in each folder
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
rmdir /s /q node_modules
del package-lock.json

cd ..\frontend
rmdir /s /q node_modules
del package-lock.json

cd ..\mcp-server
rmdir /s /q node_modules
del package-lock.json

# Reinstall everything
cd ..\backend
npm install

cd ..\frontend
npm install

cd ..\mcp-server
npm install

# Start fresh
```

### Check Documentation

- [ ] Read README.md for overview
- [ ] Read QUICK_START.md for setup
- [ ] Read CLAUDE_SETUP.md for MCP details
- [ ] Read ARCHITECTURE.md to understand structure

### Common Gotchas

1. **Wrong directory:** Make sure you're in the right folder
2. **Didn't wait:** Backend must start before frontend
3. **Typo in .env:** Check OMDB_API_KEY carefully
4. **Forgot to activate:** Check email for API activation link
5. **Windows paths:** Use double backslashes `\\` in JSON
6. **Didn't restart Claude:** Must quit completely from system tray
7. **Port already used:** Another app using ports 3000 or 5000
8. **Old cache:** Clear browser cache
9. **Firewall:** May be blocking localhost connections
10. **Corporate network:** Proxy may interfere with API calls

## Quick Reference Commands

### Start Everything
```bash
# Terminal 1 - Backend
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
npm start

# Terminal 2 - Frontend
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend
npm start

# Terminal 3 - MCP (only if using Claude)
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server
node index.js
```

### Stop Everything
Press `Ctrl+C` in each Command Prompt window

### Reinstall Dependencies
```bash
cd <folder>
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Check What's Running
```bash
# Check ports
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Check Node processes
tasklist | findstr node
```

## Success Checklist

When everything works, you should have:

- [ ] Backend running on port 5000
- [ ] Frontend accessible at http://localhost:3000
- [ ] Can search for movies
- [ ] Can view movie details
- [ ] Can add/edit/delete reviews
- [ ] Can get recommendations
- [ ] MCP server configured for Claude (optional)
- [ ] Claude can use movie tools (optional)

If all items are checked, congratulations! Your Movie List application is fully operational! 🎉
