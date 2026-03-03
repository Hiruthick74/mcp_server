# Visual Guides

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

    👤 User Opens Browser
         ↓
    🌐 http://localhost:3000
         ↓
    ┌──────────────────────┐
    │   Landing Page       │
    │   - Search Bar       │
    │   - Dark Theme       │
    └──────────┬───────────┘
         ↓
    📝 Types "Matrix"
         ↓
    🔍 Click Search Button
         ↓
    ┌──────────────────────┐
    │  Backend API Call    │
    │  GET /api/movies/    │
    │  search?query=Matrix │
    └──────────┬───────────┘
         ↓
    🌍 OMDB API Request
         ↓
    📊 Results Returned
         ↓
    ┌──────────────────────┐
    │  Movie Grid Display  │
    │  - The Matrix (1999) │
    │  - Matrix Reloaded   │
    │  - Matrix Revolutions│
    └──────────┬───────────┘
         ↓
    🖱️ Click on Movie
         ↓
    ┌──────────────────────┐
    │  Movie Details       │
    │  - Poster            │
    │  - Plot              │
    │  - Rating: 8.7/10    │
    │  - Cast, Director    │
    │  - Reviews Section   │
    └──────────┬───────────┘
         ↓
    ✍️ Add Review Button
         ↓
    ┌──────────────────────┐
    │  Review Dialog       │
    │  - Rating Stars      │
    │  - Comment Box       │
    │  - Submit Button     │
    └──────────┬───────────┘
         ↓
    💾 POST /api/reviews
         ↓
    ✅ Review Saved
         ↓
    🎉 Success Message
```

## Claude Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLAUDE AI WORKFLOW                            │
└─────────────────────────────────────────────────────────────────┘

    👤 User in Claude Desktop
         ↓
    💬 "Search for movies about space"
         ↓
    🤖 Claude Receives Request
         ↓
    🔧 Claude Identifies Tool Need
         ↓
    ┌──────────────────────┐
    │  MCP Server          │
    │  movie-server        │
    │  search_movies tool  │
    └──────────┬───────────┘
         ↓
    🔌 MCP Protocol (stdio)
         ↓
    ┌──────────────────────┐
    │  MCP Server Process  │
    │  Receives: query     │
    │  = "space"           │
    └──────────┬───────────┘
         ↓
    📡 HTTP to Backend
         ↓
    ┌──────────────────────┐
    │  Express API         │
    │  GET /api/movies/    │
    │  search?query=space  │
    └──────────┬───────────┘
         ↓
    🌍 OMDB API
         ↓
    📊 Results: Interstellar, Gravity, etc.
         ↓
    ⬅️ Back to MCP Server
         ↓
    📝 Format for Claude
         ↓
    🤖 Claude Receives Results
         ↓
    💭 Claude Processes
         ↓
    💬 Natural Language Response:
       "I found several great space movies:
        1. Interstellar (2014)
        2. Gravity (2013)
        3. The Martian (2015)
        Would you like details on any?"
         ↓
    👤 User Sees Friendly Response
```

## System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT MAP                               │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐
    │   React App     │
    │   Port: 3000    │
    │                 │
    │  Components:    │
    │  - SearchBar    │
    │  - MovieCard    │
    │  - MovieDetails │
    │  - ReviewForm   │
    │  - ReviewList   │
    └────────┬────────┘
             │
             │ HTTP REST
             │
    ┌────────▼────────┐
    │  Express API    │
    │  Port: 5000     │
    │                 │
    │  Routes:        │
    │  /api/movies    │
    │  /api/reviews   │
    │  /api/recs      │
    └────┬───────┬────┘
         │       │
         │       └──────────┐
         │                  │
    ┌────▼────────┐    ┌────▼─────────┐
    │  OMDB API   │    │ reviews.json │
    │  External   │    │ Local File   │
    └─────────────┘    └──────────────┘

    ┌─────────────────┐
    │  Claude Desktop │
    │                 │
    └────────┬────────┘
             │
             │ MCP Protocol
             │
    ┌────────▼────────┐
    │   MCP Server    │
    │   Port: 3001    │
    │                 │
    │  Tools:         │
    │  - search       │
    │  - details      │
    │  - reviews      │
    └────────┬────────┘
             │
             │ HTTP REST
             │
    ┌────────▼────────┐
    │  Express API    │
    │  Port: 5000     │
    └─────────────────┘
```

## Data Flow Types

### Type 1: Search Operation
```
User Input → Frontend → Backend → OMDB → Backend → Frontend → Display
   100ms      50ms      200ms      500ms    50ms     100ms
   
Total Time: ~1 second
```

### Type 2: Review Creation
```
User Input → Frontend → Backend → File Write → Backend → Frontend → Display
   100ms      50ms      50ms       10ms        50ms     100ms
   
Total Time: ~400ms
```

### Type 3: Claude Search
```
User Chat → Claude → MCP Server → Backend → OMDB → Backend → MCP → Claude → Response
   100ms    200ms    50ms          50ms      500ms    50ms     50ms    200ms
   
Total Time: ~1.2 seconds
```

## File Size Estimates

```
Backend Files:
├── index.js           ~7 KB
├── package.json       ~500 B
├── .env               ~100 B
└── reviews.json       ~varies

Frontend Files:
├── App.js             ~25 KB
├── index.js           ~500 B
├── package.json       ~1 KB
└── index.html         ~500 B

MCP Server:
├── index.js           ~15 KB
└── package.json       ~500 B

Documentation:
├── README.md          ~15 KB
├── QUICK_START.md     ~10 KB
├── ARCHITECTURE.md    ~12 KB
├── CLAUDE_SETUP.md    ~15 KB
└── TROUBLESHOOTING    ~15 KB

Total Project Size: ~50 KB (source)
With node_modules: ~200 MB
```

## Request/Response Examples

### Search Request
```http
GET /api/movies/search?query=matrix
Host: localhost:5000

Response:
{
  "Search": [
    {
      "Title": "The Matrix",
      "Year": "1999",
      "imdbID": "tt0133093",
      "Type": "movie",
      "Poster": "https://..."
    }
  ],
  "totalResults": "3",
  "Response": "True"
}
```

### Review Creation
```http
POST /api/reviews
Host: localhost:5000
Content-Type: application/json

{
  "movieId": "tt0133093",
  "movieTitle": "The Matrix",
  "rating": 9.5,
  "comment": "Amazing movie!",
  "userName": "John"
}

Response:
{
  "id": "abc-123-def",
  "movieId": "tt0133093",
  "movieTitle": "The Matrix",
  "rating": 9.5,
  "comment": "Amazing movie!",
  "userName": "John",
  "createdAt": "2026-02-05T...",
  "updatedAt": "2026-02-05T..."
}
```

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [🎬] Movie List              [⭐ Powered by Claude AI]     │ AppBar
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────┐  ┌────────┐         │
│  │ 🔍 Search for movies...          │  │ Search │         │ Search
│  └──────────────────────────────────┘  └────────┘         │
│                                                              │
│  [Search Results (5)] [Recommendations (3)] [All Reviews]  │ Tabs
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ [IMG]   │  │ [IMG]   │  │ [IMG]   │  │ [IMG]   │      │
│  │         │  │         │  │         │  │         │      │
│  │ Matrix  │  │ Matrix  │  │ Matrix  │  │ Matrix  │      │ Results
│  │ (1999)  │  │ Reloaded│  │ Revol.  │  │ Resurrec│      │ Grid
│  │         │  │ (2003)  │  │ (2003)  │  │ (2021)  │      │
│  │ [View]  │  │ [View]  │  │ [View]  │  │ [View]  │      │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Movie Details Dialog:
┌─────────────────────────────────────────────────────────────┐
│  The Matrix (1999)                              [X]          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  Title: The Matrix                            │
│  │  [IMG]   │  Year: 1999                                   │
│  │  POSTER  │  Genre: Action, Sci-Fi                        │
│  │          │  Director: Wachowskis                         │
│  │          │  Cast: Keanu Reeves, Carrie-Anne Moss        │
│  └──────────┘  Rating: ⭐ 8.7/10                            │
│                                                              │
│  Plot: A computer hacker learns...                          │
│                                                              │
│  Reviews (2)                            [+ Add Review]       │
│  ┌────────────────────────────────────────────────────────┐│
│  │ ⭐⭐⭐⭐⭐ 10/10 by John          [Edit] [Delete]       ││
│  │ "Masterpiece! Mind-bending and revolutionary"           ││
│  │ Feb 5, 2026                                              ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
│                                          [Get Recommendations]│
└─────────────────────────────────────────────────────────────┘
```

## Setup Progress Indicator

```
Installation Progress:
[▓▓▓▓▓▓▓▓▓▓] 100%

1. ✅ Node.js Installed
2. ✅ OMDB API Key Obtained
3. ✅ Backend Dependencies Installed
4. ✅ Frontend Dependencies Installed  
5. ✅ MCP Server Dependencies Installed
6. ✅ .env File Configured
7. ✅ Backend Started (Port 5000)
8. ✅ Frontend Started (Port 3000)
9. ✅ MCP Server Configured
10. ✅ Claude Connected

Ready to use! 🎉
```

## Performance Metrics

```
Typical Response Times:

Search Movies:        800ms - 1.2s  (depends on OMDB)
Get Movie Details:    500ms - 800ms (depends on OMDB)
Create Review:        50ms - 100ms  (local operation)
Update Review:        50ms - 100ms  (local operation)
Delete Review:        50ms - 100ms  (local operation)
Get Recommendations:  800ms - 1.5s  (depends on OMDB)

Claude Tool Calls:    +400ms overhead (MCP processing)
```

## Error States

```
Error Handling Flow:

Network Error
    ↓
┌──────────────────┐
│ Try Request      │
│ Timeout: 10s     │
└────┬──────┬──────┘
     │      │
   Success Error
     │      │
     ↓      ↓
  Return  ┌────────────────┐
  Data    │ Catch Error    │
          │ Log Error      │
          │ User Message   │
          │ Retry Option   │
          └────────────────┘
```

This visual guide should help you understand how all the pieces fit together!
