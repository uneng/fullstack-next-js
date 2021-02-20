import db from '../../../libs/db';
export default async function handler(req, res){
    if (req.method !== 'GET') return res.status(405).end();
    const data = await db('kabupaten');
    res.status(200);
    res.json(data);
}