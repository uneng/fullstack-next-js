import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Navbar() {

    function logoutHandler(e) {
        e.preventDefault();
        Cookie.remove('token');
        Router.replace('/auth/login');
    }

	return (
		<>
			<Link href="/wp">
				<a>Data Wajib Pajak</a>
			</Link>
            &nbsp; | &nbsp;
			<Link href="/wp/create">
				<a>Tambah</a>
			</Link>
			&nbsp; | &nbsp;
			<a href="#" onClick={logoutHandler.bind(this)}>Logout</a>
		</>
	);
}
