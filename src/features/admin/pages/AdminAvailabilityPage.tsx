import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import type { AvailabilitySlot } from '../../../models/reservation';
import {
    createEntityId,
    getAvailabilitySlots,
    getServices,
    saveAvailabilitySlots,
} from '../../../utils/appDataStorage';
import { getReservations } from '../../../utils/reservationStorage';
import { formatDateTimeRange } from '../../../utils/date';

type SlotFormValues = {
    serviceId: string;
    date: string;
    startTime: string;
    endTime: string;
};

function buildDateTime(date: string, time: string) {
    return `${date}T${time}:00`;
}

export function AdminAvailabilityPage() {
    const services = useMemo(() => getServices(), []);
    const reservations = useMemo(() => getReservations(), []);

    const [slots, setSlots] = useState<AvailabilitySlot[]>(() =>
        getAvailabilitySlots()
    );

    const [form, setForm] = useState<SlotFormValues>({
        serviceId: services[0]?.id ?? '',
        date: '2026-09-23',
        startTime: '10:00',
        endTime: '11:30',
    });

    const serviceById = useMemo(() => {
        return new Map(services.map((service) => [service.id, service]));
    }, [services]);

    const bookedSlotIds = useMemo(() => {
        return new Set(
            reservations
                .filter(
                    (reservation) =>
                        reservation.status === 'new' ||
                        reservation.status === 'confirmed' ||
                        reservation.status === 'reschedule_requested'
                )
                .map((reservation) => reservation.slot.id)
        );
    }, [reservations]);

    const sortedSlots = useMemo(() => {
        return [...slots].sort(
            (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        );
    }, [slots]);

    function updateForm<K extends keyof SlotFormValues>(
        field: K,
        value: SlotFormValues[K]
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function handleAddSlot() {
        if (!form.serviceId || !form.date || !form.startTime || !form.endTime) {
            return;
        }

        const nextSlot: AvailabilitySlot = {
            id: createEntityId('slot'),
            serviceId: form.serviceId,
            startAt: buildDateTime(form.date, form.startTime),
            endAt: buildDateTime(form.date, form.endTime),
            isAvailable: true,
        };

        const nextSlots = [nextSlot, ...slots];

        setSlots(nextSlots);
        saveAvailabilitySlots(nextSlots);
    }

    function toggleSlotAvailability(slot: AvailabilitySlot) {
        if (bookedSlotIds.has(slot.id)) {
            return;
        }

        const nextSlots = slots.map((currentSlot) =>
            currentSlot.id === slot.id
                ? {
                    ...currentSlot,
                    isAvailable: !currentSlot.isAvailable,
                }
                : currentSlot
        );

        setSlots(nextSlots);
        saveAvailabilitySlots(nextSlots);
    }

    function removeSlot(slot: AvailabilitySlot) {
        if (bookedSlotIds.has(slot.id)) {
            return;
        }

        const nextSlots = slots.filter((currentSlot) => currentSlot.id !== slot.id);

        setSlots(nextSlots);
        saveAvailabilitySlots(nextSlots);
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
                        Availability
                    </Typography>

                    <Typography color="text.secondary">
                        Manage available booking slots for photography services.
                    </Typography>
                </Box>
            </Stack>

            <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Add new slot
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: '2fr 1fr 1fr 1fr auto',
                            },
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            select
                            label="Service"
                            value={form.serviceId}
                            onChange={(event) =>
                                updateForm('serviceId', event.target.value)
                            }
                        >
                            {services.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                    {service.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Date"
                            type="date"
                            value={form.date}
                            onChange={(event) => updateForm('date', event.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="Start"
                            type="time"
                            value={form.startTime}
                            onChange={(event) =>
                                updateForm('startTime', event.target.value)
                            }
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="End"
                            type="time"
                            value={form.endTime}
                            onChange={(event) =>
                                updateForm('endTime', event.target.value)
                            }
                            InputLabelProps={{ shrink: true }}
                        />

                        <Button variant="contained" onClick={handleAddSlot}>
                            Add slot
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Stack spacing={2}>
                {sortedSlots.map((slot) => {
                    const service = serviceById.get(slot.serviceId);
                    const isBooked = bookedSlotIds.has(slot.id);

                    return (
                        <Card key={slot.id}>
                            <CardContent sx={{ p: 3 }}>
                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    justifyContent="space-between"
                                    spacing={2}
                                >
                                    <Box>
                                        <Typography variant="h4">
                                            {service?.name ?? 'Unknown service'}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {formatDateTimeRange(slot.startAt, slot.endAt)}
                                        </Typography>
                                    </Box>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={2}
                                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                                    >
                                        <Chip
                                            label={
                                                isBooked
                                                    ? 'Booked'
                                                    : slot.isAvailable
                                                        ? 'Available'
                                                        : 'Blocked'
                                            }
                                            color={
                                                isBooked
                                                    ? 'secondary'
                                                    : slot.isAvailable
                                                        ? 'success'
                                                        : 'default'
                                            }
                                        />

                                        <Button
                                            variant="outlined"
                                            disabled={isBooked}
                                            onClick={() => toggleSlotAvailability(slot)}
                                        >
                                            {slot.isAvailable ? 'Block' : 'Make available'}
                                        </Button>

                                        <Button
                                            variant="text"
                                            color="error"
                                            disabled={isBooked}
                                            onClick={() => removeSlot(slot)}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}