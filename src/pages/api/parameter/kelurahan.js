import db from '../../../libs/db';

export default async function handler(req, res){
    if (req.method !== 'POST') return res.status(405).end();

    let kecamatan = req.body.kecamatan_id;
    const data = await db('kelurahan').where('kecamatan_id', kecamatan);
    res.status(200);
    res.json(data);
}