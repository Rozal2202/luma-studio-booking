import { useMemo } from 'react';
import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { getServices } from '../../../utils/appDataStorage';

export function ServiceDetailsPage() {
    const { serviceSlug } = useParams();

    const service = useMemo(() => {
        return getServices().find(
            (item) => item.slug === serviceSlug && (item.isActive ?? true)
        );
    }, [serviceSlug]);

    if (!service) {
        return (
            <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Service not found
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    The selected service does not exist or is currently inactive.
                </Typography>

                <Button
                    component={RouterLink}
                    to="/services"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                >
                    Back to services
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Button
                component={RouterLink}
                to="/services"
                variant="text"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 4 }}
            >
                Back to services
            </Button>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
                    gap: { xs: 5, md: 8 },
                    alignItems: 'start',
                }}
            >
                <Box
                    role="img"
                    aria-label={service.visual.label}
                    sx={{
                        minHeight: { xs: 340, md: 560 },
                        borderRadius: 4,
                        background: service.visual.background,
                        boxShadow: '0 30px 80px rgba(45, 45, 45, 0.12)',
                    }}
                />

                <Box>
                    <Chip
                        label={service.categoryLabel}
                        sx={{
                            mb: 3,
                            bgcolor: '#fed488',
                            color: '#261900',
                            fontWeight: 700,
                        }}
                    />

                    <Typography variant="h1" sx={{ mb: 3 }}>
                        {service.name}
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        {service.description}
                    </Typography>

                    <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AccessTimeIcon color="secondary" />
                            <Typography>{service.durationLabel}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PaymentsOutlinedIcon color="secondary" />
                            <Typography>{service.priceLabel}</Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h3" sx={{ mb: 2 }}>
                        What is included
                    </Typography>

                    <Stack spacing={2} sx={{ mb: 5 }}>
                        {[
                            'Individual consultation before the session',
                            'Professional studio setup and lighting',
                            'Curated photo selection',
                            'Basic retouching and online delivery',
                        ].map((item) => (
                            <Card key={item} sx={{ p: 2, boxShadow: 'none' }}>
                                <Typography>{item}</Typography>
                            </Card>
                        ))}
                    </Stack>

                    <Typography variant="h3" sx={{ mb: 2 }}>
                        Preparation tips
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 5 }}>
                        Prepare simple outfits, avoid busy patterns and bring any visual
                        references that reflect the mood you want to achieve. The studio
                        will guide you through the whole process.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            component={RouterLink}
                            to={`/booking?service=${service.slug}`}
                            variant="contained"
                        >
                            Choose this service
                        </Button>

                        <Button
                            component={RouterLink}
                            to="/portfolio"
                            variant="outlined"
                        >
                            View portfolio
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}