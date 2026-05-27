import type { ServiceCategory } from './service';

export type PortfolioItem = {
    id: string;
    title: string;
    category: ServiceCategory;
    categoryLabel: string;
    description: string;
    isVisible?: boolean;
    displayOrder?: number;
    visual: {
        background: string;
        alt: string;
    };
};