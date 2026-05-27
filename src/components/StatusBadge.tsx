import { Chip } from '@mui/material';

import type { ReservationStatus } from '../models/reservation';

type StatusBadgeProps = {
    status: ReservationStatus;
};

const statusConfig: Record<
    ReservationStatus,
    {
        label: string;
        color: string;
        backgroundColor: string;
    }
> = {
    new: {
        label: 'Waiting for confirmation',
        color: '#775a19',
        backgroundColor: '#fff3d8',
    },
    confirmed: {
        label: 'Confirmed',
        color: '#775a19',
        backgroundColor: '#f6ead0',
    },
    reschedule_requested: {
        label: 'Reschedule requested',
        color: '#775a19',
        backgroundColor: '#fff3d8',
    },
    cancelled: {
        label: 'Cancelled',
        color: '#93000a',
        backgroundColor: '#ffdad6',
    },
    rejected: {
        label: 'Rejected',
        color: '#93000a',
        backgroundColor: '#ffdad6',
    },
    completed: {
        label: 'Completed',
        color: '#444748',
        backgroundColor: '#e4e2e2',
    },
    settled: {
        label: 'Settled',
        color: '#2f6f4e',
        backgroundColor: '#dcefe3',
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Chip
            label={config.label}
            size="small"
            sx={{
                color: config.color,
                bgcolor: config.backgroundColor,
                fontWeight: 600,
                letterSpacing: '0.06em',
            }}
        />
    );
}