import { sleep } from 'k6';
import { generateClientId } from '../utils/common.js';
import { getInstantToken, login } from '../utils/auth.js';

// ✅ Load users.json properly
const users = JSON.parse(open('../data/users.json'));

export default function () {

    const clientId = generateClientId();
    console.log("ClientId: " + clientId);

    // Step 1: Get Instant Token
    const instantToken = getInstantToken(clientId);
    console.log("instantToken from logintest is " + instantToken);

    // Step 2: Login
    const user = users[0];   // ✅ Now this works

    console.log("user from logintest is " + JSON.stringify(user));

    const loginToken = login(clientId, instantToken, user);

    console.log("Login Token: " + loginToken);

    sleep(1);
}