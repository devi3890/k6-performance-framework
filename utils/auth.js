import http from 'k6/http';
import { BASE_URL, ENDPOINTS } from '../config/config.js';
import { getCommonHeaders, getAuthHeaders } from './headers.js';

// 🔹 1. Instant Token
export function getInstantToken(clientId) {

    const payload = JSON.stringify({
        host: "",
        ip: "127.0.0.1"
    });

    const headers = {
        ...getCommonHeaders(clientId),
        "skip-ip-check": "1"
    };

    const res = http.post(`${BASE_URL}${ENDPOINTS.INSTANT_TOKEN}`, payload, { headers });

    return res.json('token');
}


// 🔹 2. Login
export function login(clientId, instantToken, user) {

    const payload = JSON.stringify({
        uname: user.username,
        upwd: user.password,
        device_id: "127.0.0.1",
        device_os: "Mac OS - firefox - 102.0.0",
        device_type: 3
    });

    const headers = getAuthHeaders(clientId, instantToken);

    const res = http.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, payload, { headers });

    return res.json('data'); // login token
}


// 🔹 3. Web Access Token
export function getWebAccessToken(clientId, loginToken, user) {

    const payload = JSON.stringify({
        memberid: user.memberid,
        sid: 39,
        sesuid: 0,
        role_id: 121,
        hid: 172,
        login_access_type: 3
    });

    const headers = getAuthHeaders(clientId, loginToken);

    const res = http.post(`${BASE_URL}${ENDPOINTS.WEB_ACCESS_TOKEN}`, payload, { headers });

    return res.json('web_token');
}


// 🔹 4. Update Web Token
export function updateWebToken(clientId, loginToken, webToken) {

    const payload = JSON.stringify({
        access_code: webToken
    });

    const headers = getAuthHeaders(clientId, loginToken);

    const res = http.put(`${BASE_URL}${ENDPOINTS.WEB_ACCESS_TOKEN}`, payload, { headers });

    return res.json('data.id');
}


// 🔹 5. Service Auth Token (FINAL TOKEN)
export function getServiceAuthToken(clientId, loginToken, webTokenId, user) {

    const payload = JSON.stringify({
        id: webTokenId,
        memberid: user.memberid,
        hid: 121,
        sid: 39,
        sesuid: 0,
        role_id: 21,
        login_access_type: 3
    });

    const headers = getAuthHeaders(clientId, loginToken);

    const res = http.post(`${BASE_URL}${ENDPOINTS.SERVICE_AUTH_TOKEN}`, payload, { headers });

    return res.json('data'); // FINAL TOKEN
}