export const oktaConfig = {
    clientId: '0oagl798wyJidyjiq5d7',
    issuer: 'https://dev-18763008.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}