# Quick Start Guide - Movie List Application

## Step-by-Step Installation

### 1. Install Node.js (if not already installed)

Download and install Node.js from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- During installation, make sure to check "Add to PATH"
- Verify installation by opening Command Prompt and typing:
  ```
  node --version
  npm --version
  ```

### 2. Get Your OMDB API Key

1. Visit: http://www.omdbapi.com/apikey.aspx
2. Select the **FREE** option (1,000 daily requests)
3. Enter your email address
4. Check your email inbox for the API key
5. Click the activation link in the email
6. Copy your API key (it looks like: `12abc34d`)

### 3. Setup Backend

Open Command Prompt (Windows Key + R, type `cmd`, press Enter)

```bash
# Navigate to backend folder
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

Now edit the `.env` file:
1. Open File Explorer
2. Navigate to: `C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend`
3. Open `.env` file with Notepad
4. Replace `your_omdb_api_key_here` with your actual API key
5. Save and close

Start the backend:
```bash
npm start
```

**Keep this Command Prompt window open!** You should see:
```
Server is running on port 5000
```

### 4. Setup Frontend

Open a **NEW** Command Prompt window (Windows Key + R, type `cmd`, press Enter)

```bash
# Navigate to frontend folder
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend

# Install dependencies (this may take 2-3 minutes)
npm install

# Start the application
npm start
```

Your browser should automatically open to: http://localhost:3000

**Keep this Command Prompt window open too!**

### 5. Setup MCP Server (for Claude Integration)

Open a **THIRD** Command Prompt window

```bash
# Navigate to mcp-server folder
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server

# Install dependencies
npm install
```

### 6. Connect MCP to Claude

#### For Claude Desktop:

1. Find your Claude config file at:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Or: `C:\Users\rselv\AppData\Roaming\Claude\claude_desktop_config.json`

2. Open it with Notepad and add this configuration:

```json
{
  "mcpServers": {
    "movie-server": {
      "command": "node",
      "args": ["C:\\Users\\rselv\\OneDrive\\Documents\\mcp_server_movies\\mcp-server\\index.js"]
    }
  }
}
```

3. **Important:** Make sure to use double backslashes (`\\`) in the path!

4. Save the file and restart Claude Desktop

#### For Claude CLI:

Add the same configuration to: `~/.config/claude/config.json`

### 7. Verify Everything Works

1. **Test the Website:**
   - Go to http://localhost:3000
   - Search for "Matrix" in the search bar
   - Click on a movie to see details
   - Try adding a review

2. **Test Claude Integration:**
   - Open Claude Desktop
   - You should see "movie-server" available
   - Try asking: "Search for movies about space"
   - Try: "Add a review for The Matrix with rating 9 and comment 'Amazing movie!'"

## Troubleshooting

### Backend won't start
- **Problem:** "Cannot find module 'express'"
- **Solution:** Run `npm install` in the backend folder

- **Problem:** API calls return errors
- **Solution:** Check your OMDB API key in the `.env` file and make sure you activated it via email

### Frontend won't start
- **Problem:** "Port 3000 is already in use"
- **Solution:** Press `Ctrl+C` in the Command Prompt running the frontend, then run `npm start` again. If still issues, try: `npx kill-port 3000` then `npm start`

### Claude can't connect
- **Problem:** "movie-server not found"
- **Solution:** 
  1. Double-check the path in `claude_desktop_config.json` uses double backslashes
  2. Make sure Node.js is in your system PATH
  3. Restart Claude Desktop completely (quit from system tray)

### Movies not loading
- **Problem:** No results when searching
- **Solution:** 
  1. Verify your OMDB API key is activated (check email)
  2. Make sure backend is running (check Command Prompt)
  3. Try a simple search like "Matrix" or "Star Wars"

## Daily Usage

### Starting the Application

You need to run 3 things:

**Terminal 1 - Backend:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\frontend
npm start
```

**Terminal 3 - MCP Server (for Claude):**
```bash
cd C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server
node index.js
```

### Stopping the Application

- Press `Ctrl+C` in each Command Prompt window
- Or just close the Command Prompt windows

## Features Available

### In the Web Application:
- ✅ Search movies by name
- ✅ View detailed movie information
- ✅ See IMDB ratings and cast
- ✅ Add your own reviews (with rating and comments)
- ✅ Edit your reviews
- ✅ Delete reviews
- ✅ Get movie recommendations
- ✅ View all reviews

### With Claude:
- ✅ Ask Claude to search for movies
- ✅ Get movie details through conversation
- ✅ Add reviews via Claude
- ✅ Update or delete reviews
- ✅ Get recommendations
- ✅ View all your reviews

## Example Claude Commands

Try these in Claude Desktop after connecting the MCP server:

```
"Search for movies about artificial intelligence"
"What's the rating for Inception?"
"Add a review for The Godfather with rating 10 and comment 'Masterpiece!'"
"Show me my reviews"
"Recommend movies similar to The Matrix"
"Delete review [review-id]"
```

## Need Help?

1. Check all three Command Prompts are running without errors
2. Verify OMDB API key is correct and activated
3. Make sure you're using the correct ports (5000 for backend, 3000 for frontend)
4. Review the main README.md for more detailed information

Enjoy your movie list application! 🎬🍿
