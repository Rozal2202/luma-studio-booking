export function formatDateTimeRange(startAt: string, endAt: string) {
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    const date = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(startDate);

    const startTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(startDate);

    const endTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(endDate);

    return `${date}, ${startTime} - ${endTime}`;
}