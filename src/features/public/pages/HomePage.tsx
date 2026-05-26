import { Box, Button, Card, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

import { SectionHeader } from '../../../components/SectionHeader';
import { ServiceCard } from '../../../components/ServiceCard';
import { services } from '../../../data/services';
import { portfolioItems } from '../../../data/portfolioItems';

export function HomePage() {
    const featuredServices = services.slice(0, 3);
    const featuredPortfolio = portfolioItems.slice(0, 4);

    return (
        <Box>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
                    gap: { xs: 6, md: 10 },
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="h1" sx={{ mb: 3, maxWidth: 560 }}>
                        Book your perfect photo session online
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 520 }}
                    >
                        Choose a service, select an available date, and reserve your session
                        in a few simple steps. Professional photography tailored to your
                        story.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button component={RouterLink} to="/booking" variant="contained">
                            Book a session
                        </Button>

                        <Button component={RouterLink} to="/portfolio" variant="outlined">
                            View Portfolio
                        </Button>
                    </Stack>
                </Box>

                <Box
                    role="img"
                    aria-label="Minimal photo studio with professional lighting setup"
                    sx={{
                        minHeight: { xs: 340, md: 520 },
                        borderRadius: 4,
                        background:
                            'radial-gradient(circle at 52% 45%, #f5f3f3 0%, #747878 18%, #303031 42%, #111 100%)',
                        boxShadow: '0 30px 80px rgba(45, 45, 45, 0.12)',
                    }}
                />
            </Box>

            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <SectionHeader
                    centered
                    title="Our Services"
                    description="Elevated photography for every occasion."
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                    }}
                >
                    {featuredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </Box>
            </Box>

            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <SectionHeader
                    centered
                    title="Selected Portfolio"
                    description="A quiet collection of light, composition and authentic storytelling."
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                    }}
                >
                    {featuredPortfolio.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                minHeight: 260,
                                background: item.visual.background,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))',
                                }}
                            />

                            <Box sx={{ position: 'absolute', left: 24, bottom: 24, color: '#fff' }}>
                                <Typography variant="h4">{item.title}</Typography>
                                <Typography variant="body2">{item.categoryLabel}</Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>

                <Stack alignItems="center" sx={{ mt: 5 }}>
                    <Button
                        component={RouterLink}
                        to="/portfolio"
                        endIcon={<ArrowForwardIcon />}
                        variant="text"
                        color="secondary"
                    >
                        View more archives
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <SectionHeader
                    centered
                    title="How booking works"
                    description="A simple process created to reduce friction and keep the focus on your session."
                />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                        gap: 3,
                    }}
                >
                    {[
                        ['01', 'Choose a service'],
                        ['02', 'Pick a date'],
                        ['03', 'Fill in your details'],
                        ['04', 'Wait for confirmation'],
                    ].map(([number, title]) => (
                        <Card key={number} sx={{ p: 3 }}>
                            <Typography
                                variant="overline"
                                sx={{ color: 'secondary.main', fontWeight: 700 }}
                            >
                                {number}
                            </Typography>
                            <Typography variant="h4" sx={{ mt: 1 }}>
                                {title}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}