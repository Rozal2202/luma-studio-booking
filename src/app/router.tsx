import { createBrowserRouter } from 'react-router-dom';

import { PagePlaceholder } from '../components/PagePlaceholder';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: (
                    <PagePlaceholder
                        title="Book your perfect photo session online"
                        description="Choose a service, select an available date, and reserve your session in a few simple steps."
                    />
                ),
            },
            {
                path: 'services',
                element: (
                    <PagePlaceholder
                        title="Photography Services"
                        description="Elevate your visual storytelling with tailored photography sessions."
                    />
                ),
            },
            {
                path: 'portfolio',
                element: (
                    <PagePlaceholder
                        title="Portfolio"
                        description="A curated selection of our finest work."
                    />
                ),
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