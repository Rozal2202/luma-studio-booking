import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Drawer,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

import { StatusBadge } from '../../../components/StatusBadge';
import type { Reservation, ReservationStatus } from '../../../models/reservation';
import { formatDateTimeRange } from '../../../utils/date';
import {
    getReservations,
    updateReservationStatus,
} from '../../../utils/reservationStorage';
import {
    reservationStatusLabels,
    reservationStatusOptions,
} from '../../../utils/reservationStatus';

type StatusFilter = 'all' | ReservationStatus;

export function AdminReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>(() =>
        getReservations()
    );
    const [selectedReservation, setSelectedReservation] =
        useState<Reservation | null>(null);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [searchValue, setSearchValue] = useState('');

    const filteredReservations = useMemo(() => {
        return reservations.filter((reservation) => {
            const matchesStatus =
                statusFilter === 'all' || reservation.status === statusFilter;

            const searchPhrase = searchValue.trim().toLowerCase();

            const matchesSearch =
                searchPhrase.length === 0 ||
                `${reservation.customer.firstName} ${reservation.customer.lastName}`
                    .toLowerCase()
                    .includes(searchPhrase) ||
                reservation.customer.email.toLowerCase().includes(searchPhrase) ||
                reservation.id.toLowerCase().includes(searchPhrase) ||
                reservation.service.name.toLowerCase().includes(searchPhrase);

            return matchesStatus && matchesSearch;
        });
    }, [reservations, searchValue, statusFilter]);

    function handleChangeStatus(
        reservation: Reservation,
        status: ReservationStatus
    ) {
        const updatedReservation = updateReservationStatus(reservation.id, status);

        if (!updatedReservation) {
            return;
        }

        setReservations((currentReservations) =>
            currentReservations.map((currentReservation) =>
                currentReservation.id === reservation.id
                    ? updatedReservation
                    : currentReservation
            )
        );

        setSelectedReservation(updatedReservation);
    }

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
                        Reservations
                    </Typography>

                    <Typography color="text.secondary">
                        Manage incoming bookings, studio sessions and client schedules.
                    </Typography>
                </Box>
            </Stack>

            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            label="Search"
                            placeholder="Client, email, service or reservation number"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />

                        <TextField
                            select
                            label="Status"
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value as StatusFilter)
                            }
                            sx={{ minWidth: { xs: '100%', md: 260 } }}
                        >
                            <MenuItem value="all">All statuses</MenuItem>

                            {reservationStatusOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {reservationStatusLabels[status]}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </CardContent>
            </Card>

            <Card>
                <CardContent sx={{ p: 0 }}>
                    {filteredReservations.length === 0 ? (
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                No reservations found
                            </Typography>

                            <Typography color="text.secondary">
                                Create a reservation from the public booking page or change filters.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ overflowX: 'auto' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Client</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {filteredReservations.map((reservation) => (
                                        <TableRow key={reservation.id} hover>
                                            <TableCell>
                                                <Typography fontWeight={700}>
                                                    {reservation.customer.firstName}{' '}
                                                    {reservation.customer.lastName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {reservation.customer.email}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    #{reservation.id}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>{reservation.service.name}</TableCell>

                                            <TableCell>
                                                {formatDateTimeRange(
                                                    reservation.slot.startAt,
                                                    reservation.slot.endAt
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <StatusBadge status={reservation.status} />
                                            </TableCell>

                                            <TableCell>
                                                {new Intl.DateTimeFormat('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                }).format(new Date(reservation.createdAt))}
                                            </TableCell>

                                            <TableCell align="right">
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    justifyContent="flex-end"
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => setSelectedReservation(reservation)}
                                                    >
                                                        View
                                                    </Button>

                                                    {reservation.status === 'new' ? (
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleChangeStatus(reservation, 'confirmed')
                                                            }
                                                        >
                                                            Confirm
                                                        </Button>
                                                    ) : null}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <Drawer
                anchor="right"
                open={Boolean(selectedReservation)}
                onClose={() => setSelectedReservation(null)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 520 },
                        p: 3,
                        bgcolor: 'background.default',
                    },
                }}
            >
                {selectedReservation ? (
                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                            sx={{ mb: 3 }}
                        >
                            <Box>
                                <Typography variant="overline" color="secondary">
                                    Reservation #{selectedReservation.id}
                                </Typography>

                                <Typography variant="h3" sx={{ mt: 1 }}>
                                    {selectedReservation.service.name}
                                </Typography>
                            </Box>

                            <StatusBadge status={selectedReservation.status} />
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <Box>
                                <Typography fontWeight={700}>Client</Typography>
                                <Typography color="text.secondary">
                                    {selectedReservation.customer.firstName}{' '}
                                    {selectedReservation.customer.lastName}
                                </Typography>
                                <Typography color="text.secondary">
                                    {selectedReservation.customer.email}
                                </Typography>
                                <Typography color="text.secondary">
                                    {selectedReservation.customer.phone}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography fontWeight={700}>Date and time</Typography>
                                <Typography color="text.secondary">
                                    {formatDateTimeRange(
                                        selectedReservation.slot.startAt,
                                        selectedReservation.slot.endAt
                                    )}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography fontWeight={700}>Message</Typography>
                                <Typography color="text.secondary">
                                    {selectedReservation.message || 'No additional message.'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography fontWeight={700}>Consents</Typography>
                                <Typography color="text.secondary">
                                    Terms accepted:{' '}
                                    {selectedReservation.acceptTerms ? 'yes' : 'no'}
                                </Typography>
                                <Typography color="text.secondary">
                                    Marketing consent:{' '}
                                    {selectedReservation.marketingConsent ? 'yes' : 'no'}
                                </Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    Change status
                                </Typography>

                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    <Button
                                        variant="contained"
                                        disabled={selectedReservation.status === 'confirmed'}
                                        onClick={() =>
                                            handleChangeStatus(selectedReservation, 'confirmed')
                                        }
                                    >
                                        Confirm
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        disabled={selectedReservation.status === 'rejected'}
                                        onClick={() =>
                                            handleChangeStatus(selectedReservation, 'rejected')
                                        }
                                    >
                                        Reject
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        disabled={selectedReservation.status === 'completed'}
                                        onClick={() =>
                                            handleChangeStatus(selectedReservation, 'completed')
                                        }
                                    >
                                        Mark completed
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        disabled={selectedReservation.status === 'settled'}
                                        onClick={() =>
                                            handleChangeStatus(selectedReservation, 'settled')
                                        }
                                    >
                                        Settle
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        disabled={selectedReservation.status === 'cancelled'}
                                        onClick={() =>
                                            handleChangeStatus(selectedReservation, 'cancelled')
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                ) : null}
            </Drawer>
        </Box>
    );
}