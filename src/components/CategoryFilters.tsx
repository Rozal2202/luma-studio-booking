import { Stack, Button } from '@mui/material';

export type CategoryFilterOption<T extends string> = {
    value: T;
    label: string;
};

type CategoryFiltersProps<T extends string> = {
    options: CategoryFilterOption<T>[];
    selected: T;
    onChange: (value: T) => void;
};

export function CategoryFilters<T extends string>({
                                                      options,
                                                      selected,
                                                      onChange,
                                                  }: CategoryFiltersProps<T>) {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: { xs: 4, md: 6 } }}
        >
            {options.map((option) => {
                const isActive = selected === option.value;

                return (
                    <Button
                        key={option.value}
                        variant={isActive ? 'contained' : 'outlined'}
                        color={isActive ? 'primary' : 'inherit'}
                        onClick={() => onChange(option.value)}
                        sx={{
                            minWidth: 88,
                            bgcolor: isActive ? 'primary.main' : 'background.default',
                        }}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </Stack>
    );
}