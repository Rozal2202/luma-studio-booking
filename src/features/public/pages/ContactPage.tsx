import { useState } from 'react';
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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Contact Luma Studio
                </Typography>

                <Typography color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
                    Have a question about a session, offer or booking? Send us a
                    message and we will get back to you.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
                    gap: 4,
                    maxWidth: 1120,
                    mx: 'auto',
                }}
            >
                <Stack spacing={2}>
                    <Card sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2}>
                            <EmailOutlinedIcon color="secondary" />
                            <Box>
                                <Typography fontWeight={700}>Email</Typography>
                                <Typography color="text.secondary">
                                    hello@luma.studio
                                </Typography>
                            </Box>
                        </Stack>
                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2}>
                            <LocalPhoneOutlinedIcon color="secondary" />
                            <Box>
                                <Typography fontWeight={700}>Phone</Typography>
                                <Typography color="text.secondary">
                                    +48 500 600 700
                                </Typography>
                            </Box>
                        </Stack>
                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2}>
                            <LocationOnOutlinedIcon color="secondary" />
                            <Box>
                                <Typography fontWeight={700}>Studio</Typography>
                                <Typography color="text.secondary">
                                    Luma Main Studio, 124 Creative District
                                </Typography>
                            </Box>
                        </Stack>
                    </Card>
                </Stack>

                <Card>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {isSubmitted ? (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Message sent. This is a demo form, so the message is not
                                delivered to a real mailbox.
                            </Alert>
                        ) : null}

                        <Stack spacing={3}>
                            <TextField label="Full name" />
                            <TextField label="Email" type="email" />
                            <TextField label="Phone" />
                            <TextField label="Message" multiline minRows={5} />

                            <Button
                                variant="contained"
                                onClick={() => setIsSubmitted(true)}
                            >
                                Send message
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}