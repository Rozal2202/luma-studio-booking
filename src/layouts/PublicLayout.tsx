import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Booking', path: '/booking' },
    { label: 'Contact', path: '/contact' },
];

export function PublicLayout() {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box
                component="header"
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ minHeight: 72 }}
                    >
                        <Typography
                            component={NavLink}
                            to="/"
                            variant="h4"
                            sx={{ color: 'text.primary' }}
                        >
                            Luma Studio
                        </Typography>

                        <Stack
                            component="nav"
                            direction="row"
                            spacing={4}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            {navItems.map((item) => (
                                <Typography
                                    key={item.path}
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        fontSize: 14,
                                        letterSpacing: '0.08em',
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

                        <Button component={NavLink} to="/booking" variant="contained">
                            Book a session
                        </Button>
                    </Stack>
                </Container>
            </Box>

            <Box component="main" flex={1}>
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
                                Capturing life&apos;s essential moments with quiet luxury and editorial
                                focus.
                            </Typography>
                        </Box>

                        <Stack spacing={1}>
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

                        <Typography color="text.secondary">
                            © 2026 Luma Studio. All rights reserved.
                        </Typography>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}