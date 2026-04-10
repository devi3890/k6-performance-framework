import http from 'k6/http';
import { sleep } from 'k6';
import { createServiceSession } from '../utils/session.js';  // ✅ changed
import { BASE_URL } from '../config/config.js';
import { getAuthHeaders } from '../utils/headers.js';
import { options } from '../config/config.js';

export { options };

const users = JSON.parse(open('../data/users.json'));

export default function () {

    const user = users[0];

    // ✅ Use service session (final token)
    const { clientId, token } = createServiceSession(user);

    // ✅ Pass final token
    const headers = getAuthHeaders(clientId, token);

    // 🔹 1. User Theme
    http.post(`${BASE_URL}/beeway-node/masters/user_theme/details`,
        JSON.stringify({ hospital_id: 172 }),
        { headers }
    );

    // 🔹 2. Sidebar Links
    http.post(`${BASE_URL}/auth-node/servicesidebarlinks`,
        JSON.stringify({
            hid: 172,
            sid: 45,
            sesuid: 24,
            role_id: 21,
            memberid: user.memberid
        }),
        { headers }
    );

    // 🔹 3. Subservices Departments
    http.post(`${BASE_URL}/ums-node/ums/hosdeptwards/getRosterAllSubservicesDepts`,
        JSON.stringify({
            hid: 172,
            service_id: 45,
            flag: 1,
            role_id: 21,
            memberid: user.memberid,
            sesuids: [24, 23, 25, 26, 27]
        }),
        { headers }
    );

    // 🔹 4. User Data
    http.post(`${BASE_URL}/ums-node/ums/common/user_data`,
        JSON.stringify({
            memberid: user.memberid,
            sid: 45
        }),
        { headers }
    );

    // 🔹 5. Participating Roles
    http.post(`${BASE_URL}/beeway-nbh-node/settings/participating_roles/details`,
        JSON.stringify({
            hospital_id: 172,
            sub_service_id: 24,
            role_type: 2
        }),
        { headers }
    );

    // 🔹 6. User Theme (NBH)
    http.post(`${BASE_URL}/beeway-nbh-node/masters/user_theme/details`,
        JSON.stringify({ hospital_id: 172 }),
        { headers }
    );

    // 🔹 7. Hospital Users
    http.post(`${BASE_URL}/beeway-nbh-node/masters/users/hos`,
        JSON.stringify({ hospital_id: 172 }),
        { headers }
    );

    // 🔹 8. Widget Selection
    http.post(`${BASE_URL}/beeway-nbh-node/settings/users_widget_selection/details`,
        JSON.stringify({
            hospital_id: 172,
            memberid: user.memberid
        }),
        { headers }
    );

    // 🔹 9. Resource Count Settings
    http.post(`${BASE_URL}/beeway-nbh-node/settings/resource_count_settings/getactivehospitalswithsettings`,
        JSON.stringify({
            hospital_id: 172,
            sub_service_id: 24
        }),
        { headers }
    );

    // 🔹 10. Frequent Search Calendar
    http.post(`${BASE_URL}/beeway-nbh-node/workschedule/frequent_search_calendar/details`,
        JSON.stringify({
            hospital_id: 172,
            login_memberid: user.memberid,
            sub_service_id: 24
        }),
        { headers }
    );

    // 🔹 11. Calendar Settings
    http.post(`${BASE_URL}/beeway-nbh-node/v2/dashboard/calender_stngs`,
        JSON.stringify({
            hospital_id: 172,
            sub_service_id: 24,
            start_date: "2026-02-16",
            end_date: "2026-03-01"
        }),
        { headers }
    );

    // 🔹 12. Dashboard Details
    http.post(`${BASE_URL}/beeway-nbh-node/v2/dashboard/details`,
        JSON.stringify({
            hospital_id: 172,
            memberid: user.memberid,
            is_announcements: true,
            is_statistics: true,
            is_quickLinks: true,
            is_aopshifts: true,
            is_mopshifts: true,
            is_aspoints: true,
            is_admin: true
        }),
        { headers }
    );

    sleep(1);
}