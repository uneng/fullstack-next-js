import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage';
import Router from 'next/router';
import Navbar from '../../components/navbar';

export async function getServerSideProps(ctx) {
	const { token } = await authPage(ctx);

	const wpReq = await fetch('http://localhost:3000/api/wp', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	const datawp = await wpReq.json();

	return {
		props: {
			token,
			datawp: datawp.data,
		},
	};
}
export default function WpIndex(props) {
	const [datawp, setDatawp] = useState(props.datawp);
	async function hapusHandler(id, e) {
		e.preventDefault();
		const { token } = props;
		const ask = confirm('Yakin data ini dihapus...?');
		if (ask) {
			const hapuswp = await fetch('/api/wp/delete/' + id, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			const res = await hapuswp.json();

			const datawpFiltered = datawp.filter((wp) => {
				return wp.id !== id && wp;
			});
			setDatawp(datawpFiltered);
		}
	}

	function editHandler(id) {
		Router.push('/wp/edit/' + id);
	}

	return (
		<div>
			<h1>Halaman Wajib Pajak</h1>
			<Navbar />
			{datawp.map((wp) => (
				<div key={wp.id}>
					<p>{wp.nik}</p>
					<p>{wp.npwp}</p>
					<p>{wp.nama}</p>
					<p>{wp.alamat}</p>
					<div>
						<button onClick={editHandler.bind(this, wp.id)}>Edit</button>
						<button onClick={hapusHandler.bind(this, wp.id)}>Hapus</button>
					</div>
					<hr />
				</div>
			))}
		</div>
	);
}
