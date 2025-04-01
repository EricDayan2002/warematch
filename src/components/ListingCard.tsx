import { Listing, SubleaseListing, ThreePLListing } from '@/types/api';
import { DollarSign, Ruler } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = listing.images.length > 0 
    ? listing.images 
    : [{ id: 'placeholder', image_url: '/placeholder-image.jpg' }];

  // Type guard to check if listing is a SubleaseListing
  const isSublease = (listing: Listing): listing is SubleaseListing => 
    listing.listing_type === 'sublease';

  // Calculate price based on listing type
  const displayPrice = isSublease(listing)
    ? (parseFloat(listing.available_square_footage) * parseFloat(listing.sublease_per_sqft_price)).toFixed(2)
    : listing.price;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-blue-50 dark:bg-blue-950 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={images[selectedImage].image_url}
          alt={listing.ListingName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={selectedImage === 0}
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isSublease(listing)
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
          }`}>
            {isSublease(listing) ? 'Sublease' : '3PL'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {listing.ListingName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{displayPrice} {listing.currency}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{listing.available_square_footage} sq ft</span>
          </div>
        </div>
        {isSublease(listing) ? (
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Price per sqft:</span>
              <span className="font-medium">{listing.sublease_per_sqft_price} {listing.currency}/sqft</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Lease Period:</span>
              <span className="font-medium">{listing.sublease_minimum_lease_period} months</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {listing.price_per_standard_pallet_stackable_per_month && (
              <div className="flex justify-between">
                <span>Stackable Pallets:</span>
                <span className="font-medium">{listing.price_per_standard_pallet_stackable_per_month} {listing.currency}/month</span>
              </div>
            )}
            {listing.price_per_standard_pallet_non_stackable_per_month && (
              <div className="flex justify-between">
                <span>Non-Stackable Pallets:</span>
                <span className="font-medium">{listing.price_per_standard_pallet_non_stackable_per_month} {listing.currency}/month</span>
              </div>
            )}
            {listing.price_per_inbound_pallet && (
              <div className="flex justify-between">
                <span>Inbound/Outbound:</span>
                <span className="font-medium">{listing.price_per_inbound_pallet} {listing.currency}/pallet</span>
              </div>
            )}
            {listing.pick_and_pack_price && (
              <div className="flex justify-between">
                <span>Pick & Pack:</span>
                <span className="font-medium">{listing.pick_and_pack_price} {listing.currency}/box</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 