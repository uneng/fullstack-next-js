export default (req, res) => {
	res.statusCode = 200;
	res.setHeader = ('Content-Type', 'Application/json');
	res.end(
		JSON.stringify([
			{
				id: 1,
				username: 'mutar',
				name: 'Mukhtar Datau',
			},
            {
				id: 2,
				username: 'merry',
				name: 'Merryska Gumanti',
			},
		])
	);
};
