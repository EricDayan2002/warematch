import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Listing } from '@/types/api';

interface UseListingsResult {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useListings(): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Starting listings fetch...');
      const token = await api.getAuthToken('tester@gmail.com', 'Tester@1234');
      console.log('Got auth token, fetching listings...');
      
      const response = await api.getListings(token.access);
      console.log('Got listings response:', response);
      
      if (!response.results || !Array.isArray(response.results)) {
        throw new Error('Invalid response format from API');
      }

      setListings(response.results);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error in useListings:', err);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        setRetryCount(prev => prev + 1);
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchListings();
      }
      
      setError(err instanceof Error ? err.message : 'Failed to fetch listings');
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    isLoading,
    error,
    refetch: fetchListings,
  };
} 