import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { Link as RouterLink } from 'react-router-dom';

import type { Service } from '../models/service';

type ServiceCardProps = {
    service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card
            sx={{
                height: '100%',
                overflow: 'hidden',
                bgcolor: 'background.paper',
            }}
        >
            <Box
                role="img"
                aria-label={service.visual.label}
                sx={{
                    height: 240,
                    background: service.visual.background,
                    position: 'relative',
                }}
            >
                <Chip
                    label={service.categoryLabel}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'background.paper',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                    }}
                />
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {service.name}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary' }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2">{service.durationLabel}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PaymentsOutlinedIcon fontSize="small" />
                        <Typography variant="body2">{service.priceLabel}</Typography>
                    </Stack>
                </Stack>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {service.shortDescription}
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Button
                        component={RouterLink}
                        to={`/services/${service.slug}`}
                        variant="outlined"
                        fullWidth
                    >
                        View details
                    </Button>

                    <Button
                        component={RouterLink}
                        to={`/booking?service=${service.slug}`}
                        variant="contained"
                        fullWidth
                    >
                        Book now
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}