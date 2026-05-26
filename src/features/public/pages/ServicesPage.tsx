import { useMemo, useState } from 'react';
import { Box } from '@mui/material';

import {
    CategoryFilters,
    type CategoryFilterOption,
} from '../../../components/CategoryFilters';
import { SectionHeader } from '../../../components/SectionHeader';
import { ServiceCard } from '../../../components/ServiceCard';
import { services } from '../../../data/services';
import type { ServiceCategory } from '../../../models/service';

type ServicesFilter = 'all' | ServiceCategory;

const filterOptions: CategoryFilterOption<ServicesFilter>[] = [
    { value: 'all', label: 'All' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'family', label: 'Family' },
    { value: 'business', label: 'Business' },
    { value: 'product', label: 'Product' },
    { value: 'event', label: 'Event' },
];

export function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState<ServicesFilter>('all');

    const filteredServices = useMemo(() => {
        if (selectedCategory === 'all') {
            return services;
        }

        return services.filter((service) => service.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <SectionHeader
                centered
                title="Photography Services"
                description="Elevate your visual storytelling with our tailored photography sessions. From intimate portraits to compelling product imagery, we provide a sophisticated approach to capturing your essence."
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
                {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </Box>
        </Box>
    );
}