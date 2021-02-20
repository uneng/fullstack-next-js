import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();
	const auth = await authorization(req, res);
	const {
		nik,
		npwp,
		nama,
		alamat,
		kelurahan_id,
		rtrw_wp,
		pos_wp,
		no_telp,
		// image,
	} = req.body;
	const create = await db('data_wp').insert({
		nik,
		npwp,
		nama,
		alamat,
		kelurahan_id,
		rtrw_wp,
		pos_wp,
		no_telp,
		// image_ktp_pat: image,
		user_id: auth.id
	});
    const createdData = await db('data_wp').where({id: create}).first();
	res.status(200);
	res.json({
		pesan: 'Data sukses disimpan...',
		data: createdData,
	});
}
