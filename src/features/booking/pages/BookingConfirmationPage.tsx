import { Box, Button, Card, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link as RouterLink } from 'react-router-dom';

import { StatusBadge } from '../../../components/StatusBadge';
import { formatDateTimeRange } from '../../../utils/date';
import { getLastReservation } from '../../../utils/reservationStorage';

export function BookingConfirmationPage() {
    const reservation = getLastReservation();

    if (!reservation) {
        return (
            <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    No booking found
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    We could not find your latest booking request.
                </Typography>

                <Button component={RouterLink} to="/booking" variant="contained">
                    Create booking
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                py: { xs: 8, md: 14 },
                minHeight: '70vh',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
            }}
        >
            <Box sx={{ maxWidth: 860, width: '100%' }}>
                <Box
                    sx={{
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'grid',
                        placeItems: 'center',
                        mx: 'auto',
                        mb: 5,
                        boxShadow: '0 24px 70px rgba(45, 45, 45, 0.08)',
                    }}
                >
                    <CheckIcon fontSize="large" />
                </Box>

                <Typography variant="h1" sx={{ mb: 3 }}>
                    Your booking request has been submitted
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 6 }}>
                    The studio administrator will review your booking shortly.
                </Typography>

                <Card
                    sx={{
                        p: { xs: 3, md: 4 },
                        textAlign: 'left',
                        borderLeft: '4px solid',
                        borderLeftColor: 'secondary.main',
                        mb: 6,
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{ color: 'secondary.main', fontWeight: 700 }}
                            >
                                Reservation #{reservation.id}
                            </Typography>

                            <Typography variant="h3" sx={{ mt: 1 }}>
                                {reservation.service.name}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ mt: 2, color: 'text.secondary' }}
                            >
                                <CalendarMonthIcon fontSize="small" />
                                <Typography>
                                    {formatDateTimeRange(
                                        reservation.slot.startAt,
                                        reservation.slot.endAt
                                    )}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box>
                            <StatusBadge status={reservation.status} />
                        </Box>
                    </Stack>
                </Card>

                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={2}>
                    <Button
                        component={RouterLink}
                        to="/reservation-status"
                        variant="contained"
                    >
                        Check status
                    </Button>

                    <Button component={RouterLink} to="/" variant="outlined">
                        Back to home
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}