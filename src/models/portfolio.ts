import type { ServiceCategory } from './service';

export type PortfolioItem = {
    id: string;
    title: string;
    category: ServiceCategory;
    categoryLabel: string;
    description: string;
    visual: {
        background: string;
        alt: string;
    };
};