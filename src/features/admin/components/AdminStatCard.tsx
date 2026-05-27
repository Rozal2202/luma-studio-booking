import { Card, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type AdminStatCardProps = {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
};

export function AdminStatCard({
                                  title,
                                  value,
                                  description,
                                  icon,
                              }: AdminStatCardProps) {
    return (
        <Card sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <div>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {title}
                    </Typography>

                    <Typography variant="h3">{value}</Typography>

                    {description ? (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {description}
                        </Typography>
                    ) : null}
                </div>

                {icon ? (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: '#fed488',
                            color: '#261900',
                            flexShrink: 0,
                        }}
                    >
                        {icon}
                    </Stack>
                ) : null}
            </Stack>
        </Card>
    );
}