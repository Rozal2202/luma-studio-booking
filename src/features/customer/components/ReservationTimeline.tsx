import {
    Box,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import type { ReservationStatus } from '../../../models/reservation';

type ReservationTimelineProps = {
    status: ReservationStatus;
};

const regularSteps = [
    {
        status: 'new',
        label: 'New',
        description: 'Booking request submitted',
    },
    {
        status: 'confirmed',
        label: 'Confirmed',
        description: 'Studio confirmed the session',
    },
    {
        status: 'completed',
        label: 'Completed',
        description: 'Photo session completed',
    },
    {
        status: 'settled',
        label: 'Settled',
        description: 'Booking closed and settled',
    },
] as const;

function getActiveStep(status: ReservationStatus) {
    switch (status) {
        case 'new':
            return 0;
        case 'confirmed':
        case 'reschedule_requested':
            return 1;
        case 'completed':
            return 2;
        case 'settled':
            return 3;
        case 'cancelled':
        case 'rejected':
            return 1;
        default:
            return 0;
    }
}

export function ReservationTimeline({ status }: ReservationTimelineProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const isCancelledOrRejected = status === 'cancelled' || status === 'rejected';

    return (
        <Box>
            <Stepper
                activeStep={getActiveStep(status)}
                orientation={isMobile ? 'vertical' : 'horizontal'}
                alternativeLabel={!isMobile}
            >
                {regularSteps.map((step) => (
                    <Step key={step.status}>
                        <StepLabel>
                            <Typography fontWeight={600}>{step.label}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {step.description}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {status === 'reschedule_requested' ? (
                <Typography color="text.secondary" sx={{ mt: 3 }}>
                    A date change request has been submitted. The studio will contact you
                    to arrange a new time slot.
                </Typography>
            ) : null}

            {isCancelledOrRejected ? (
                <Typography color="error" sx={{ mt: 3 }}>
                    This reservation is no longer active. Contact the studio for more
                    information.
                </Typography>
            ) : null}
        </Box>
    );
}