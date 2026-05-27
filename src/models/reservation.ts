import type { Service } from './service';

export type ReservationStatus =
    | 'new'
    | 'confirmed'
    | 'reschedule_requested'
    | 'cancelled'
    | 'rejected'
    | 'completed'
    | 'settled';

export type AvailabilitySlot = {
    id: string;
    serviceId: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
};

export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export type Reservation = {
    id: string;
    customer: Customer;
    service: Service;
    slot: AvailabilitySlot;
    status: ReservationStatus;
    message?: string;
    acceptTerms: boolean;
    marketingConsent: boolean;
    createdAt: string;
};