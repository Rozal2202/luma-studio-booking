import { useMemo } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { Link as RouterLink } from 'react-router-dom';

import { StatusBadge } from '../../../components/StatusBadge';
import { getReservations } from '../../../utils/reservationStorage';
import { formatDateTimeRange } from '../../../utils/date';
import { AdminStatCard } from '../components/AdminStatCard';

export function AdminDashboardPage() {
    const reservations = useMemo(() => getReservations(), []);

    const newReservations = reservations.filter(
        (reservation) => reservation.status === 'new'
    );

    const confirmedReservations = reservations.filter(
        (reservation) => reservation.status === 'confirmed'
    );

    const upcomingReservations = reservations
        .filter(
            (reservation) =>
                reservation.status === 'new' || reservation.status === 'confirmed'
        )
        .slice(0, 5);

    const mostPopularService = useMemo(() => {
        const counts = reservations.reduce<Record<string, number>>((acc, reservation) => {
            acc[reservation.service.name] = (acc[reservation.service.name] ?? 0) + 1;
            return acc;
        }, {});

        const [serviceName] =
        Object.entries(counts).sort((a, b) => b[1] - a[1])[0] ?? [];

        return serviceName ?? 'No data';
    }, [reservations]);

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                spacing={3}
                sx={{ mb: 5 }}
            >
                <Box>
                    <Typography variant="h1" sx={{ mb: 1 }}>
                        Overview
                    </Typography>

                    <Typography color="text.secondary">
                        Here&apos;s what&apos;s happening at Luma Studio today.
                    </Typography>
                </Box>

                <Button component={RouterLink} to="/booking" variant="contained">
                    Create test booking
                </Button>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                    gap: 3,
                    mb: 5,
                }}
            >
                <AdminStatCard
                    title="New reservations"
                    value={newReservations.length}
                    description="Waiting for confirmation"
                    icon={<PendingActionsIcon />}
                />

                <AdminStatCard
                    title="Confirmed"
                    value={confirmedReservations.length}
                    description="Ready for upcoming sessions"
                    icon={<CheckCircleIcon />}
                />

                <AdminStatCard
                    title="Total bookings"
                    value={reservations.length}
                    description="Saved in local storage"
                    icon={<CalendarMonthIcon />}
                />

                <AdminStatCard
                    title="Most popular"
                    value={mostPopularService}
                    description="Based on current reservations"
                    icon={<PhotoCameraOutlinedIcon />}
                />
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1.4fr 0.8fr' },
                    gap: 3,
                }}
            >
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 3 }}
                        >
                            <Box>
                                <Typography variant="h3">Upcoming sessions</Typography>
                                <Typography color="text.secondary">
                                    Latest active reservations.
                                </Typography>
                            </Box>

                            <Button
                                component={RouterLink}
                                to="/admin/reservations"
                                variant="outlined"
                            >
                                View all
                            </Button>
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        {upcomingReservations.length === 0 ? (
                            <Typography color="text.secondary">
                                No reservations yet. Create a booking from the public booking page.
                            </Typography>
                        ) : (
                            <Stack spacing={2}>
                                {upcomingReservations.map((reservation) => (
                                    <Card key={reservation.id} sx={{ p: 2, boxShadow: 'none' }}>
                                        <Stack
                                            direction={{ xs: 'column', md: 'row' }}
                                            justifyContent="space-between"
                                            spacing={2}
                                        >
                                            <Box>
                                                <Typography fontWeight={700}>
                                                    {reservation.customer.firstName}{' '}
                                                    {reservation.customer.lastName}
                                                </Typography>

                                                <Typography color="text.secondary">
                                                    {reservation.service.name}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    {formatDateTimeRange(
                                                        reservation.slot.startAt,
                                                        reservation.slot.endAt
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                                                <StatusBadge status={reservation.status} />
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    #{reservation.id}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Card>
                                ))}
                            </Stack>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h3" sx={{ mb: 1 }}>
                            Status summary
                        </Typography>

                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            Current reservation distribution.
                        </Typography>

                        <Stack spacing={2}>
                            {[
                                ['New', newReservations.length],
                                ['Confirmed', confirmedReservations.length],
                                [
                                    'Cancelled',
                                    reservations.filter((reservation) => reservation.status === 'cancelled')
                                        .length,
                                ],
                                [
                                    'Completed',
                                    reservations.filter((reservation) => reservation.status === 'completed')
                                        .length,
                                ],
                            ].map(([label, value]) => (
                                <Stack
                                    key={label}
                                    direction="row"
                                    justifyContent="space-between"
                                    sx={{
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        pb: 1.5,
                                    }}
                                >
                                    <Typography color="text.secondary">{label}</Typography>
                                    <Typography fontWeight={700}>{value}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}