import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage';
import Router from 'next/router';
import Navbar from '../../components/navbar';

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx);

	return {
		props: {
            token
        }
	}
}

export default function WpCreate(props) {
	const [fields, setFields] = useState({
		nik: '',
		npwp: '',
		nama: '',
		alamat: '',
		rtrw_wp: '',
		pos_wp: '',
		no_telp: '',
		kelurahan_id: '',
	});

	const [status, setStatus] = useState('normal');

	async function createdwpHandler(e) {
		e.preventDefault();
        const { token } = props;

		setStatus('loading');

		const createwpReq = await fetch('/api/wp/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify(fields),
		});
		if (!createwpReq.ok) return setStatus('error ' + createwpReq.status);
		const createwpRes = await createwpReq.json();
		setStatus('Data berhasil disimpan...');
        Router.push('/wp');
	}

	function fieldHandler(e) {
		const name = e.target.getAttribute('name');
		setFields({
			...fields,
			[name]: e.target.value,
		});
	}

	return (
		<div>
			<h1>Create Wajib Pajak</h1>
			<Navbar />
			<form onSubmit={createdwpHandler.bind(this)}>
				<input
					name="nik"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nomor KTP"
				/>
				<input
					name="npwp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="NPWP"
				/>
				<input
					name="nama"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nama"
				/>
				<input
					name="alamat"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Alamat"
				/>
				<input
					name="rtrw_wp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="RTRW"
				/>
				<input
					name="pos_wp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Kode POS"
				/>
				<input
					name="no_telp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nomor Kontak"
				/>
				<input
					name="kelurahan_id"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="kelurahan"
				/>
				<button type="submit">Simpan</button>
                <div>Output: {status}</div>
			</form>
		</div>
	);
}
