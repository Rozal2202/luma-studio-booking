import {
    Box,
    ButtonBase,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {
    CalendarMonth,
    Dashboard,
    Image,
    PhotoCamera,
    Settings,
    ViewList,
} from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

const sidebarWidth = 280;

const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: Dashboard },
    { label: 'Reservations', path: '/admin/reservations', icon: CalendarMonth },
    { label: 'Services', path: '/admin/services', icon: PhotoCamera },
    { label: 'Availability', path: '/admin/availability', icon: ViewList },
    { label: 'Portfolio', path: '/admin/portfolio', icon: Image },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
    return (
        <Box minHeight="100vh" display="flex" bgcolor="background.default">
            <Box
                component="aside"
                sx={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    bgcolor: '#f5f3f3',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Luma Admin</Typography>
                    <Typography
                        variant="caption"
                        sx={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}
                    >
                        Studio Manager
                    </Typography>
                </Box>

                <Divider />

                <Stack spacing={1} sx={{ p: 2 }}>
                    {adminNavItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <ButtonBase
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                end={item.path === '/admin'}
                                sx={{
                                    justifyContent: 'flex-start',
                                    gap: 2,
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    color: 'text.primary',
                                    '&.active': {
                                        bgcolor: '#fed488',
                                        color: '#261900',
                                    },
                                }}
                            >
                                <Icon fontSize="small" />
                                <Typography fontSize={15}>{item.label}</Typography>
                            </ButtonBase>
                        );
                    })}
                </Stack>

                <Box sx={{ mt: 'auto', p: 3 }}>
                    <Typography fontWeight={600}>Admin User</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sign out
                    </Typography>
                </Box>
            </Box>

            <Box flex={1} minWidth={0}>
                <Box
                    component="header"
                    sx={{
                        height: 72,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.default',
                        px: { xs: 2, md: 3 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Typography variant="h4" sx={{ whiteSpace: 'nowrap' }}>
                        Admin Dashboard
                    </Typography>

                    <TextField
                        placeholder="Search reservations..."
                        size="small"
                        sx={{ maxWidth: 440, flex: 1 }}
                    />
                </Box>

                <Box component="main" sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}