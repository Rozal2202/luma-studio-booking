import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export function CookiesPage() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, maxWidth: 900, mx: 'auto' }}>
            <Typography variant="h1" sx={{ mb: 3 }}>
                Cookie Policy
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 5 }}>
                Last updated: 2026-05-27
            </Typography>

            <Card>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={4}>
                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                1. Cookies
                            </Typography>
                            <Typography color="text.secondary">
                                This demo application does not use tracking cookies or
                                marketing analytics.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                2. Local storage
                            </Typography>
                            <Typography color="text.secondary">
                                The application uses browser localStorage to store demo
                                services, portfolio items, booking slots and reservations.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                3. Resetting data
                            </Typography>
                            <Typography color="text.secondary">
                                Demo data can be reset from the admin settings page or by
                                clearing browser storage manually.
                            </Typography>
                        </section>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}