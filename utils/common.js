export function generateClientId() {
    return Math.random().toString(36).slice(2).toUpperCase();
}