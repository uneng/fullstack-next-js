import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res){
    if (req.method !== 'POST') return res.status(405).end();

    const { username, email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const register = await db('users').insert({
        username,
        email,
        name,
        password:passwordHash
    });

    const registeredUser = await db('users').where({id: register});
    res.status(200);
    res.json({
        pesan: 'Register sukses',
        data: registeredUser
    });
}

