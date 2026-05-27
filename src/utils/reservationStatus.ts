import type { ReservationStatus } from '../models/reservation';

export const reservationStatusLabels: Record<ReservationStatus, string> = {
    new: 'New',
    confirmed: 'Confirmed',
    reschedule_requested: 'Reschedule requested',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    completed: 'Completed',
    settled: 'Settled',
};

export const reservationStatusOptions: ReservationStatus[] = [
    'new',
    'confirmed',
    'reschedule_requested',
    'cancelled',
    'rejected',
    'completed',
    'settled',
];