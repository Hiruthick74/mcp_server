# Movie List Application with MCP Server Integration

A modern movie search and review application with Claude AI integration via MCP (Model Context Protocol).

## Features

- 🎬 Search movies by name
- ⭐ View movie ratings and details (powered by OMDB API)
- 📝 Add, update, and delete movie reviews (CRUD operations)
- 🎯 Get personalized movie recommendations
- 🤖 Claude AI integration via MCP server

## Tech Stack

- **Frontend**: React + Material-UI
- **Backend**: Node.js + Express
- **Database**: JSON file storage (easy local deployment)
- **Movie API**: OMDB API (free)
- **MCP Server**: Custom MCP implementation for Claude integration

## Project Structure

```
mcp_server_movies/
├── backend/           # Express API server
├── frontend/          # React application
├── mcp-server/        # MCP server for Claude integration
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OMDB API Key (free from http://www.omdbapi.com/apikey.aspx)

### Step 1: Get OMDB API Key

1. Visit http://www.omdbapi.com/apikey.aspx
2. Select "FREE" plan (1,000 daily requests)
3. Enter your email
4. Check your email for the API key
5. Activate the key by clicking the link in the email

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
OMDB_API_KEY=your_api_key_here
```

Start the backend:
```bash
npm start
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will open at http://localhost:3000

### Step 4: MCP Server Setup

```bash
cd mcp-server
npm install
npm start
```

The MCP server will run on port 3001.

### Step 5: Connect MCP to Claude

1. Open Claude Desktop or CLI
2. Add the MCP server configuration to your Claude config file:

**For Claude Desktop** (`claude_desktop_config.json`):
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

**For Claude CLI** (`~/.config/claude/config.json`):
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

3. Restart Claude
4. You should now see "movie-server" in Claude's available tools

## Usage

### Using the Web Application

1. **Search Movies**: Enter a movie name in the search bar
2. **View Details**: Click on any movie to see full details
3. **Add Review**: Click "Add Review" and write your thoughts
4. **Edit/Delete Reviews**: Manage your existing reviews
5. **Get Recommendations**: Click "Get Recommendations" for similar movies

### Using with Claude

Once connected, you can ask Claude:
- "Search for movies about space"
- "What's the rating for The Matrix?"
- "Add a review for Inception"
- "Recommend movies similar to The Godfather"
- "Show me my reviews"

## API Endpoints

### Backend API (Port 5000)

- `GET /api/movies/search?query={movie_name}` - Search movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Add a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review
- `GET /api/recommendations/:movieId` - Get recommendations

### MCP Server Tools

- `search_movies` - Search for movies by name
- `get_movie_details` - Get detailed information about a movie
- `add_review` - Add a new movie review
- `update_review` - Update an existing review
- `delete_review` - Delete a review
- `get_reviews` - Get all reviews
- `get_recommendations` - Get movie recommendations

## Troubleshooting

### OMDB API Issues
- Ensure your API key is activated (check email)
- Free tier has 1,000 requests/day limit
- Verify API key in `.env` file

### Port Conflicts
- Backend default: 5000
- Frontend default: 3000
- MCP Server default: 3001
- Change ports in respective config files if needed

### MCP Connection Issues
- Ensure Node.js is in system PATH
- Verify file paths in Claude config are correct
- Restart Claude after config changes
- Check MCP server logs for errors

## Development

### Running in Development Mode

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

Terminal 3 (MCP Server):
```bash
cd mcp-server
npm start
```

## License

MIT

## Support

For issues or questions, please check the troubleshooting section or create an issue in the project repository.
