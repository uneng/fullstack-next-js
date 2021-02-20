import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();
	const { username, password } = req.body;

	const checkUsername = await db('users')
		.where({ username })
		.orWhere({ email: username })
		.first();
	if (!checkUsername) return res.status(401).end();

	const checkPassword = await bcrypt.compare(password, checkUsername.password);
	if (!checkPassword) return res.status(401).end();

	const token = jwt.sign(
		{
			id: checkUsername.id,
			username: checkUsername.username,
			email: checkUsername.email
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		}
	);
	res.status(200);
	res.json({
		pesan: 'Login sukses',
		token,
	});
}
