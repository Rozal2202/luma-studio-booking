const ADMIN_AUTH_STORAGE_KEY = 'luma:adminSession';

const DEMO_ADMIN_EMAIL = 'admin@luma.studio';
const DEMO_ADMIN_PASSWORD = 'admin123';

export type AdminSession = {
    email: string;
    role: 'admin';
    loggedInAt: string;
};

export function signInAdmin(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const isValidCredentials =
        normalizedEmail === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD;

    if (!isValidCredentials) {
        return false;
    }

    const session: AdminSession = {
        email: normalizedEmail,
        role: 'admin',
        loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));

    return true;
}

export function signOutAdmin() {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}

export function getAdminSession(): AdminSession | null {
    const rawValue = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);

    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue) as AdminSession;
    } catch {
        return null;
    }
}

export function isAdminAuthenticated() {
    return Boolean(getAdminSession());
}