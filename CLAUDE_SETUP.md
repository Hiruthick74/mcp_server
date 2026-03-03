# Claude Integration Guide

## What is MCP (Model Context Protocol)?

MCP is a protocol that allows Claude to interact with external tools and services. In this project, the MCP server acts as a bridge between Claude and your Movie List application, enabling Claude to:
- Search for movies
- Get movie details
- Manage reviews
- Get recommendations

Think of it like giving Claude "hands" to interact with your application through conversation.

## Setup for Claude Desktop

### Step 1: Locate Your Config File

**Windows:**
```
C:\Users\rselv\AppData\Roaming\Claude\claude_desktop_config.json
```

Or press Windows Key + R, paste this, and press Enter:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Edit the Config File

Open the file with Notepad (Windows) or any text editor.

If the file is **empty** or doesn't exist, paste this:

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

If the file **already has content**, add the movie-server section:

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "existing-command",
      "args": ["existing-args"]
    },
    "movie-server": {
      "command": "node",
      "args": ["C:\\Users\\rselv\\OneDrive\\Documents\\mcp_server_movies\\mcp-server\\index.js"]
    }
  }
}
```

**IMPORTANT:** 
- Use double backslashes `\\` in Windows paths
- Use forward slashes `/` in macOS/Linux paths
- Make sure the path points to YOUR actual file location

### Step 3: Verify Node.js is in PATH

Open Command Prompt and type:
```bash
node --version
```

If you see a version number (like `v18.17.0`), you're good!

If you get an error:
1. Reinstall Node.js from https://nodejs.org/
2. Make sure to check "Add to PATH" during installation
3. Restart your computer
4. Try the command again

### Step 4: Restart Claude Desktop

**IMPORTANT:** Just closing the window isn't enough!

**Windows:**
1. Look in your system tray (bottom-right corner)
2. Right-click the Claude icon
3. Click "Quit Claude"
4. Wait 5 seconds
5. Launch Claude Desktop again

**macOS:**
1. Right-click Claude in the Dock
2. Click "Quit"
3. Wait 5 seconds
4. Launch Claude Desktop again

### Step 5: Verify Connection

1. Open Claude Desktop
2. Start a new conversation
3. Look for a tools icon or settings
4. You should see "movie-server" listed as available

Try asking Claude:
```
"Can you search for movies about space?"
```

If it works, you'll see Claude using the movie-server tool!

## Setup for Claude CLI

### Step 1: Create Config Directory

```bash
mkdir -p ~/.config/claude
```

### Step 2: Create/Edit Config File

```bash
nano ~/.config/claude/config.json
```

Or use any text editor:
```bash
code ~/.config/claude/config.json
```

### Step 3: Add Configuration

**macOS/Linux:**
```json
{
  "mcpServers": {
    "movie-server": {
      "command": "node",
      "args": ["/Users/rselv/OneDrive/Documents/mcp_server_movies/mcp-server/index.js"]
    }
  }
}
```

**Windows (WSL or Git Bash):**
```json
{
  "mcpServers": {
    "movie-server": {
      "command": "node",
      "args": ["C:/Users/rselv/OneDrive/Documents/mcp_server_movies/mcp-server/index.js"]
    }
  }
}
```

### Step 4: Test

```bash
claude-cli "Search for movies about artificial intelligence"
```

## Available Tools in Claude

Once connected, Claude can use these tools:

### 1. search_movies
Search for movies by name.

**Example:**
```
"Search for movies with 'matrix' in the title"
"Find movies about space exploration"
```

### 2. get_movie_details
Get detailed information about a specific movie.

**Example:**
```
"Tell me more about the movie with ID tt0133093"
"What's the plot of The Matrix?"
```

### 3. add_review
Add a new review for a movie.

**Example:**
```
"Add a review for The Matrix (tt0133093) with rating 9.5 
and comment 'Mind-bending sci-fi masterpiece!'"
```

### 4. update_review
Update an existing review.

**Example:**
```
"Update review abc-123 to rating 10"
"Change my review abc-123 comment to 'Even better on rewatch'"
```

### 5. delete_review
Delete a review.

**Example:**
```
"Delete review abc-123"
"Remove my review for The Matrix"
```

### 6. get_reviews
Get all reviews or reviews for a specific movie.

**Example:**
```
"Show me all my reviews"
"What reviews do I have for The Matrix?"
```

### 7. get_recommendations
Get movie recommendations based on a movie.

**Example:**
```
"Recommend movies similar to The Matrix (tt0133093)"
"What movies are like Inception?"
```

## Sample Conversations with Claude

### Example 1: Movie Research
```
You: I'm looking for good sci-fi movies from the 90s. Can you help?

Claude: [uses search_movies tool]
I found several great sci-fi movies from the 90s:
1. The Matrix (1999) - ID: tt0133093
2. The Fifth Element (1997) - ID: tt0119116
3. Total Recall (1990) - ID: tt0100802

Would you like to know more about any of these?

You: Tell me about The Matrix

Claude: [uses get_movie_details tool]
The Matrix (1999)
- Director: Lana Wachowski, Lilly Wachowski
- Cast: Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss
- Rating: 8.7/10
- Plot: A computer hacker learns about the true nature of reality...
[full details]

Would you like me to save a review or get recommendations?
```

### Example 2: Review Management
```
You: I just watched Inception and loved it. Can you add a review for me?

Claude: [uses search_movies to find Inception]
[uses add_review tool]
Great! I've added your review for Inception:
- Rating: 9/10
- Comment: "Mind-bending thriller with amazing visuals"
- Review ID: abc-123-def

You: Actually, I want to rate it 10/10

Claude: [uses update_review tool]
Done! Updated your Inception review to 10/10. It was already an amazing movie!
```

### Example 3: Discovery
```
You: What should I watch next if I loved The Dark Knight?

Claude: [uses search_movies to find The Dark Knight]
[uses get_movie_details to confirm it's the right movie]
[uses get_recommendations tool]

Based on The Dark Knight, here are some recommendations:
1. Batman Begins (2005)
2. The Dark Knight Rises (2012)
3. Joker (2019)
4. V for Vendetta (2005)

Would you like more details about any of these?
```

## Troubleshooting

### Claude Can't Find movie-server

**Problem:** "movie-server not available"

**Solutions:**
1. Check the config file path is correct
2. Verify double backslashes in Windows paths
3. Make sure Node.js is in PATH
4. Completely quit and restart Claude Desktop
5. Check the MCP server index.js file exists at the specified path

**Verification:**
Open Command Prompt and run:
```bash
node C:\Users\rselv\OneDrive\Documents\mcp_server_movies\mcp-server\index.js
```

If you see "Movie MCP server running on stdio", the server works!
Press Ctrl+C to stop it.

### Tools Not Working

**Problem:** Claude says tools are available but they fail

**Solutions:**
1. Make sure the backend API is running (port 5000)
2. Check the backend logs for errors
3. Verify your OMDB API key is set correctly
4. Try testing the API directly:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Slow Responses

**Problem:** Claude takes a long time to respond

**Possible Causes:**
1. OMDB API is slow (external service)
2. First search after startup (initialization)
3. Network issues

**Not Actually a Problem:**
- MCP tools are meant to be slower than normal chat
- Claude needs to think about which tool to use
- External API calls take time

### Permission Errors

**Problem:** "Cannot access file" or "Permission denied"

**Solutions:**
1. Make sure the file paths are correct
2. Check file permissions (right-click → Properties → Security)
3. Run Command Prompt as Administrator
4. Move the project to a simpler path (e.g., C:\Projects\movie-app)

## Advanced Configuration

### Adding Multiple MCP Servers

You can add other MCP servers alongside the movie server:

```json
{
  "mcpServers": {
    "movie-server": {
      "command": "node",
      "args": ["C:\\path\\to\\movie-server\\index.js"]
    },
    "another-server": {
      "command": "python",
      "args": ["-m", "another_server"]
    }
  }
}
```

### Environment Variables

You can pass environment variables to the MCP server:

```json
{
  "mcpServers": {
    "movie-server": {
      "command": "node",
      "args": ["C:\\path\\to\\index.js"],
      "env": {
        "LOG_LEVEL": "debug",
        "API_TIMEOUT": "5000"
      }
    }
  }
}
```

### Logging

To see MCP server logs, modify the startup:

**Windows:**
```json
{
  "mcpServers": {
    "movie-server": {
      "command": "cmd",
      "args": ["/c", "node C:\\path\\to\\index.js 2> C:\\path\\to\\logs\\mcp.log"]
    }
  }
}
```

**macOS/Linux:**
```json
{
  "mcpServers": {
    "movie-server": {
      "command": "sh",
      "args": ["-c", "node /path/to/index.js 2> /path/to/logs/mcp.log"]
    }
  }
}
```

## Best Practices

### For Users

1. **Be Specific:** Instead of "find movies", say "search for action movies from 2020"
2. **Use IDs:** After getting search results, reference movies by their ID (tt0133093)
3. **One Task at a Time:** Let Claude complete one operation before asking for another
4. **Check Results:** Ask Claude to confirm before deleting reviews

### For Development

1. **Test Standalone:** Test the MCP server independently before connecting to Claude
2. **Check Logs:** Always check backend server logs for errors
3. **API Limits:** Remember OMDB has a 1,000/day request limit
4. **Graceful Errors:** The MCP server handles errors gracefully, but check responses

## Getting Help

### If something doesn't work:

1. **Check All Servers Are Running:**
   - Backend (port 5000)
   - MCP Server (stdio)
   - Frontend (port 3000) - optional for Claude usage

2. **Verify Configuration:**
   - Config file syntax is valid JSON
   - Paths use correct slashes
   - Node.js is in PATH

3. **Test Components:**
   ```bash
   # Test backend
   curl http://localhost:5000/api/health
   
   # Test MCP server
   node C:\path\to\mcp-server\index.js
   ```

4. **Review Documentation:**
   - README.md - Full documentation
   - QUICK_START.md - Setup guide
   - ARCHITECTURE.md - How it works

5. **Common Issues:**
   - API key not set → Edit backend/.env
   - Port conflict → Change ports
   - Path wrong → Double-check config file
   - Node.js not found → Reinstall Node.js

Enjoy using Claude with your Movie List application! 🎬🤖
