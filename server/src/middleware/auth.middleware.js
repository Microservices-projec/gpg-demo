import { readAccessToken, verifyToken } from '../lib/jwt.js';


export function authMiddleware(req, res, next) {
const token = readAccessToken(req);
if (!token) return res.status(401).json({ error: 'Not authenticated' });
try {
req.user = verifyToken(token);
return next();
} catch (e) {
return res.status(401).json({ error: 'Invalid/expired session' });
}
}