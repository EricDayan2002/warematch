'use client';

import { useListings } from '@/hooks/useListings';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';

export function ListingsSection() {
  const { listings, isLoading, error, refreshListings } = useListings();

  const subleaseListings = listings.filter(listing => listing.listing_type === 'sublease');
  const threePLListings = listings.filter(listing => listing.listing_type === '3pl');

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-red-800 font-semibold mb-2">Error Loading Listings</h2>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={refreshListings}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sublease Listings ({subleaseListings.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subleaseListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3PL Listings ({threePLListings.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {threePLListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
} 