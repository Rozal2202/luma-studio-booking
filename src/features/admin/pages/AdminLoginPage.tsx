import { FormEvent, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { isAdminAuthenticated, signInAdmin } from '../../../utils/adminAuth';

type LoginLocationState = {
    from?: string;
};

export function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('admin@luma.studio');
    const [password, setPassword] = useState('admin123');
    const [errorMessage, setErrorMessage] = useState('');

    const from = (location.state as LoginLocationState | null)?.from ?? '/admin';

    if (isAdminAuthenticated()) {
        return <Navigate to="/admin" replace />;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const isLoggedIn = signInAdmin(email, password);

        if (!isLoggedIn) {
            setErrorMessage('Invalid email or password. Use demo admin credentials.');
            return;
        }

        navigate(from, { replace: true });
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'background.default',
                px: 2,
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 460 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                bgcolor: '#fed488',
                                color: '#261900',
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        >
                            <LockOutlinedIcon />
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2">
                                Admin Login
                            </Typography>

                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Sign in to manage reservations, services and availability.
                            </Typography>
                        </Box>
                    </Stack>

                    {errorMessage ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errorMessage}
                        </Alert>
                    ) : null}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                fullWidth
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                fullWidth
                            />

                            <Button type="submit" variant="contained" fullWidth>
                                Sign in
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/"
                                variant="text"
                                color="secondary"
                            >
                                Back to public site
                            </Button>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            mt: 4,
                            p: 2,
                            borderRadius: 3,
                            bgcolor: '#f5f3f3',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Demo credentials:
                        </Typography>

                        <Typography variant="body2">
                            email: <strong>admin@luma.studio</strong>
                        </Typography>

                        <Typography variant="body2">
                            password: <strong>admin123</strong>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}