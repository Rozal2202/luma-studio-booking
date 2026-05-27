import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { services } from '../../../data/services';
import { availabilitySlots } from '../../../data/availabilitySlots';
import type { AvailabilitySlot, Customer, Reservation } from '../../../models/reservation';
import type { Service } from '../../../models/service';
import { formatDateTimeRange } from '../../../utils/date';
import {
    generateReservationId,
    saveReservation,
} from '../../../utils/reservationStorage';

const steps = ['Service', 'Date & Time', 'Details', 'Summary'];

const bookingFormSchema = z.object({
    firstName: z.string().min(2, 'First name must contain at least 2 characters'),
    lastName: z.string().min(2, 'Last name must contain at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().min(9, 'Enter a valid phone number'),
    message: z.string().optional(),
    acceptTerms: z.boolean().refine((value) => value, {
        message: 'You must accept Terms and Privacy Policy',
    }),
    marketingConsent: z.boolean(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const serviceFromUrl = searchParams.get('service');

    const initialService = services.find((service) => service.slug === serviceFromUrl);

    const [activeStep, setActiveStep] = useState(0);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
        initialService?.id ?? null
    );
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState<BookingFormValues | null>(null);

    const selectedService = useMemo<Service | null>(() => {
        return services.find((service) => service.id === selectedServiceId) ?? null;
    }, [selectedServiceId]);

    const availableSlots = useMemo<AvailabilitySlot[]>(() => {
        if (!selectedService) {
            return [];
        }

        return availabilitySlots.filter(
            (slot) => slot.serviceId === selectedService.id && slot.isAvailable
        );
    }, [selectedService]);

    const selectedSlot = useMemo<AvailabilitySlot | null>(() => {
        return availabilitySlots.find((slot) => slot.id === selectedSlotId) ?? null;
    }, [selectedSlotId]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            acceptTerms: false,
            marketingConsent: false,
        },
    });

    function goToNextStep() {
        if (activeStep === 0 && selectedService) {
            setActiveStep(1);
            return;
        }

        if (activeStep === 1 && selectedSlot) {
            setActiveStep(2);
            return;
        }

        if (activeStep === 2) {
            void handleSubmit((values) => {
                setCustomerData(values);
                setActiveStep(3);
            })();

            return;
        }
    }

    function goToPreviousStep() {
        setActiveStep((currentStep) => Math.max(currentStep - 1, 0));
    }

    function confirmBooking() {
        if (!selectedService || !selectedSlot || !customerData) {
            return;
        }

        const customer: Customer = {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
        };

        const reservation: Reservation = {
            id: generateReservationId(),
            customer,
            service: selectedService,
            slot: selectedSlot,
            status: 'new',
            message: customerData.message,
            acceptTerms: customerData.acceptTerms,
            marketingConsent: customerData.marketingConsent,
            createdAt: new Date().toISOString(),
        };

        saveReservation(reservation);

        navigate('/booking/confirmed');
    }

    const isNextDisabled =
        (activeStep === 0 && !selectedService) ||
        (activeStep === 1 && !selectedSlot) ||
        (activeStep === 3 && (!selectedService || !selectedSlot || !customerData));

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Reserve Your Session
                </Typography>

                <Typography color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
                    Follow the steps below to secure your time in the studio. Our minimal,
                    focused environment awaits your creative vision.
                </Typography>
            </Box>

            <Card sx={{ maxWidth: 1120, mx: 'auto' }}>
                <Box sx={{ px: { xs: 2, md: 6 }, pt: { xs: 4, md: 5 }, pb: 3 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Divider />

                <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                    {activeStep === 0 ? (
                        <Box>
                            <Typography variant="h3" sx={{ mb: 4 }}>
                                Select a Service
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                    gap: 3,
                                }}
                            >
                                {services.map((service) => {
                                    const isSelected = selectedServiceId === service.id;

                                    return (
                                        <Card
                                            key={service.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                setSelectedServiceId(service.id);
                                                setSelectedSlotId(null);
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    setSelectedServiceId(service.id);
                                                    setSelectedSlotId(null);
                                                }
                                            }}
                                            sx={{
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                borderColor: isSelected ? 'secondary.main' : 'divider',
                                                boxShadow: isSelected
                                                    ? '0 0 0 2px rgba(119, 90, 25, 0.24)'
                                                    : undefined,
                                            }}
                                        >
                                            <Box
                                                role="img"
                                                aria-label={service.visual.label}
                                                sx={{
                                                    height: 180,
                                                    background: service.visual.background,
                                                }}
                                            />

                                            <CardContent>
                                                <Stack
                                                    direction="row"
                                                    alignItems="flex-start"
                                                    justifyContent="space-between"
                                                    spacing={2}
                                                >
                                                    <Box>
                                                        <Typography variant="h4">{service.name}</Typography>
                                                        <Typography color="text.secondary">
                                                            {service.durationLabel} • {service.priceLabel}
                                                        </Typography>
                                                    </Box>

                                                    {isSelected ? (
                                                        <Box
                                                            sx={{
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: '50%',
                                                                bgcolor: 'primary.main',
                                                                color: 'primary.contrastText',
                                                                display: 'grid',
                                                                placeItems: 'center',
                                                            }}
                                                        >
                                                            <CheckIcon fontSize="small" />
                                                        </Box>
                                                    ) : null}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        </Box>
                    ) : null}

                    {activeStep === 1 ? (
                        <Box>
                            <Typography variant="h3" sx={{ mb: 2 }}>
                                Select Date & Time
                            </Typography>

                            <Typography color="text.secondary" sx={{ mb: 4 }}>
                                Choose one of the available time slots for{' '}
                                <strong>{selectedService?.name}</strong>.
                            </Typography>

                            <Stack spacing={2}>
                                {availableSlots.map((slot) => {
                                    const isSelected = selectedSlotId === slot.id;

                                    return (
                                        <Button
                                            key={slot.id}
                                            variant={isSelected ? 'contained' : 'outlined'}
                                            color={isSelected ? 'primary' : 'inherit'}
                                            onClick={() => setSelectedSlotId(slot.id)}
                                            sx={{
                                                justifyContent: 'space-between',
                                                py: 2,
                                                px: 3,
                                            }}
                                        >
                                            <span>{formatDateTimeRange(slot.startAt, slot.endAt)}</span>
                                            <span>{isSelected ? 'Selected' : 'Available'}</span>
                                        </Button>
                                    );
                                })}
                            </Stack>
                        </Box>
                    ) : null}

                    {activeStep === 2 ? (
                        <Box
                            component="form"
                            noValidate
                            onSubmit={(event) => {
                                event.preventDefault();
                                goToNextStep();
                            }}
                        >
                            <Typography variant="h3" sx={{ mb: 4 }}>
                                Your Details
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                    gap: 3,
                                }}
                            >
                                <TextField
                                    label="First name"
                                    {...register('firstName')}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName?.message}
                                />

                                <TextField
                                    label="Last name"
                                    {...register('lastName')}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName?.message}
                                />

                                <TextField
                                    label="Email"
                                    type="email"
                                    {...register('email')}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />

                                <TextField
                                    label="Phone"
                                    {...register('phone')}
                                    error={Boolean(errors.phone)}
                                    helperText={errors.phone?.message}
                                />

                                <TextField
                                    label="Message"
                                    multiline
                                    minRows={4}
                                    {...register('message')}
                                    sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                                />
                            </Box>

                            <Stack sx={{ mt: 3 }}>
                                <FormControlLabel
                                    control={<Checkbox {...register('acceptTerms')} />}
                                    label="I accept Terms and Privacy Policy"
                                />

                                {errors.acceptTerms ? (
                                    <Typography color="error" variant="body2">
                                        {errors.acceptTerms.message}
                                    </Typography>
                                ) : null}

                                <FormControlLabel
                                    control={<Checkbox {...register('marketingConsent')} />}
                                    label="I want to receive occasional news and promotional offers"
                                />
                            </Stack>
                        </Box>
                    ) : null}

                    {activeStep === 3 ? (
                        <Box>
                            <Typography variant="h3" sx={{ mb: 4 }}>
                                Summary
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                    gap: 3,
                                }}
                            >
                                <Card sx={{ p: 3 }}>
                                    <Typography variant="overline" color="secondary">
                                        Service
                                    </Typography>
                                    <Typography variant="h4">{selectedService?.name}</Typography>
                                    <Typography color="text.secondary">
                                        {selectedService?.durationLabel} • {selectedService?.priceLabel}
                                    </Typography>
                                </Card>

                                <Card sx={{ p: 3 }}>
                                    <Typography variant="overline" color="secondary">
                                        Date & Time
                                    </Typography>
                                    <Typography variant="h4">
                                        {selectedSlot
                                            ? formatDateTimeRange(selectedSlot.startAt, selectedSlot.endAt)
                                            : '-'}
                                    </Typography>
                                </Card>

                                <Card sx={{ p: 3 }}>
                                    <Typography variant="overline" color="secondary">
                                        Client
                                    </Typography>
                                    <Typography variant="h4">
                                        {customerData?.firstName} {customerData?.lastName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {customerData?.email}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {customerData?.phone}
                                    </Typography>
                                </Card>

                                <Card sx={{ p: 3 }}>
                                    <Typography variant="overline" color="secondary">
                                        Consent
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Terms and Privacy Policy accepted.
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Marketing consent:{' '}
                                        {customerData?.marketingConsent ? 'accepted' : 'not accepted'}
                                    </Typography>
                                </Card>
                            </Box>
                        </Box>
                    ) : null}

                    <Divider sx={{ my: 5 }} />

                    <Stack
                        direction={{ xs: 'column-reverse', sm: 'row' }}
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            disabled={activeStep === 0}
                            onClick={goToPreviousStep}
                        >
                            Back
                        </Button>

                        {activeStep < 3 ? (
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                disabled={isNextDisabled}
                                onClick={goToNextStep}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                disabled={isNextDisabled}
                                onClick={confirmBooking}
                            >
                                Confirm booking
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}