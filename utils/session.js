import { generateClientId } from './common.js';
import {
    getInstantToken,
    login,
    getWebAccessToken,
    updateWebToken,
    getServiceAuthToken
} from './auth.js';

export function createSession(user) {

    const clientId = generateClientId();

    const instantToken = getInstantToken(clientId);
    const loginToken = login(clientId, instantToken, user);
    const webToken = getWebAccessToken(clientId, loginToken, user);
    const webTokenId = updateWebToken(clientId, loginToken, webToken);
    const finalToken = getServiceAuthToken(clientId, loginToken, webTokenId, user);

    return {
        clientId,
        token: finalToken
    };
}