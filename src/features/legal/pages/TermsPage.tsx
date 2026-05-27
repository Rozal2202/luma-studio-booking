import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export function TermsPage() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, maxWidth: 900, mx: 'auto' }}>
            <Typography variant="h1" sx={{ mb: 3 }}>
                Terms of Service
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 5 }}>
                Last updated: 2026-05-27
            </Typography>

            <Card>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={4}>
                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                1. Scope
                            </Typography>
                            <Typography color="text.secondary">
                                These terms describe the rules of using the Luma Studio
                                Booking demo application.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                2. Booking request
                            </Typography>
                            <Typography color="text.secondary">
                                Submitting a booking form creates a booking request with
                                the status “Waiting for confirmation”. A booking becomes
                                confirmed after administrator approval.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                3. Changes and cancellation
                            </Typography>
                            <Typography color="text.secondary">
                                The client can request a date change or cancel the
                                reservation through the reservation status page.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                4. Educational purpose
                            </Typography>
                            <Typography color="text.secondary">
                                This application is a prototype and does not represent a
                                real commercial service.
                            </Typography>
                        </section>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}