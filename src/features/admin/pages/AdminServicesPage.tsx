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

import type { Service, ServiceCategory } from '../../../models/service';
import {
    createEntityId,
    getServices,
    saveServices,
} from '../../../utils/appDataStorage';

const categoryOptions: Array<{ value: ServiceCategory; label: string }> = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'family', label: 'Family' },
    { value: 'business', label: 'Business' },
    { value: 'product', label: 'Product' },
    { value: 'event', label: 'Event' },
    { value: 'lifestyle', label: 'Lifestyle' },
];

type ServiceFormValues = {
    id?: string;
    slug: string;
    name: string;
    category: ServiceCategory;
    categoryLabel: string;
    shortDescription: string;
    description: string;
    durationLabel: string;
    priceLabel: string;
    isActive: boolean;
    visualLabel: string;
    visualBackground: string;
};

const emptyForm: ServiceFormValues = {
    slug: '',
    name: '',
    category: 'portrait',
    categoryLabel: 'Portrait',
    shortDescription: '',
    description: '',
    durationLabel: '60 mins',
    priceLabel: '500 PLN',
    isActive: true,
    visualLabel: 'Photography service visual',
    visualBackground:
        'linear-gradient(135deg, #111 0%, #303031 45%, #e4e2e2 46%, #f5f3f3 100%)',
};

function createSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replaceAll(' ', '-')
        .replace(/[^a-z0-9-]/g, '');
}

function serviceToForm(service: Service): ServiceFormValues {
    return {
        id: service.id,
        slug: service.slug,
        name: service.name,
        category: service.category,
        categoryLabel: service.categoryLabel,
        shortDescription: service.shortDescription,
        description: service.description,
        durationLabel: service.durationLabel,
        priceLabel: service.priceLabel,
        isActive: service.isActive ?? true,
        visualLabel: service.visual.label,
        visualBackground: service.visual.background,
    };
}

export function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>(() => getServices());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState<ServiceFormValues>(emptyForm);

    const activeServicesCount = useMemo(
        () => services.filter((service) => service.isActive ?? true).length,
        [services]
    );

    function updateForm<K extends keyof ServiceFormValues>(
        field: K,
        value: ServiceFormValues[K]
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    function openCreateDialog() {
        setForm(emptyForm);
        setIsDialogOpen(true);
    }

    function openEditDialog(service: Service) {
        setForm(serviceToForm(service));
        setIsDialogOpen(true);
    }

    function handleSave() {
        const categoryLabel =
            categoryOptions.find((category) => category.value === form.category)?.label ??
            form.categoryLabel;

        const nextService: Service = {
            id: form.id ?? createEntityId('service'),
            slug: form.slug || createSlug(form.name),
            name: form.name,
            category: form.category,
            categoryLabel,
            shortDescription: form.shortDescription,
            description: form.description,
            durationLabel: form.durationLabel,
            priceLabel: form.priceLabel,
            isActive: form.isActive,
            visual: {
                label: form.visualLabel,
                background: form.visualBackground,
            },
        };

        const nextServices = form.id
            ? services.map((service) =>
                service.id === form.id ? nextService : service
            )
            : [nextService, ...services];

        setServices(nextServices);
        saveServices(nextServices);
        setIsDialogOpen(false);
    }

    function toggleServiceActive(service: Service) {
        const nextServices = services.map((currentService) =>
            currentService.id === service.id
                ? {
                    ...currentService,
                    isActive: !(currentService.isActive ?? true),
                }
                : currentService
        );

        setServices(nextServices);
        saveServices(nextServices);
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
                        Services
                    </Typography>

                    <Typography color="text.secondary">
                        Manage photography services visible in the public booking flow.
                    </Typography>
                </Box>

                <Button variant="contained" onClick={openCreateDialog}>
                    Add service
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
                    <Typography color="text.secondary">All services</Typography>
                    <Typography variant="h3">{services.length}</Typography>
                </Card>

                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">Active services</Typography>
                    <Typography variant="h3">{activeServicesCount}</Typography>
                </Card>

                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">Inactive services</Typography>
                    <Typography variant="h3">
                        {services.length - activeServicesCount}
                    </Typography>
                </Card>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
                    gap: 3,
                }}
            >
                {services.map((service) => {
                    const isActive = service.isActive ?? true;

                    return (
                        <Card key={service.id} sx={{ overflow: 'hidden' }}>
                            <Box
                                role="img"
                                aria-label={service.visual.label}
                                sx={{
                                    height: 180,
                                    background: service.visual.background,
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
                                        <Typography variant="h3">{service.name}</Typography>
                                        <Typography color="text.secondary">
                                            {service.durationLabel} • {service.priceLabel}
                                        </Typography>
                                    </Box>

                                    <Chip
                                        label={isActive ? 'Active' : 'Inactive'}
                                        color={isActive ? 'success' : 'default'}
                                    />
                                </Stack>

                                <Typography color="text.secondary" sx={{ mb: 3 }}>
                                    {service.shortDescription}
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => openEditDialog(service)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="text"
                                        color={isActive ? 'error' : 'secondary'}
                                        onClick={() => toggleServiceActive(service)}
                                    >
                                        {isActive ? 'Deactivate' : 'Activate'}
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
                    {form.id ? 'Edit service' : 'Add service'}
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
                            label="Service name"
                            value={form.name}
                            onChange={(event) => updateForm('name', event.target.value)}
                        />

                        <TextField
                            label="Slug"
                            value={form.slug}
                            placeholder="business-headshots"
                            onChange={(event) => updateForm('slug', event.target.value)}
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
                            label="Duration"
                            value={form.durationLabel}
                            onChange={(event) =>
                                updateForm('durationLabel', event.target.value)
                            }
                        />

                        <TextField
                            label="Price"
                            value={form.priceLabel}
                            onChange={(event) =>
                                updateForm('priceLabel', event.target.value)
                            }
                        />

                        <TextField
                            label="Visual label"
                            value={form.visualLabel}
                            onChange={(event) =>
                                updateForm('visualLabel', event.target.value)
                            }
                        />

                        <TextField
                            label="Short description"
                            multiline
                            minRows={3}
                            value={form.shortDescription}
                            onChange={(event) =>
                                updateForm('shortDescription', event.target.value)
                            }
                            sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                        />

                        <TextField
                            label="Full description"
                            multiline
                            minRows={4}
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
                                    checked={form.isActive}
                                    onChange={(event) =>
                                        updateForm('isActive', event.target.checked)
                                    }
                                />
                            }
                            label="Service is active"
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!form.name || !form.shortDescription}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}