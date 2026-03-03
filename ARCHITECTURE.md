# Architecture Overview - Movie List Application

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACES                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │   Web Browser    │              │  Claude Desktop  │    │
│  │  (localhost:3000)│              │   or Claude CLI  │    │
│  └────────┬─────────┘              └────────┬─────────┘    │
│           │                                  │               │
└───────────┼──────────────────────────────────┼──────────────┘
            │                                  │
            │ HTTP                             │ MCP Protocol
            │ REST API                         │ (stdio)
            │                                  │
┌───────────▼──────────────────────────────────▼──────────────┐
│                     APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │   React Frontend │              │   MCP Server     │    │
│  │   Material-UI    │              │   (Node.js)      │    │
│  │   (Port 3000)    │              │   (Port 3001)    │    │
│  └────────┬─────────┘              └────────┬─────────┘    │
│           │                                  │               │
│           │                                  │               │
│           └──────────────┬───────────────────┘               │
│                          │                                   │
│                          │ HTTP REST API                     │
│                          │                                   │
│                  ┌───────▼────────┐                         │
│                  │  Express API    │                         │
│                  │   Backend       │                         │
│                  │  (Port 5000)    │                         │
│                  └───────┬─────────┘                         │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
┌───────────────▼──────┐   ┌─────────▼──────────┐
│   OMDB API           │   │  Local JSON Storage │
│   (External Service) │   │  reviews.json       │
│   Movie Database     │   │  User Reviews       │
└──────────────────────┘   └────────────────────┘
```

## Component Breakdown

### 1. Frontend (React + Material-UI)
**Location:** `/frontend`
**Port:** 3000
**Purpose:** User interface for browsing and managing movies

**Features:**
- Movie search interface
- Movie details display
- Review management (CRUD)
- Recommendations viewer
- Responsive design with dark theme

**Key Files:**
- `src/App.js` - Main application component
- `src/index.js` - Application entry point
- `package.json` - Dependencies

### 2. Backend API (Express.js)
**Location:** `/backend`
**Port:** 5000
**Purpose:** REST API server handling business logic

**Endpoints:**
- `GET /api/movies/search?query={name}` - Search movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/movie/:movieId` - Get movie reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/recommendations/:movieId` - Get recommendations

**Key Files:**
- `index.js` - Main server file
- `reviews.json` - Database file (auto-created)
- `.env` - Configuration file

### 3. MCP Server (Model Context Protocol)
**Location:** `/mcp-server`
**Port:** 3001 (stdio communication)
**Purpose:** Bridge between Claude AI and the application

**Tools Exposed to Claude:**
- `search_movies` - Search functionality
- `get_movie_details` - Detailed movie info
- `add_review` - Create reviews
- `update_review` - Modify reviews
- `delete_review` - Remove reviews
- `get_reviews` - Fetch reviews
- `get_recommendations` - Get suggestions

**Key Files:**
- `index.js` - MCP server implementation
- `package.json` - Dependencies

### 4. External Services

#### OMDB API
- **Purpose:** Movie data source
- **Type:** Free tier (1,000 requests/day)
- **Data:** Movie details, ratings, posters, cast, etc.

#### Claude AI
- **Purpose:** AI assistant integration
- **Protocol:** MCP (Model Context Protocol)
- **Capability:** Natural language interaction with the app

## Data Flow Examples

### Scenario 1: User Searches for a Movie

```
User (Browser) 
    → React Frontend: User types "Matrix" and clicks Search
    → Frontend: Makes HTTP GET to /api/movies/search?query=Matrix
    → Backend API: Receives request
    → Backend: Calls OMDB API with query
    → OMDB: Returns movie list
    → Backend: Formats and returns data
    → Frontend: Displays movie cards
    → User: Sees results
```

### Scenario 2: User Adds a Review

```
User (Browser)
    → React Frontend: Fills review form, clicks Submit
    → Frontend: Makes HTTP POST to /api/reviews with data
    → Backend API: Receives review data
    → Backend: Generates unique ID, adds timestamp
    → Backend: Saves to reviews.json file
    → Backend: Returns saved review
    → Frontend: Updates UI with new review
    → User: Sees review added
```

### Scenario 3: Claude Searches Movies

```
User (Claude)
    → Types: "Search for movies about space"
    → Claude: Identifies need for search_movies tool
    → Claude: Calls MCP Server with query="space"
    → MCP Server: Makes HTTP GET to /api/movies/search?query=space
    → Backend API: Calls OMDB API
    → OMDB: Returns results
    → Backend: Returns formatted data
    → MCP Server: Formats for Claude
    → Claude: Presents results to user naturally
    → User: Sees movie recommendations in chat
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Material-UI (MUI) 5** - Component library
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for OMDB
- **dotenv** - Environment variables
- **uuid** - Unique ID generation
- **CORS** - Cross-origin requests

### MCP Server
- **@modelcontextprotocol/sdk** - MCP implementation
- **Node.js ESM** - Modern JavaScript modules
- **Axios** - HTTP client

## File Structure

```
mcp_server_movies/
│
├── README.md                      # Full documentation
├── QUICK_START.md                # Setup guide
├── ARCHITECTURE.md               # This file
├── INSTALL.bat                   # Installation script
├── START_ALL.bat                 # Launch script
│
├── backend/                      # API Server
│   ├── index.js                 # Main server file
│   ├── package.json             # Dependencies
│   ├── .env.example             # Config template
│   ├── .env                     # Config (create this)
│   └── reviews.json             # Database (auto-created)
│
├── frontend/                     # React Application
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── App.js               # Main component
│   │   └── index.js             # Entry point
│   └── package.json             # Dependencies
│
└── mcp-server/                   # Claude Integration
    ├── index.js                 # MCP implementation
    └── package.json             # Dependencies
```

## Security Considerations

### Current Implementation
- **API Keys:** Stored in `.env` file (not committed to git)
- **CORS:** Enabled for localhost development
- **Data Storage:** Local JSON file (no sensitive data)
- **Authentication:** None (local development)

### For Production Deployment
Would need to add:
- User authentication and authorization
- Database (PostgreSQL, MongoDB)
- HTTPS/SSL certificates
- Rate limiting
- Input validation and sanitization
- API key rotation
- Environment-specific configurations
- Error logging and monitoring

## Performance Characteristics

### API Response Times
- **OMDB API:** 200-500ms average
- **Local Backend:** <50ms for reviews
- **Frontend Rendering:** <100ms

### Scalability Limitations
- **OMDB Free Tier:** 1,000 requests/day
- **JSON Storage:** Suitable for <10,000 reviews
- **No caching:** Every search hits OMDB API

### Optimization Opportunities
- Add Redis for caching movie data
- Implement request debouncing
- Use pagination for large result sets
- Add service worker for offline support
- Implement virtual scrolling for long lists

## Development vs Production

### Current (Development Mode)
- All services run locally
- Separate ports for each service
- Hot reload enabled
- Detailed error messages
- No data persistence beyond local files

### Production Deployment Would Need
- Single deployment package
- Reverse proxy (Nginx)
- Process manager (PM2)
- Database server
- CDN for static assets
- Monitoring and logging
- Backup strategies
- Load balancing

## Maintenance

### Regular Tasks
- Monitor OMDB API usage
- Backup reviews.json periodically
- Update dependencies monthly
- Check for security vulnerabilities

### Common Updates
- Adding new movie data providers
- Enhancing search algorithms
- Adding user authentication
- Implementing social features
- Adding movie watchlists

## Troubleshooting Guide

### Port Conflicts
- **Solution:** Change ports in respective config files
- Backend: `.env` PORT variable
- Frontend: Set PORT environment variable
- MCP: Runs on stdio, no port

### OMDB API Limits
- **Problem:** 1,000 requests/day limit
- **Solution:** Implement caching layer
- **Temporary:** Wait 24 hours for reset

### Data Loss
- **Problem:** reviews.json corrupted
- **Solution:** Keep backups in `/backups` folder
- **Prevention:** Implement proper error handling

This architecture provides a solid foundation for a movie management application with AI integration while maintaining simplicity for local development and learning purposes.
