import type { AvailabilitySlot } from '../models/reservation';

export const availabilitySlots: AvailabilitySlot[] = [
    {
        id: 'slot-business-1',
        serviceId: 'service-business',
        startAt: '2026-09-16T10:00:00',
        endAt: '2026-09-16T11:30:00',
        isAvailable: true,
    },
    {
        id: 'slot-business-2',
        serviceId: 'service-business',
        startAt: '2026-09-16T13:00:00',
        endAt: '2026-09-16T14:30:00',
        isAvailable: true,
    },
    {
        id: 'slot-business-3',
        serviceId: 'service-business',
        startAt: '2026-09-17T11:00:00',
        endAt: '2026-09-17T12:30:00',
        isAvailable: true,
    },
    {
        id: 'slot-portrait-1',
        serviceId: 'service-portrait',
        startAt: '2026-09-18T15:00:00',
        endAt: '2026-09-18T16:30:00',
        isAvailable: true,
    },
    {
        id: 'slot-family-1',
        serviceId: 'service-family',
        startAt: '2026-09-19T10:00:00',
        endAt: '2026-09-19T12:00:00',
        isAvailable: true,
    },
    {
        id: 'slot-product-1',
        serviceId: 'service-product',
        startAt: '2026-09-20T09:00:00',
        endAt: '2026-09-20T13:00:00',
        isAvailable: true,
    },
    {
        id: 'slot-event-1',
        serviceId: 'service-event',
        startAt: '2026-09-21T14:00:00',
        endAt: '2026-09-21T16:00:00',
        isAvailable: true,
    },
    {
        id: 'slot-lifestyle-1',
        serviceId: 'service-lifestyle',
        startAt: '2026-09-22T12:00:00',
        endAt: '2026-09-22T14:00:00',
        isAvailable: true,
    },
];