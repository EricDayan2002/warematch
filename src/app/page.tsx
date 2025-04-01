'use client';

import { useListings } from '@/hooks/useListings';
import { ListingCard } from '@/components/ListingCard';
import { ListingFilters } from '@/components/ListingFilters';
import { useState } from 'react';
import { SortCriteria } from '@/types/api';

export default function Home() {
	const { listings, isLoading, error, refetch } = useListings();
	const [subleaseSort, setSubleaseSort] = useState<SortCriteria>({
		field: 'price',
		direction: 'asc',
	});
	const [threePLSort, setThreePLSort] = useState<SortCriteria>({
		field: 'price',
		direction: 'asc',
	});

	const sortListings = (listings: any[], sort: SortCriteria) => {
		return [...listings].sort((a, b) => {
			let valueA: number;
			let valueB: number;

			if (sort.field === 'price') {
				valueA = a.listing_type === 'sublease'
					? parseFloat(a.available_square_footage) * parseFloat(a.sublease_per_sqft_price)
					: a.price;
				valueB = b.listing_type === 'sublease'
					? parseFloat(b.available_square_footage) * parseFloat(b.sublease_per_sqft_price)
					: b.price;
			} else {
				valueA = parseFloat(a.available_square_footage);
				valueB = parseFloat(b.available_square_footage);
			}

			return sort.direction === 'asc' ? valueA - valueB : valueB - valueA;
		});
	};

	const subleaseListings = listings?.filter(listing => listing.listing_type === 'sublease') || [];
	const threePLListings = listings?.filter(listing => listing.listing_type === '3PL') || [];

	const sortedSubleaseListings = sortListings(subleaseListings, subleaseSort);
	const sortedThreePLListings = sortListings(threePLListings, threePLSort);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-4">
				<p className="text-red-500 mb-4 text-center">Error loading listings. Please try again.</p>
				<button
					onClick={refetch}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8 max-w-7xl">
			<h1 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-100">Available Listings</h1>
			
			{/* Sublease Listings Section */}
			<section className="mb-12">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
						Sublease Listings ({sortedSubleaseListings.length})
					</h2>
					<ListingFilters
						listingType="sublease"
						onSortChange={setSubleaseSort}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedSubleaseListings.map(listing => (
						<ListingCard key={listing.id} listing={listing} />
					))}
				</div>
			</section>

			{/* 3PL Listings Section */}
			<section>
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
						3PL Listings ({sortedThreePLListings.length})
					</h2>
					<ListingFilters
						listingType="3PL"
						onSortChange={setThreePLSort}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedThreePLListings.map(listing => (
						<ListingCard key={listing.id} listing={listing} />
					))}
				</div>
			</section>
		</main>
	);
}
