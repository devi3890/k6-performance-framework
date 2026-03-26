// 🔹 Web Access Token API
function getWebAccessToken(clientId, loginToken) {

    const payload = JSON.stringify({
        memberid: "sc14c1499e1a370f",
        sid: 39,
        sesuid: 0,
        role_id: 121,
        hid: 172,
        login_access_type: 3
    });

    const headers = {
        "responseType": "json",
        "Authorization": "Basic YWRtaW46YWRtaW4=",
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "client-id": clientId,
        "x-access-token": loginToken   // 🔥 token from login
    };

    const res = http.post(
        `${BASE_URL}/auth-node/web_access_token`,
        payload,
        { headers }
    );

    try {
        console.log("[WebAccessToken] JSON:", JSON.stringify(res.json()));
    } catch (e) {
        console.log("[WebAccessToken] JSON parse error");
    }

    return res.json('web_token'); // 🔍 adjust if key is different
}