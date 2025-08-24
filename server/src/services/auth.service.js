import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../lib/prisma.js';
import { signAccessToken, setAuthCookie } from '../lib/jwt.js';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export async function verifyGoogleIdToken(idToken) {
const ticket = await client.verifyIdToken({
idToken,
audience: process.env.GOOGLE_CLIENT_ID
});
const p = ticket.getPayload();
return { sub: p.sub, email: p.email, name: p.name, picture: p.picture };
}


export async function loginWithGoogle(idToken, res) {
const profile = await verifyGoogleIdToken(idToken);


// upsert user
const user = await prisma.user.upsert({
where: { googleSub: profile.sub },
update: { email: profile.email, name: profile.name, picture: profile.picture },
create: {
googleSub: profile.sub,
email: profile.email,
name: profile.name,
picture: profile.picture,
userData: { create: {} }
}
});


const token = signAccessToken({ uid: user.id, sub: user.googleSub });
setAuthCookie(res, token);


return { id: user.id, email: user.email, name: user.name, picture: user.picture };
}