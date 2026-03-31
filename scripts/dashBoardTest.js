import http from 'k6/http';
import { sleep } from 'k6';
import { createLoginSession } from '../utils/session.js';
import { BASE_URL, ENDPOINTS } from '../config/config.js';
import { getAuthHeaders } from '../utils/headers.js';

const users = JSON.parse(open('../data/users.json'));

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {

    const user = users[0];

    // ✅ Only login
    const { clientId, loginToken } = createLoginSession(user);

    const headers = getAuthHeaders(clientId, loginToken);

    // 🔹 UMS APIs
    http.post(`${BASE_URL}/auth-v2-node/profile/gp`,
        JSON.stringify({ memberid: user.memberid }),
        { headers }
    );

    http.post(`${BASE_URL}/auth-v2-node/db/utr`,
        JSON.stringify({ memberid: user.memberid, hospital_id: 172 }),
        { headers }
    );

    http.post(`${BASE_URL}/auth-v2-node/db/grid`,
        JSON.stringify({ memberid: user.memberid, is_ums_dashboard: 1, live_status: 0 }),
        { headers }
    );

    http.post(`${BASE_URL}/auth-v2-node/gc/details`,
        JSON.stringify({ memberid: user.memberid }),
        { headers }
    );

    http.post(`${BASE_URL}/auth-v2-node/profile/gsu`,
        JSON.stringify({ memberid: user.memberid }),
        { headers }
    );

    http.post(`${BASE_URL}/auth-v2-node/db/bs`,
        JSON.stringify({
            start_date: "2026-02-23",
            end_date: "2026-04-05",
            memberid: user.memberid,
            calendar_type: 3,
            grp_flag: 0,
            group_id: 21
        }),
        { headers }
    );

    sleep(1);
}