import { AuthResponse, ListingsResponse, ApiErrorResponse } from '@/types/api';

// Using relative URL since we're proxying through Next.js
const API_BASE_URL = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async getAuthToken(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting to get auth token...');
      const response = await fetch(`${API_BASE_URL}/auth/jwt/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('Auth response status:', response.status);
      
      let data;
      try {
        const text = await response.text();
        console.log('Raw response:', text);
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        data = {};
      }
      
      console.log('Auth response data:', data);
      
      if (!response.ok) {
        console.error('Auth error:', data);
        throw new ApiError(response.status, (data as ApiErrorResponse).detail || 'Authentication failed');
      }

      if (!data.access) {
        console.error('No access token in response:', data);
        throw new ApiError(500, 'Invalid response format: missing access token');
      }

      console.log('Auth successful');
      return data as AuthResponse;
    } catch (error) {
      console.error('Auth request failed:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to authenticate');
    }
  },

  async getListings(token: string): Promise<ListingsResponse> {
    try {
      console.log('Attempting to get listings...');
      const response = await fetch(`${API_BASE_URL}/listings/listings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      console.log('Listings response status:', response.status);
      
      let data;
      try {
        const text = await response.text();
        console.log('Raw response:', text);
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        data = {};
      }
      
      console.log('Listings response data:', data);
      
      if (!response.ok) {
        console.error('Listings error:', data);
        throw new ApiError(response.status, (data as ApiErrorResponse).detail || 'Failed to fetch listings');
      }

      // Handle both array response and paginated response formats
      const listings = Array.isArray(data) ? data : data.results;
      
      if (!Array.isArray(listings)) {
        console.error('Invalid listings response format:', data);
        throw new ApiError(500, 'Invalid response format: missing or invalid results array');
      }

      console.log('Listings fetched successfully');
      return {
        count: listings.length,
        next: null,
        previous: null,
        results: listings
      };
    } catch (error) {
      console.error('Listings request failed:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Failed to fetch listings');
    }
  },
}; 