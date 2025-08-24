import { prisma } from '../lib/prisma.js';


export async function getUserData(uid) {
const data = await prisma.userData.findUnique({ where: { userId: uid } });
return data;
}


export async function patchUserData(uid, patch) {
// Patch strategy: merge blogs (append) and increment score/xp/level if provided
const current = await prisma.userData.findUnique({ where: { userId: uid } });
const nextBlogs = [ ...(current?.blogs || []), ...((patch.blogs) || []) ];


const next = await prisma.userData.update({
where: { userId: uid },
data: {
blogs: nextBlogs,
score: (current?.score || 0) + (patch.score || 0),
xp: (current?.xp || 0) + (patch.xp || 0),
level: patch.level ?? (current?.level || 1)
}
});
return next;
}