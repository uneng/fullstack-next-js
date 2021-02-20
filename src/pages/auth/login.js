import React, { useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link';
import { unauthPage } from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx){
	await unauthPage(ctx);
	return { props: {} }
}
export default function Login() {
	const [fields, setFields] = useState({
		username: '',
		password: '',
	});

	const [status, setStatus] = useState('normal');

	async function loginHandler(e) {
		e.preventDefault();

		setStatus('loading');

		const loginReq = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(fields),
		});
		if (!loginReq.ok) return setStatus('error ' + loginReq.status);
		const loginRes = await loginReq.json();
		Cookie.set('token', loginRes.token);
		setStatus('Login sukses');
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
			<h1>Login</h1>
			<form onSubmit={loginHandler.bind(this)}>
				<input
					name="username"
					onChange={fieldHandler.bind(this)}
					type="text"
					placeholder="Username atau email"
				/>
				<input
					name="password"
					onChange={fieldHandler.bind(this)}
					type="password"
					placeholder="Password"
				/>
				<button type="submit">Login</button>
				<div>Output: {status}</div>
				<Link href="/auth/register"><a>Register</a></Link>
			</form>
		</div>
	);
}
