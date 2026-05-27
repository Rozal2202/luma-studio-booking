import { createBrowserRouter } from 'react-router-dom';

import { PagePlaceholder } from '../components/PagePlaceholder';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { HomePage } from '../features/public/pages/HomePage';
import { ServicesPage } from '../features/public/pages/ServicesPage';
import { PortfolioPage } from '../features/public/pages/PortfolioPage';
import { BookingPage } from '../features/booking/pages/BookingPage';
import { BookingConfirmationPage } from '../features/booking/pages/BookingConfirmationPage';
import { ReservationStatusPage } from '../features/customer/pages/ReservationStatusPage';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { AdminReservationsPage } from '../features/admin/pages/AdminReservationsPage';
import { AdminServicesPage } from '../features/admin/pages/AdminServicesPage';
import { AdminAvailabilityPage } from '../features/admin/pages/AdminAvailabilityPage';
import { AdminPortfolioPage } from '../features/admin/pages/AdminPortfolioPage';
import { ServiceDetailsPage } from '../features/public/pages/ServiceDetailsPage';
import { ContactPage } from '../features/public/pages/ContactPage';
import { PrivacyPolicyPage } from '../features/legal/pages/PrivacyPolicyPage';
import { TermsPage } from '../features/legal/pages/TermsPage';
import { CookiesPage } from '../features/legal/pages/CookiesPage';
import { AdminSettingsPage } from '../features/admin/pages/AdminSettingsPage';
import { AdminLoginPage } from '../features/admin/pages/AdminLoginPage';
import { ProtectedAdminRoute } from '../features/admin/components/ProtectedAdminRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'services',
                element: <ServicesPage />,
            },
            {
                path: 'services/:serviceSlug',
                element: <ServiceDetailsPage />,
            },
            {
                path: 'portfolio',
                element: <PortfolioPage />,
            },
            {
                path: 'booking',
                element: <BookingPage />,
            },
            {
                path: 'booking/confirmed',
                element: <BookingConfirmationPage />,
            },
            {
                path: 'reservation-status',
                element: <ReservationStatusPage />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicyPage />,
            },
            {
                path: 'terms',
                element: <TermsPage />,
            },
            {
                path: 'cookies',
                element: <CookiesPage />,
            },
        ],
    },
    {
        path: '/admin/login',
        element: <AdminLoginPage />,
    },
    {
        path: '/admin',
        element: (
            <ProtectedAdminRoute>
                <AdminLayout />
            </ProtectedAdminRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboardPage />,
            },
            {
                path: 'reservations',
                element: <AdminReservationsPage />,
            },
            {
                path: 'services',
                element: <AdminServicesPage />,
            },
            {
                path: 'availability',
                element: <AdminAvailabilityPage />,
            },
            {
                path: 'portfolio',
                element: <AdminPortfolioPage />,
            },
            {
                path: 'settings',
                element: <AdminSettingsPage />,
            },
        ],
    },
]);