import type { PortfolioItem } from '../models/portfolio';

export const portfolioItems: PortfolioItem[] = [
    {
        id: 'portfolio-portrait-1',
        title: 'Studio Portrait',
        category: 'portrait',
        categoryLabel: 'Portrait',
        description: 'Minimal studio portrait with soft editorial lighting.',
        visual: {
            alt: 'Minimalist studio portrait with soft lighting',
            background:
                'radial-gradient(circle at 35% 35%, #e4e2e2 0%, #747878 26%, #303031 52%, #111 100%)',
        },
    },
    {
        id: 'portfolio-family-1',
        title: 'Golden Family Story',
        category: 'family',
        categoryLabel: 'Family',
        description: 'Warm outdoor family story captured during golden hour.',
        visual: {
            alt: 'Family photography scene during sunset',
            background:
                'linear-gradient(135deg, #fed488 0%, #c58f2c 36%, #775a19 62%, #303031 100%)',
        },
    },
    {
        id: 'portfolio-business-1',
        title: 'Corporate Profile',
        category: 'business',
        categoryLabel: 'Business',
        description: 'Clean business profile imagery for a modern professional.',
        visual: {
            alt: 'Business portrait in a minimal studio setup',
            background:
                'linear-gradient(135deg, #111 0%, #303031 45%, #e4e2e2 46%, #f5f3f3 100%)',
        },
    },
    {
        id: 'portfolio-product-1',
        title: 'Luxury Product Detail',
        category: 'product',
        categoryLabel: 'Product',
        description: 'Premium product image with controlled light and shadow.',
        visual: {
            alt: 'Luxury product photography with dark background',
            background:
                'radial-gradient(circle at 50% 45%, #fed488 0%, #775a19 18%, #303031 45%, #111 100%)',
        },
    },
    {
        id: 'portfolio-event-1',
        title: 'Editorial Event',
        category: 'event',
        categoryLabel: 'Event',
        description: 'Curated event coverage with cinematic composition.',
        visual: {
            alt: 'Editorial event photography scene',
            background:
                'linear-gradient(135deg, #dbdad9 0%, #747878 32%, #303031 33%, #1b1c1c 100%)',
        },
    },
    {
        id: 'portfolio-product-2',
        title: 'Fragrance Campaign',
        category: 'product',
        categoryLabel: 'Product',
        description: 'Campaign-style product image built around light and texture.',
        visual: {
            alt: 'Fragrance bottle product photography concept',
            background:
                'radial-gradient(circle at 72% 35%, #f5f3f3 0%, #fed488 20%, #775a19 34%, #111 68%)',
        },
    },
];