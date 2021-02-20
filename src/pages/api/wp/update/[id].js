import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
	if (req.method !== 'PUT') return res.status(405).end();
	const auth = await authorization(req, res);
	const { id } = req.query;
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
	const update = await db('data_wp').where({ id }).update({
		nik,
		npwp,
		nama,
		alamat,
		kelurahan_id,
		rtrw_wp,
		pos_wp,
		no_telp,
		// image_ktp_pat: image,
		user_id:auth.id
	});
    const updatedData = await db('data_wp').where({ id }).first();
	res.status(200);
	res.json({
		pesan: 'Data sukses diupdate...',
        data: updatedData
	});
}
