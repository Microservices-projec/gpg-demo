import jwt from 'jsonwebtoken';
const ACCESS_COOKIE = 'access_token';


export function signAccessToken(payload) {
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


export function setAuthCookie(res, token) {
res.cookie(ACCESS_COOKIE, token, {
httpOnly: true,
sameSite: 'lax',
secure: false, // set true behind HTTPS in prod
maxAge: 60 * 60 * 1000
});
}


export function clearAuthCookie(res) {
res.clearCookie(ACCESS_COOKIE);
}


export function readAccessToken(req) {
return req.cookies[ACCESS_COOKIE] || null;
}


export function verifyToken(token) {
return jwt.verify(token, process.env.JWT_SECRET);
}