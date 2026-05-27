import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

import type { PortfolioItem } from '../../../models/portfolio';
import type { ServiceCategory } from '../../../models/service';
import {
    createEntityId,
    getPortfolioItems,
    savePortfolioItems,
} from '../../../utils/appDataStorage';

const categoryOptions: Array<{ value: ServiceCategory; label: string }> = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'family', label: 'Family' },
    { value: 'business', label: 'Business' },
    { value: 'product', label: 'Product' },
    { value: 'event', label: 'Event' },
    { value: 'lifestyle', label: 'Lifestyle' },
];

type PortfolioFormValues = {
    id?: string;
    title: string;
    category: ServiceCategory;
    categoryLabel: string;
    description: string;
    visualAlt: string;
    visualBackground: string;
    isVisible: boolean;
    displayOrder: number;
};

const emptyForm: PortfolioFormValues = {
    title: '',
    category: 'portrait',
    categoryLabel: 'Portrait',
    description: '',
    visualAlt: 'Photography portfolio image',
    visualBackground:
        'radial-gradient(circle at 35% 35%, #e4e2e2 0%, #747878 26%, #303031 52%, #111 100%)',
    isVisible: true,
    displayOrder: 1,
};

function portfolioItemToForm(item: PortfolioItem): PortfolioFormValues {
    return {
        id: item.id,
        title: item.title,
        category: item.category,
        categoryLabel: item.categoryLabel,
        description: item.description,
        visualAlt: item.visual.alt,
        visualBackground: item.visual.background,
        isVisible: item.isVisible ?? true,
        displayOrder: item.displayOrder ?? 1,
    };
}

export function AdminPortfolioPage() {
    const [items, setItems] = useState<PortfolioItem[]>(() => getPortfolioItems());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState<PortfolioFormValues>(emptyForm);

    const visibleItemsCount = useMemo(
        () => items.filter((item) => item.isVisible ?? true).length,
        [items]
    );

    function updateForm<K extends keyof PortfolioFormValues>(
        field: K,
        value: PortfolioFormValues[K]
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function openCreateDialog() {
        setForm({
            ...emptyForm,
            displayOrder: items.length + 1,
        });
        setIsDialogOpen(true);
    }

    function openEditDialog(item: PortfolioItem) {
        setForm(portfolioItemToForm(item));
        setIsDialogOpen(true);
    }

    function handleSave() {
        const categoryLabel =
            categoryOptions.find((category) => category.value === form.category)?.label ??
            form.categoryLabel;

        const nextItem: PortfolioItem = {
            id: form.id ?? createEntityId('portfolio'),
            title: form.title,
            category: form.category,
            categoryLabel,
            description: form.description,
            isVisible: form.isVisible,
            displayOrder: form.displayOrder,
            visual: {
                alt: form.visualAlt,
                background: form.visualBackground,
            },
        };

        const nextItems = form.id
            ? items.map((item) => (item.id === form.id ? nextItem : item))
            : [nextItem, ...items];

        setItems(nextItems);
        savePortfolioItems(nextItems);
        setIsDialogOpen(false);
    }

    function toggleVisibility(item: PortfolioItem) {
        const nextItems = items.map((currentItem) =>
            currentItem.id === item.id
                ? {
                    ...currentItem,
                    isVisible: !(currentItem.isVisible ?? true),
                }
                : currentItem
        );

        setItems(nextItems);
        savePortfolioItems(nextItems);
    }

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                spacing={3}
                sx={{ mb: 5 }}
            >
                <Box>
                    <Typography variant="h1" sx={{ mb: 1 }}>
                        Portfolio
                    </Typography>

                    <Typography color="text.secondary">
                        Manage portfolio items displayed on the public portfolio page.
                    </Typography>
                </Box>

                <Button variant="contained" onClick={openCreateDialog}>
                    Add portfolio item
                </Button>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 3,
                    mb: 4,
                }}
            >
                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">All items</Typography>
                    <Typography variant="h3">{items.length}</Typography>
                </Card>

                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">Visible</Typography>
                    <Typography variant="h3">{visibleItemsCount}</Typography>
                </Card>

                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">Hidden</Typography>
                    <Typography variant="h3">
                        {items.length - visibleItemsCount}
                    </Typography>
                </Card>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
                    gap: 3,
                }}
            >
                {items
                    .slice()
                    .sort(
                        (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
                    )
                    .map((item) => {
                        const isVisible = item.isVisible ?? true;

                        return (
                            <Card key={item.id} sx={{ overflow: 'hidden' }}>
                                <Box
                                    role="img"
                                    aria-label={item.visual.alt}
                                    sx={{
                                        height: 220,
                                        background: item.visual.background,
                                    }}
                                />

                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={2}
                                        sx={{ mb: 2 }}
                                    >
                                        <Box>
                                            <Typography variant="h4">{item.title}</Typography>
                                            <Typography color="text.secondary">
                                                {item.categoryLabel}
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={isVisible ? 'Visible' : 'Hidden'}
                                            color={isVisible ? 'success' : 'default'}
                                        />
                                    </Stack>

                                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                                        {item.description}
                                    </Typography>

                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => openEditDialog(item)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="text"
                                            color={isVisible ? 'error' : 'secondary'}
                                            onClick={() => toggleVisibility(item)}
                                        >
                                            {isVisible ? 'Hide' : 'Show'}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}
            </Box>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {form.id ? 'Edit portfolio item' : 'Add portfolio item'}
                </DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                            gap: 3,
                            pt: 2,
                        }}
                    >
                        <TextField
                            label="Title"
                            value={form.title}
                            onChange={(event) => updateForm('title', event.target.value)}
                        />

                        <TextField
                            select
                            label="Category"
                            value={form.category}
                            onChange={(event) => {
                                const category = event.target.value as ServiceCategory;
                                const label =
                                    categoryOptions.find((option) => option.value === category)
                                        ?.label ?? category;

                                updateForm('category', category);
                                updateForm('categoryLabel', label);
                            }}
                        >
                            {categoryOptions.map((category) => (
                                <MenuItem key={category.value} value={category.value}>
                                    {category.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Display order"
                            type="number"
                            value={form.displayOrder}
                            onChange={(event) =>
                                updateForm('displayOrder', Number(event.target.value))
                            }
                        />

                        <TextField
                            label="Alt text"
                            value={form.visualAlt}
                            onChange={(event) =>
                                updateForm('visualAlt', event.target.value)
                            }
                        />

                        <TextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={form.description}
                            onChange={(event) =>
                                updateForm('description', event.target.value)
                            }
                            sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                        />

                        <TextField
                            label="Visual background CSS"
                            multiline
                            minRows={3}
                            value={form.visualBackground}
                            onChange={(event) =>
                                updateForm('visualBackground', event.target.value)
                            }
                            sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.isVisible}
                                    onChange={(event) =>
                                        updateForm('isVisible', event.target.checked)
                                    }
                                />
                            }
                            label="Item is visible"
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!form.title || !form.description}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}