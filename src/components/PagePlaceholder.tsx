import { Box, Typography } from '@mui/material';

type PagePlaceholderProps = {
    title: string;
    description?: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Typography variant="h1" sx={{ mb: 2 }}>
                {title}
            </Typography>

            {description ? (
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
                    {description}
                </Typography>
            ) : null}
        </Box>
    );
}