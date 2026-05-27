import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink, NavLink, Outlet } from 'react-router-dom';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Booking', path: '/booking' },
    { label: 'Client panel', path: '/reservation-status' },
    { label: 'Admin', path: '/admin' },
];

export function PublicLayout() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                component="header"
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            height: 76,
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr auto',
                            alignItems: 'center',
                            columnGap: 4,
                        }}
                    >
                        <Typography
                            component={RouterLink}
                            to="/"
                            variant="h4"
                            sx={{
                                color: 'text.primary',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Luma Studio
                        </Typography>

                        <Stack
                            component="nav"
                            direction="row"
                            spacing={4}
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                display: { xs: 'none', lg: 'flex' },
                                minWidth: 0,
                            }}
                        >
                            {navItems.map((item) => (
                                <Typography
                                    key={item.path}
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        fontSize: 14,
                                        lineHeight: '20px',
                                        letterSpacing: '0.08em',
                                        whiteSpace: 'nowrap',
                                        py: 0.5,
                                        '&.active': {
                                            color: 'secondary.main',
                                            borderBottom: '1px solid',
                                            borderColor: 'secondary.main',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            ))}
                        </Stack>

                        <Button
                            component={RouterLink}
                            to="/booking"
                            variant="contained"
                            sx={{
                                minHeight: 44,
                                px: 3,
                                whiteSpace: 'nowrap',
                                alignSelf: 'center',
                                display: { xs: 'none', sm: 'inline-flex' },
                            }}
                        >
                            Book a session
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box component="main" sx={{ flex: 1 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            <Box
                component="footer"
                sx={{
                    mt: 8,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <Box>
                            <Typography variant="h4" sx={{ mb: 2 }}>
                                Luma Studio
                            </Typography>
                            <Typography color="text.secondary" maxWidth={360}>
                                Capturing life&apos;s essential moments with quiet luxury and
                                editorial focus.
                            </Typography>
                        </Box>

                        <Stack spacing={1}>
                            <Typography component={NavLink} to="/admin">
                                Admin panel
                            </Typography>
                            <Typography component={NavLink} to="/privacy-policy">
                                Privacy Policy
                            </Typography>
                            <Typography component={NavLink} to="/terms">
                                Terms of Service
                            </Typography>
                            <Typography component={NavLink} to="/cookies">
                                Cookie Policy
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}