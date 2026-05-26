import { useMemo, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';

import {
    CategoryFilters,
    type CategoryFilterOption,
} from '../../../components/CategoryFilters';
import { SectionHeader } from '../../../components/SectionHeader';
import { portfolioItems } from '../../../data/portfolioItems';
import type { ServiceCategory } from '../../../models/service';

type PortfolioFilter = 'all' | ServiceCategory;

const filterOptions: CategoryFilterOption<PortfolioFilter>[] = [
    { value: 'all', label: 'All Work' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'family', label: 'Family' },
    { value: 'business', label: 'Business' },
    { value: 'product', label: 'Product' },
    { value: 'event', label: 'Event' },
];

export function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState<PortfolioFilter>('all');

    const filteredItems = useMemo(() => {
        if (selectedCategory === 'all') {
            return portfolioItems;
        }

        return portfolioItems.filter((item) => item.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <SectionHeader
                centered
                title="Portfolio"
                description="A curated selection of our finest work. Every frame is a testament to our dedication to light, composition, and authentic storytelling."
            />

            <CategoryFilters
                options={filterOptions}
                selected={selectedCategory}
                onChange={setSelectedCategory}
            />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 3,
                }}
            >
                {filteredItems.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            minHeight: 360,
                            position: 'relative',
                            overflow: 'hidden',
                            background: item.visual.background,
                            cursor: 'pointer',
                            '&:hover .portfolioOverlay': {
                                opacity: 1,
                            },
                        }}
                        role="img"
                        aria-label={item.visual.alt}
                    >
                        <Box
                            className="portfolioOverlay"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                p: 3,
                                color: '#fff',
                                opacity: { xs: 1, md: 0 },
                                transition: 'opacity 180ms ease',
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.08))',
                            }}
                        >
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {item.categoryLabel}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, maxWidth: 320 }}>
                                {item.description}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}