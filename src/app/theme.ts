import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fbf9f8',
            paper: '#ffffff',
        },
        primary: {
            main: '#181919',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#775a19',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#1b1c1c',
            secondary: '#444748',
        },
        divider: '#e4e2e2',
        error: {
            main: '#ba1a1a',
        },
        warning: {
            main: '#775a19',
            light: '#fed488',
        },
        success: {
            main: '#2f6f4e',
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: 1.16,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h3: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.25,
        },
        h4: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.3,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            letterSpacing: '0.03em',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#fbf9f8',
                },
                a: {
                    color: 'inherit',
                    textDecoration: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    paddingInline: 24,
                    minHeight: 44,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid #e4e2e2',
                    boxShadow: '0 18px 60px rgba(45, 45, 45, 0.05)',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});