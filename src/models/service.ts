export type ServiceCategory =
    | 'portrait'
    | 'family'
    | 'business'
    | 'product'
    | 'event'
    | 'lifestyle';

export type Service = {
    id: string;
    slug: string;
    name: string;
    category: ServiceCategory;
    categoryLabel: string;
    shortDescription: string;
    description: string;
    durationLabel: string;
    priceLabel: string;
    visual: {
        background: string;
        label: string;
    };
};