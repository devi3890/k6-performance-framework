// 🔹 Common headers (before login)
export function getCommonHeaders(clientId) {
    return {
        "Authorization": "Basic YWRtaW46YWRtaW4=",
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "client-id": clientId,
        "User-Agent": "k6-performance-test"
    };
}

// 🔹 Headers after token
export function getAuthHeaders(clientId, token) {
    return {
        ...getCommonHeaders(clientId),
        "x-access-token": token,
        "skip-ip-check": "1"
    };
}