import type { Reservation, ReservationStatus } from '../models/reservation';

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

function writeReservations(reservations: Reservation[]) {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
}

export function saveReservation(reservation: Reservation) {
    const reservations = readReservations();
    const nextReservations = [reservation, ...reservations];

    writeReservations(nextReservations);

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

export function getReservationById(reservationId: string): Reservation | null {
    const normalizedReservationId = reservationId.trim().toUpperCase();

    return (
        readReservations().find(
            (reservation) => reservation.id.toUpperCase() === normalizedReservationId
        ) ?? null
    );
}

export function updateReservationStatus(
    reservationId: string,
    status: ReservationStatus
): Reservation | null {
    const reservations = readReservations();

    const updatedReservations = reservations.map((reservation) => {
        if (reservation.id !== reservationId) {
            return reservation;
        }

        return {
            ...reservation,
            status,
        };
    });

    const updatedReservation =
        updatedReservations.find((reservation) => reservation.id === reservationId) ??
        null;

    writeReservations(updatedReservations);

    const lastReservation = getLastReservation();

    if (lastReservation?.id === reservationId && updatedReservation) {
        localStorage.setItem(
            LAST_RESERVATION_STORAGE_KEY,
            JSON.stringify(updatedReservation)
        );
    }

    return updatedReservation;
}

export function generateReservationId() {
    const number = Math.floor(1000 + Math.random() * 9000);

    return `LMA-${number}`;
}


export function clearReservations() {
    localStorage.removeItem(RESERVATIONS_STORAGE_KEY);
    localStorage.removeItem(LAST_RESERVATION_STORAGE_KEY);
}