import { Box, Typography } from '@mui/material';

type SectionHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    centered?: boolean;
};

export function SectionHeader({
                                  eyebrow,
                                  title,
                                  description,
                                  centered = false,
                              }: SectionHeaderProps) {
    return (
        <Box
            sx={{
                textAlign: centered ? 'center' : 'left',
                maxWidth: centered ? 720 : 760,
                mx: centered ? 'auto' : 0,
                mb: { xs: 4, md: 6 },
            }}
        >
            {eyebrow ? (
                <Typography
                    variant="overline"
                    sx={{
                        color: 'secondary.main',
                        letterSpacing: '0.16em',
                        fontWeight: 700,
                    }}
                >
                    {eyebrow}
                </Typography>
            ) : null}

            <Typography variant="h2" sx={{ mt: eyebrow ? 1 : 0, mb: 2 }}>
                {title}
            </Typography>

            {description ? (
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            ) : null}
        </Box>
    );
}