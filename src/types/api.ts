export interface AuthResponse {
  access: string;
  refresh: string;
}

export type ListingType = 'sublease' | '3PL';
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Image {
  id: string;
  image_url: string;
}

export interface BaseListing {
  id: string;
  ListingName: string;
  listing_type: ListingType;
  currency: Currency;
  available_square_footage: string;
  images: Image[];
}

export interface SubleaseListing extends BaseListing {
  listing_type: 'sublease';
  sublease_per_sqft_price: string;
  sublease_minimum_lease_period: number;
}

export interface ThreePLListing extends BaseListing {
  listing_type: '3PL';
  price: string;
  price_per_standard_pallet_stackable_per_month?: string;
  price_per_standard_pallet_non_stackable_per_month?: string;
  price_per_inbound_pallet?: string;
  pick_and_pack_price?: string;
}

export type Listing = SubleaseListing | ThreePLListing;

export interface SortCriteria {
  field: 'price' | 'size';
  direction: 'asc' | 'desc';
}

export interface ListingFiltersProps {
  listingType: ListingType;
  onSortChange: (sort: SortCriteria) => void;
}

export interface ListingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Listing[];
}

export interface ApiErrorResponse {
  detail: string;
  status_code: number;
} 