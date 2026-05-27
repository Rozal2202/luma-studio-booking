import { useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { StatusBadge } from '../../../components/StatusBadge';
import type { Reservation } from '../../../models/reservation';
import { formatDateTimeRange } from '../../../utils/date';
import {
    getLastReservation,
    getReservationById,
    updateReservationStatus,
} from '../../../utils/reservationStorage';
import { ReservationTimeline } from '../components/ReservationTimeline';

export function ReservationStatusPage() {
    const lastReservation = useMemo(() => getLastReservation(), []);

    const [reservationId, setReservationId] = useState(lastReservation?.id ?? '');
    const [reservation, setReservation] = useState<Reservation | null>(
        lastReservation
    );
    const [errorMessage, setErrorMessage] = useState('');

    function handleSearch() {
        const foundReservation = getReservationById(reservationId);

        if (!foundReservation) {
            setReservation(null);
            setErrorMessage(
                'Reservation not found. Check the number and try again, for example LMA-1234.'
            );
            return;
        }

        setReservation(foundReservation);
        setErrorMessage('');
    }

    function handleStatusChange(status: 'cancelled' | 'reschedule_requested') {
        if (!reservation) {
            return;
        }

        const updatedReservation = updateReservationStatus(reservation.id, status);

        if (updatedReservation) {
            setReservation(updatedReservation);
            setErrorMessage('');
        }
    }

    const isReservationActive =
        reservation?.status === 'new' ||
        reservation?.status === 'confirmed' ||
        reservation?.status === 'reschedule_requested';

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Reservation Status
                </Typography>

                <Typography color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
                    Enter your reservation number to check the current status of your
                    upcoming photo session.
                </Typography>
            </Box>

            <Card sx={{ maxWidth: 960, mx: 'auto', mb: 4 }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Reservation number"
                            placeholder="LMA-1234"
                            value={reservationId}
                            onChange={(event) => setReservationId(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />

                        <Button variant="contained" onClick={handleSearch}>
                            Check status
                        </Button>
                    </Stack>

                    {lastReservation ? (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Latest reservation in this browser: <strong>{lastReservation.id}</strong>
                        </Typography>
                    ) : null}
                </CardContent>
            </Card>

            {errorMessage ? (
                <Alert severity="error" sx={{ maxWidth: 960, mx: 'auto', mb: 4 }}>
                    {errorMessage}
                </Alert>
            ) : null}

            {reservation ? (
                <Card sx={{ maxWidth: 960, mx: 'auto' }}>
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent="space-between"
                            spacing={3}
                            sx={{ mb: 4 }}
                        >
                            <Box>
                                <Typography
                                    variant="overline"
                                    sx={{ color: 'secondary.main', fontWeight: 700 }}
                                >
                                    Reservation #{reservation.id}
                                </Typography>

                                <Typography variant="h2" sx={{ mt: 1, mb: 1 }}>
                                    {reservation.service.name}
                                </Typography>

                                <Typography color="text.secondary">
                                    {reservation.service.durationLabel} •{' '}
                                    {reservation.service.priceLabel}
                                </Typography>
                            </Box>

                            <Box>
                                <StatusBadge status={reservation.status} />
                            </Box>
                        </Stack>

                        <Divider sx={{ mb: 4 }} />

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                gap: 3,
                                mb: 5,
                            }}
                        >
                            <Card sx={{ p: 3, boxShadow: 'none' }}>
                                <Stack direction="row" spacing={2}>
                                    <CalendarMonthIcon color="secondary" />
                                    <Box>
                                        <Typography fontWeight={600}>Date and time</Typography>
                                        <Typography color="text.secondary">
                                            {formatDateTimeRange(
                                                reservation.slot.startAt,
                                                reservation.slot.endAt
                                            )}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>

                            <Card sx={{ p: 3, boxShadow: 'none' }}>
                                <Stack direction="row" spacing={2}>
                                    <PersonOutlineOutlinedIcon color="secondary" />
                                    <Box>
                                        <Typography fontWeight={600}>Client</Typography>
                                        <Typography color="text.secondary">
                                            {reservation.customer.firstName}{' '}
                                            {reservation.customer.lastName}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>

                            <Card sx={{ p: 3, boxShadow: 'none' }}>
                                <Stack direction="row" spacing={2}>
                                    <EmailOutlinedIcon color="secondary" />
                                    <Box>
                                        <Typography fontWeight={600}>Email</Typography>
                                        <Typography color="text.secondary">
                                            {reservation.customer.email}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>

                            <Card sx={{ p: 3, boxShadow: 'none' }}>
                                <Stack direction="row" spacing={2}>
                                    <LocalPhoneOutlinedIcon color="secondary" />
                                    <Box>
                                        <Typography fontWeight={600}>Phone</Typography>
                                        <Typography color="text.secondary">
                                            {reservation.customer.phone}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>
                        </Box>

                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h3" sx={{ mb: 3 }}>
                                Progress
                            </Typography>

                            <ReservationTimeline status={reservation.status} />
                        </Box>

                        {reservation.message ? (
                            <Box sx={{ mb: 5 }}>
                                <Typography variant="h4" sx={{ mb: 1 }}>
                                    Message
                                </Typography>

                                <Typography color="text.secondary">{reservation.message}</Typography>
                            </Box>
                        ) : null}

                        <Divider sx={{ mb: 4 }} />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="outlined"
                                disabled={!isReservationActive || reservation.status === 'cancelled'}
                                onClick={() => handleStatusChange('reschedule_requested')}
                            >
                                Request date change
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                disabled={!isReservationActive || reservation.status === 'cancelled'}
                                onClick={() => handleStatusChange('cancelled')}
                            >
                                Cancel reservation
                            </Button>

                            <Button variant="text" color="secondary" href="mailto:hello@luma.studio">
                                Contact studio
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            ) : null}
        </Box>
    );
}