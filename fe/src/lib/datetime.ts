export function formatDate(value: string, style: 'long' | 'short' = 'short') {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? 'Date unavailable'
        : new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: style,
              timeZone: 'Asia/Jakarta',
              year: 'numeric',
          }).format(date);
}
export function readingTime(body: null | string | undefined) {
    return Math.max(
        1,
        Math.ceil((body?.trim().split(/\s+/).length ?? 0) / 200)
    );
}
