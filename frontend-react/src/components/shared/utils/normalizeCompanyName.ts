export function normalizeCompanyName (name?: string | null) {
    return	(name || '').toLowerCase().replace(/\s+/g, ' ').trim()
}