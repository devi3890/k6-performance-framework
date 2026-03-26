import { sleep } from 'k6';
import { createSession } from '../utils/session.js';
import { getAuthHeaders } from '../utils/headers.js';

// Load users
const users = JSON.parse(open('../data/users.json'));

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {

    // 🔹 Random user
    const user = users[0];

    // 🔹 Full auth flow
    const { clientId, token } = createSession(user);

    console.log("Final Token:", token);

    // 🔹 Common headers for ALL APIs
    const headers = getAuthHeaders(clientId, token);

    // 👉 Example API call
    // http.get(`${BASE_URL}/some-api`, { headers });

    sleep(1);
}