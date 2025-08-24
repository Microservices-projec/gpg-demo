import { getUserData, patchUserData } from '../services/userData.service.js';


export async function whoAmI(req, res) {
res.json({ user: { id: req.user.uid } });
}


export async function getData(req, res) {
const data = await getUserData(req.user.uid);
res.json({ data });
}


export async function updateData(req, res) {
const patch = req.body || {};
const data = await patchUserData(req.user.uid, patch);
res.json({ data });
}