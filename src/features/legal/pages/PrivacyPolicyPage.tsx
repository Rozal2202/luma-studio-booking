import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export function PrivacyPolicyPage() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, maxWidth: 900, mx: 'auto' }}>
            <Typography variant="h1" sx={{ mb: 3 }}>
                Privacy Policy
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 5 }}>
                Last updated: 2026-05-27
            </Typography>

            <Card>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={4}>
                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                1. Data controller
                            </Typography>
                            <Typography color="text.secondary">
                                The controller of personal data processed in this demo
                                application is Luma Studio. The application is a prototype
                                created for educational and portfolio purposes.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                2. Processed data
                            </Typography>
                            <Typography color="text.secondary">
                                The booking form processes basic contact data: first name,
                                last name, email address, phone number, selected service,
                                selected booking slot and optional message.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                3. Purpose of processing
                            </Typography>
                            <Typography color="text.secondary">
                                Data is processed to create and manage photography session
                                reservations, contact the client and present reservation
                                status.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                4. Demo storage
                            </Typography>
                            <Typography color="text.secondary">
                                In this prototype, data is stored locally in the browser
                                using localStorage. No real backend server or production
                                database is used.
                            </Typography>
                        </section>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}