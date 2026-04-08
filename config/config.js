// -------- ENV --------
export const ENV = __ENV.ENV || 'test';

// -------- BASE URL --------
export const BASE_URLS = {
    test: 'https://test.bijib.in',
    uat: 'https://uat.bijib.in'
};

export const BASE_URL = BASE_URLS[ENV];

// -------- ENDPOINTS --------
export const ENDPOINTS = {
    INSTANT_TOKEN: '/auth-node/instant_token',
    LOGIN: '/auth-node/login',
    WEB_ACCESS_TOKEN: '/auth-node/web_access_token',
    SERVICE_AUTH_TOKEN: '/auth-node/service_auth_token'
};

// -------- PERFORMANCE OPTIONS --------
export const options = {
    vus: Number(__ENV.VUS) || 1,
    duration: __ENV.DURATION || '1m',
};