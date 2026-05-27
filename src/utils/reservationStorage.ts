
import type { Reservation } from '../models/reservation';

const RESERVATIONS_STORAGE_KEY = 'luma:reservations';
const LAST_RESERVATION_STORAGE_KEY = 'luma:lastReservation';

function readReservations(): Reservation[] {
    const rawValue = localStorage.getItem(RESERVATIONS_STORAGE_KEY);

    if (!rawValue) {
        return [];
    }

    try {
        return JSON.parse(rawValue) as Reservation[];
    } catch {
        return [];
    }
}

export function saveReservation(reservation: Reservation) {
    const reservations = readReservations();

    const nextReservations = [reservation, ...reservations];

    localStorage.setItem(
        RESERVATIONS_STORAGE_KEY,
        JSON.stringify(nextReservations)
    );

    localStorage.setItem(
        LAST_RESERVATION_STORAGE_KEY,
        JSON.stringify(reservation)
    );
}

export function getLastReservation(): Reservation | null {
    const rawValue = localStorage.getItem(LAST_RESERVATION_STORAGE_KEY);

    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue) as Reservation;
    } catch {
        return null;
    }
}

export function getReservations(): Reservation[] {
    return readReservations();
}

export function generateReservationId() {
    const number = Math.floor(1000 + Math.random() * 9000);

    return `LMA-${number}`;
}