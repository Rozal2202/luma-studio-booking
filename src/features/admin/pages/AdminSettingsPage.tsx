import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

import { resetAppData } from '../../../utils/appDataStorage';
import { clearReservations } from '../../../utils/reservationStorage';

export function AdminSettingsPage() {
    const [message, setMessage] = useState('');

    function handleClearReservations() {
        clearReservations();
        setMessage('Reservations have been cleared.');
    }

    function handleResetAllData() {
        clearReservations();
        resetAppData();
        setMessage('All demo data has been reset. Refresh public pages to see default data.');
    }

    return (
        <Box>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h1" sx={{ mb: 1 }}>
                    Settings
                </Typography>

                <Typography color="text.secondary">
                    Manage demo data and application utility actions.
                </Typography>
            </Box>

            {message ? (
                <Alert severity="success" sx={{ mb: 4 }}>
                    {message}
                </Alert>
            ) : null}

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                }}
            >
                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={2}>
                            <DeleteIcon color="error" />

                            <Typography variant="h3">
                                Clear reservations
                            </Typography>

                            <Typography color="text.secondary">
                                Removes only saved reservations from browser localStorage.
                                Services, availability slots and portfolio items remain unchanged.
                            </Typography>

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleClearReservations}
                            >
                                Clear reservations
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={2}>
                            <RestartAltIcon color="secondary" />

                            <Typography variant="h3">
                                Reset all demo data
                            </Typography>

                            <Typography color="text.secondary">
                                Restores default services, availability slots and portfolio
                                items by clearing saved demo data from localStorage.
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={handleResetAllData}
                            >
                                Reset demo data
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={2}>
                            <HomeIcon color="secondary" />

                            <Typography variant="h3">
                                Public website
                            </Typography>

                            <Typography color="text.secondary">
                                Go back to the public part of the application and test the
                                booking process as a client.
                            </Typography>

                            <Button
                                component={RouterLink}
                                to="/"
                                variant="outlined"
                            >
                                Open public site
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}