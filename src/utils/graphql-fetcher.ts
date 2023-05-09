const getURL = () => {
	if (import.meta.env.DEV) {
		return 'http://localhost:8000';
	}
	return '';
};

const processError = (error: any): { message: string; cause: string } => {
	const { message, extensions, debugMessage } = error || {
		message: 'Unknown Error',
		extensions: { reason: '' },
	};
	let cause = extensions.reason || '';
	if (debugMessage && debugMessage.includes('UNIQUE constraint failed')) {
		const regex = /\.(\w+)\s/;
		const match = regex.exec(debugMessage);

		if (match) {
			const afterDot = match[1];
			cause = `The value of <b>${afterDot}</b> is already taken.`;
		} else {
			cause = 'A field value is already in use.';
		}
	} else if (debugMessage && debugMessage.includes('NOT NULL constraint')) {
		const regex = /\.(\w+)\s/;
		const match = regex.exec(debugMessage);

		if (match) {
			const afterDot = match[1];
			cause = `The value of <b>${afterDot}</b> is missing.`;
		} else {
			cause = 'A field value is missing.';
		}
	}

	return { message, cause };
};

export const fetchData = <TData, TVariables>(
	query: string,
	variables?: TVariables,
	options?: RequestInit['headers']
): (() => Promise<TData>) => {
	return async () => {
		const token = localStorage.getItem('token');
		const res = await fetch(`${getURL()}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...(options ?? {}),
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		const json = await res.json();

		if (json.errors) {
			const { message, cause } = processError(json.errors[0]);
			throw new Error(message, { cause });
		}

		return json.data;
	};
};
