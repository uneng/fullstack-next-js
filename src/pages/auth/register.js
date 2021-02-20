import React, { useState } from 'react';
import Link from 'next/link';
import { unauthPage } from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx){
	await unauthPage(ctx);
	return { props: {} }
}
export default function Register() {
	const [fields, setFields] = useState({
		username: '',
		email: '',
		name: '',
		password: '',
	});

	const [status, setStatus] = useState('normal');

	async function registerHandler(e) {
		e.preventDefault();

		setStatus('loading');

		const registerReq = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fields)
		});
		if (!registerReq.ok) return setStatus('error ' + registerReq.status);
		const registerRes = await registerReq.json();
		setStatus('Register sukses');
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
			<h1>Register</h1>
			<form onSubmit={registerHandler.bind(this)}>
				<input
					name="username"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Username"
				/>
				<input
					name="email"
					onChange={fieldHandler.bind(this)}
					type="email"
					placeholder="Email address"
				/>
				<input
					name="name"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Nama lengkap"
				/>
				<input
					name="password"
					onChange={fieldHandler.bind(this)}
					type="password"
					placeholder="Password"
				/>
				<button type="submit">Register</button>
                <div>Output: {status}</div>
				<Link href="/auth/login"><a>Login</a></Link>
			</form>
		</div>
	);
}
