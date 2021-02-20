import db from '../../../libs/db';

export default async function handler(req, res) {
	if (req.method == 'POST') {
		const kabupaten = req.body.kabupaten_id;
		const wp = await db('kecamatan').where('kabupaten_id', kabupaten);
		res.status(200);
		res.json(wp);
	} else if (req.method == 'GET') {
		const op = await db('kecamatan').where('kabupaten_id', 7504);
		res.status(200);
		res.json(op);
	}else return res.status(405).end();
}
