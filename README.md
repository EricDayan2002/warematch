# WareMatch

## Prerequisites
- Node.js 18.17 or later
- npm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/warematch.git
cd warematch
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Technical Implementation

### Code Quality & Structure
- **Modular Architecture**: Components are organized by feature and responsibility
- **Clean Code Practices**: Consistent naming conventions and code formatting
- **Reusable Components**: Shared UI components in `src/components/ui`
- **Custom Hooks**: Abstracted complex logic into reusable hooks in `src/hooks`

### TypeScript Implementation
- **Strong Type Definitions**: 
```typescript
// Example of discriminated union for listing types
type ListingType = 'sublease' | '3PL';

interface BaseListing {
  id: string;
  listingType: ListingType;
  price: number;
}

interface SubleaseListing extends BaseListing {
  listingType: 'sublease';
  squareFootage: number;
  pricePerSqft: number;
}
```
- **Type Guards**: Implemented for safe type narrowing
- **Generic Components**: Reusable components with type parameters
- **Strict Type Checking**: Enabled strict TypeScript configuration

### UI/UX Implementation
- **ShadCN Components**: Utilized modern UI components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: Implemented with next-themes
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: User-friendly error messages

### API Integration
```typescript
// Example of API call with error handling
const useListings = () => {
  const { data, error, isLoading } = useSWR<Listing[]>('/api/listings', fetcher);
  
  if (error) {
    // Error handling with user feedback
    toast.error('Failed to load listings');
  }

  return {
    listings: data,
    isLoading,
    error
  };
};
```

### Problem-Solving Approaches

#### 1. State Management
**Challenge**: Complex sorting and filtering states
**Solution**: 
- Implemented custom hooks for state logic
- Used TypeScript for type-safe state management
- Maintained separate states for different listing types

#### 2. Type Safety
**Challenge**: Handling different listing types and calculations
**Solution**: 
- Created discriminated unions
- Implemented type guards
- Used generic types for reusable components

#### 3. Performance
**Challenge**: Optimizing for large datasets
**Solution**: 
- Implemented efficient sorting algorithms
- Used proper React rendering optimizations
- Optimized image loading with Next.js

#### 4. User Experience
**Challenge**: Creating intuitive sorting interface
**Solution**: 
- Clear visual feedback for active sorts
- Smooth transitions between states
- Consistent error handling


