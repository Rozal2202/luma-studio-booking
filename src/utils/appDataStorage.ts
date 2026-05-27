import { availabilitySlots as defaultAvailabilitySlots } from '../data/availabilitySlots';
import { portfolioItems as defaultPortfolioItems } from '../data/portfolioItems';
import { services as defaultServices } from '../data/services';
import type { PortfolioItem } from '../models/portfolio';
import type { AvailabilitySlot } from '../models/reservation';
import type { Service } from '../models/service';

const SERVICES_STORAGE_KEY = 'luma:services';
const AVAILABILITY_STORAGE_KEY = 'luma:availabilitySlots';
const PORTFOLIO_STORAGE_KEY = 'luma:portfolioItems';

function readFromStorage<T>(key: string, fallback: T): T {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
        return fallback;
    }

    try {
        return JSON.parse(rawValue) as T;
    } catch {
        return fallback;
    }
}

function writeToStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function createEntityId(prefix: string) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function getServices(): Service[] {
    return readFromStorage<Service[]>(SERVICES_STORAGE_KEY, defaultServices);
}

export function saveServices(services: Service[]) {
    writeToStorage(SERVICES_STORAGE_KEY, services);
}

export function getAvailabilitySlots(): AvailabilitySlot[] {
    return readFromStorage<AvailabilitySlot[]>(
        AVAILABILITY_STORAGE_KEY,
        defaultAvailabilitySlots
    );
}

export function saveAvailabilitySlots(slots: AvailabilitySlot[]) {
    writeToStorage(AVAILABILITY_STORAGE_KEY, slots);
}

export function getPortfolioItems(): PortfolioItem[] {
    return readFromStorage<PortfolioItem[]>(
        PORTFOLIO_STORAGE_KEY,
        defaultPortfolioItems
    );
}

export function savePortfolioItems(items: PortfolioItem[]) {
    writeToStorage(PORTFOLIO_STORAGE_KEY, items);
}

export function resetAppData() {
    localStorage.removeItem(SERVICES_STORAGE_KEY);
    localStorage.removeItem(AVAILABILITY_STORAGE_KEY);
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}