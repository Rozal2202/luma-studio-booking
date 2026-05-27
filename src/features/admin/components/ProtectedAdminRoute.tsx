import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAdminAuthenticated } from '../../../utils/adminAuth';

type ProtectedAdminRouteProps = {
    children: ReactNode;
};

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
    const location = useLocation();

    if (!isAdminAuthenticated()) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return children;
}