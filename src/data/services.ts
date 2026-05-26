import type { Service } from '../models/service';

export const services: Service[] = [
    {
        id: 'service-portrait',
        slug: 'portrait-session',
        name: 'Portrait Session',
        category: 'portrait',
        categoryLabel: 'Portrait',
        shortDescription:
            'A personalized session focused on capturing your unique character in a minimalist, timeless style.',
        description:
            'Individual portrait session designed for personal branding, creative portfolios and elegant studio imagery.',
        durationLabel: '90 mins',
        priceLabel: '500 PLN',
        visual: {
            label: 'Portrait lighting study',
            background:
                'linear-gradient(135deg, #111 0%, #2d2d2d 45%, #c8c6c6 46%, #f5f3f3 100%)',
        },
    },
    {
        id: 'service-family',
        slug: 'family-session',
        name: 'Family Session',
        category: 'family',
        categoryLabel: 'Family',
        shortDescription:
            'Documenting authentic connections and genuine moments in a relaxed, natural environment.',
        description:
            'Warm and emotional family photography focused on connection, natural gestures and timeless memories.',
        durationLabel: '120 mins',
        priceLabel: '750 PLN',
        visual: {
            label: 'Warm family sunset',
            background:
                'linear-gradient(135deg, #fed488 0%, #c58f2c 38%, #f5f3f3 39%, #8a6a33 100%)',
        },
    },
    {
        id: 'service-business',
        slug: 'business-headshots',
        name: 'Business Headshots',
        category: 'business',
        categoryLabel: 'Business',
        shortDescription:
            'Polished and professional imagery designed to elevate your personal brand and corporate identity.',
        description:
            'Professional headshots for CV, LinkedIn, company websites and modern business communication.',
        durationLabel: '45 mins',
        priceLabel: '400 PLN',
        visual: {
            label: 'Business editorial portrait',
            background:
                'linear-gradient(135deg, #1b1c1c 0%, #303031 45%, #e4e2e2 46%, #775a19 100%)',
        },
    },
    {
        id: 'service-product',
        slug: 'product-photography',
        name: 'Product Photography',
        category: 'product',
        categoryLabel: 'Product',
        shortDescription:
            'Striking, detailed images that showcase your products with premium lighting and composition.',
        description:
            'Commercial product photography for e-commerce, campaigns, social media and brand materials.',
        durationLabel: 'Half Day',
        priceLabel: 'from 1200 PLN',
        visual: {
            label: 'Product spotlight',
            background:
                'radial-gradient(circle at 70% 40%, #f5f3f3 0%, #c8c6c6 18%, #303031 45%, #111 100%)',
        },
    },
    {
        id: 'service-event',
        slug: 'event-photography',
        name: 'Event Photography',
        category: 'event',
        categoryLabel: 'Event',
        shortDescription:
            'Unobtrusive coverage of your important events, delivering a curated narrative of the occasion.',
        description:
            'Editorial-style event photography for corporate events, workshops, conferences and private celebrations.',
        durationLabel: 'Per Hour',
        priceLabel: '350 PLN',
        visual: {
            label: 'Editorial event scene',
            background:
                'linear-gradient(135deg, #e4e2e2 0%, #747878 40%, #1b1c1c 41%, #303031 100%)',
        },
    },
    {
        id: 'service-lifestyle',
        slug: 'lifestyle-session',
        name: 'Lifestyle Session',
        category: 'lifestyle',
        categoryLabel: 'Lifestyle',
        shortDescription:
            'Story-driven sessions that capture the essence of your brand or personal life in a cinematic way.',
        description:
            'Lifestyle photography for creators, entrepreneurs and individuals who need natural but polished imagery.',
        durationLabel: '120 mins',
        priceLabel: '800 PLN',
        visual: {
            label: 'Lifestyle studio moment',
            background:
                'linear-gradient(135deg, #f5f3f3 0%, #dbdad9 35%, #444748 36%, #171917 100%)',
        },
    },
];