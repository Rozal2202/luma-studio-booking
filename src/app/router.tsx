import { createBrowserRouter } from 'react-router-dom';

import { PagePlaceholder } from '../components/PagePlaceholder';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { HomePage } from '../features/public/pages/HomePage';
import { ServicesPage } from '../features/public/pages/ServicesPage';
import { PortfolioPage } from '../features/public/pages/PortfolioPage';

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
                element: (
                    <PagePlaceholder
                        title="Service Details"
                        description="Detailed service page will be implemented in the booking milestone."
                    />
                ),
            },
            {
                path: 'portfolio',
                element: <PortfolioPage />,
            },
            {
                path: 'booking',
                element: (
                    <PagePlaceholder
                        title="Reserve Your Session"
                        description="Follow the steps below to secure your time in the studio."
                    />
                ),
            },
            {
                path: 'reservation-status',
                element: (
                    <PagePlaceholder
                        title="Reservation Status"
                        description="Track the progress of your upcoming session."
                    />
                ),
            },
            {
                path: 'contact',
                element: (
                    <PagePlaceholder
                        title="Contact"
                        description="Reach out to Luma Studio."
                    />
                ),
            },
            {
                path: 'privacy-policy',
                element: <PagePlaceholder title="Privacy Policy" />,
            },
            {
                path: 'terms',
                element: <PagePlaceholder title="Terms of Service" />,
            },
            {
                path: 'cookies',
                element: <PagePlaceholder title="Cookie Policy" />,
            },
        ],
    },
    {
        path: '/admin/login',
        element: <PagePlaceholder title="Admin Login" />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: (
                    <PagePlaceholder
                        title="Overview"
                        description="Here's what's happening at Luma Studio today."
                    />
                ),
            },
            {
                path: 'reservations',
                element: (
                    <PagePlaceholder
                        title="Reservations"
                        description="Manage incoming bookings, studio sessions, and client schedules."
                    />
                ),
            },
            {
                path: 'services',
                element: <PagePlaceholder title="Services" />,
            },
            {
                path: 'availability',
                element: <PagePlaceholder title="Availability" />,
            },
            {
                path: 'portfolio',
                element: <PagePlaceholder title="Portfolio" />,
            },
            {
                path: 'settings',
                element: <PagePlaceholder title="Settings" />,
            },
        ],
    },
]);