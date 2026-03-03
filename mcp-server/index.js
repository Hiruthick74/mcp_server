#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class MovieMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'movie-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_movies',
          description: 'Search for movies by name. Returns a list of movies matching the search query.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Movie name or keyword to search for',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_movie_details',
          description: 'Get detailed information about a specific movie including plot, cast, ratings, and more.',
          inputSchema: {
            type: 'object',
            properties: {
              movieId: {
                type: 'string',
                description: 'IMDB ID of the movie (e.g., tt0111161)',
              },
            },
            required: ['movieId'],
          },
        },
        {
          name: 'add_review',
          description: 'Add a new review for a movie with rating and comment.',
          inputSchema: {
            type: 'object',
            properties: {
              movieId: {
                type: 'string',
                description: 'IMDB ID of the movie',
              },
              movieTitle: {
                type: 'string',
                description: 'Title of the movie',
              },
              rating: {
                type: 'number',
                description: 'Rating from 1 to 10',
                minimum: 1,
                maximum: 10,
              },
              comment: {
                type: 'string',
                description: 'Review comment',
              },
              userName: {
                type: 'string',
                description: 'Name of the reviewer (optional)',
              },
            },
            required: ['movieId', 'movieTitle', 'rating', 'comment'],
          },
        },
        {
          name: 'update_review',
          description: 'Update an existing review by ID.',
          inputSchema: {
            type: 'object',
            properties: {
              reviewId: {
                type: 'string',
                description: 'ID of the review to update',
              },
              rating: {
                type: 'number',
                description: 'New rating from 1 to 10',
                minimum: 1,
                maximum: 10,
              },
              comment: {
                type: 'string',
                description: 'New review comment',
              },
            },
            required: ['reviewId'],
          },
        },
        {
          name: 'delete_review',
          description: 'Delete a review by ID.',
          inputSchema: {
            type: 'object',
            properties: {
              reviewId: {
                type: 'string',
                description: 'ID of the review to delete',
              },
            },
            required: ['reviewId'],
          },
        },
        {
          name: 'get_reviews',
          description: 'Get all reviews or reviews for a specific movie.',
          inputSchema: {
            type: 'object',
            properties: {
              movieId: {
                type: 'string',
                description: 'Optional: IMDB ID to filter reviews for a specific movie',
              },
            },
          },
        },
        {
          name: 'get_recommendations',
          description: 'Get movie recommendations based on a specific movie.',
          inputSchema: {
            type: 'object',
            properties: {
              movieId: {
                type: 'string',
                description: 'IMDB ID of the movie to base recommendations on',
              },
            },
            required: ['movieId'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const { name, arguments: args } = request.params;

        switch (name) {
          case 'search_movies':
            return await this.searchMovies(args.query);
          
          case 'get_movie_details':
            return await this.getMovieDetails(args.movieId);
          
          case 'add_review':
            return await this.addReview(args);
          
          case 'update_review':
            return await this.updateReview(args);
          
          case 'delete_review':
            return await this.deleteReview(args.reviewId);
          
          case 'get_reviews':
            return await this.getReviews(args.movieId);
          
          case 'get_recommendations':
            return await this.getRecommendations(args.movieId);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async searchMovies(query) {
    const response = await axios.get(`${API_BASE_URL}/movies/search`, {
      params: { query },
    });

    const movies = response.data.Search || [];
    const formattedResults = movies.map(movie => 
      `${movie.Title} (${movie.Year}) - ID: ${movie.imdbID}`
    ).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `Found ${movies.length} movies:\n${formattedResults}`,
        },
      ],
    };
  }

  async getMovieDetails(movieId) {
    const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
    const movie = response.data;

    const details = `
Title: ${movie.Title}
Year: ${movie.Year}
Genre: ${movie.Genre}
Director: ${movie.Director}
Cast: ${movie.Actors}
Plot: ${movie.Plot}
IMDB Rating: ${movie.imdbRating}/10
Runtime: ${movie.Runtime}
Language: ${movie.Language}
Awards: ${movie.Awards}
    `.trim();

    return {
      content: [
        {
          type: 'text',
          text: details,
        },
      ],
    };
  }

  async addReview(reviewData) {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    const review = response.data;

    return {
      content: [
        {
          type: 'text',
          text: `Review added successfully!\nID: ${review.id}\nMovie: ${review.movieTitle}\nRating: ${review.rating}/10\nComment: ${review.comment}`,
        },
      ],
    };
  }

  async updateReview({ reviewId, rating, comment }) {
    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, updateData);
    const review = response.data;

    return {
      content: [
        {
          type: 'text',
          text: `Review updated successfully!\nMovie: ${review.movieTitle}\nRating: ${review.rating}/10\nComment: ${review.comment}`,
        },
      ],
    };
  }

  async deleteReview(reviewId) {
    await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);

    return {
      content: [
        {
          type: 'text',
          text: 'Review deleted successfully!',
        },
      ],
    };
  }

  async getReviews(movieId) {
    const url = movieId 
      ? `${API_BASE_URL}/reviews/movie/${movieId}`
      : `${API_BASE_URL}/reviews`;
    
    const response = await axios.get(url);
    const reviews = response.data;

    if (reviews.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No reviews found.',
          },
        ],
      };
    }

    const formattedReviews = reviews.map(review => 
      `[${review.id}] ${review.movieTitle} - ${review.rating}/10 by ${review.userName}\n"${review.comment}"\n(${new Date(review.createdAt).toLocaleDateString()})`
    ).join('\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `Found ${reviews.length} review(s):\n\n${formattedReviews}`,
        },
      ],
    };
  }

  async getRecommendations(movieId) {
    const response = await axios.get(`${API_BASE_URL}/recommendations/${movieId}`);
    const data = response.data;

    if (!data.recommendations || data.recommendations.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No recommendations found.',
          },
        ],
      };
    }

    const formattedRecs = data.recommendations.map(movie => 
      `${movie.Title} (${movie.Year}) - ID: ${movie.imdbID}`
    ).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `Based on "${data.basedOn}" (${data.genre}):\n\n${formattedRecs}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Movie MCP server running on stdio');
  }
}

const server = new MovieMCPServer();
server.run().catch(console.error);
