import { loginWithGoogle } from '../services/auth.service.js';
import { clearAuthCookie } from '../lib/jwt.js';


export async function googleLogin(req, res) {
try {
const { idToken } = req.body;
if (!idToken) return res.status(400).json({ error: 'Missing idToken' });
const user = await loginWithGoogle(idToken, res);
res.json({ user });
} catch (e) {
console.error(e);
res.status(401).json({ error: 'Invalid Google token' });
}
}


export function logout(req, res) {
clearAuthCookie(res);
res.json({ ok: true });
}