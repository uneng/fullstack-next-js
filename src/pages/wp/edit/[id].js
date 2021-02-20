import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage';
import Router from 'next/router';
import Navbar from '../../../components/navbar';

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx);

    const { id } = ctx.query;

    const wpReq = await fetch('http://localhost:3000/api/wp/show/' + id, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
    const res = await wpReq.json();

	return {
		props: {
            token,
            datawp: res.data
        }
	}
}

export default function WpEdit(props) {
    const { datawp } = props;
	const [fields, setFields] = useState({
		nik: datawp.nik,
		npwp: datawp.npwp,
		nama: datawp.nama,
		alamat: datawp.alamat,
		rtrw_wp: datawp.rtwp,
		pos_wp: datawp.pos_wp,
		no_telp: datawp.no_telp,
		kelurahan_id: datawp.kelurahan_id,
	});

	const [status, setStatus] = useState('normal');

	async function updatewpHandler(e) {
		e.preventDefault();
        const { token } = props;

		setStatus('loading');

		const updatewpReq = await fetch('/api/wp/update/' + datawp.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify(fields),
		});
		if (!updatewpReq.ok) return setStatus('error ' + updatewpReq.status);
		const updatewpRes = await updatewpReq.json();
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
			<h1>Edit Wajib Pajak</h1>
			<Navbar />
            <p>WP ID: { datawp.id }</p>
			<form onSubmit={updatewpHandler.bind(this)}>
				<input
					name="nik"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nomor KTP"
                    defaultValue={datawp.nik}
				/>
				<input
					name="npwp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="NPWP"
                    defaultValue={datawp.npwp}
				/>
				<input
					name="nama"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nama"
                    defaultValue={datawp.nama}
				/>
				<input
					name="alamat"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Alamat"
                    defaultValue={datawp.alamat}
				/>
				<input
					name="rtrw_wp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="RTRW"
                    defaultValue={datawp.rtrw_wp}
				/>
				<input
					name="pos_wp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Kode POS"
                    defaultValue={datawp.pos_wp}
				/>
				<input
					name="no_telp"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nomor Kontak"
                    defaultValue={datawp.no_telp}
				/>
				<input
					name="kelurahan_id"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="kelurahan"
                    defaultValue={datawp.kelurahan_id}
				/>
				<button type="submit">Simpan</button>
                <div>Output: {status}</div>
			</form>
		</div>
	);
}