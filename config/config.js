const ENV = __ENV.ENV || 'test';

export const BASE_URL =
    ENV === 'uat'
        ? 'https://uat.bijib.in'
        : 'https://test.bijib.in';

export const ENDPOINTS = {
    INSTANT_TOKEN: '/auth-node/instant_token',
    LOGIN: '/auth-node/login',
    WEB_ACCESS_TOKEN: '/auth-node/web_access_token',
    SERVICE_AUTH_TOKEN: '/auth-node/service_auth_token'
};