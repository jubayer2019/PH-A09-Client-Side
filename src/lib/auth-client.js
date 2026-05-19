"use client";

import { useCallback, useEffect, useState } from 'react';

const AUTH_BASE_PATH = '/api/auth';

const toError = async (response) => {
	const contentType = response.headers.get('content-type') || '';
	const payload = contentType.includes('application/json') ? await response.json() : null;
	const message = payload?.message || payload?.error || response.statusText || 'Request failed';
	const error = new Error(message);
	error.status = response.status;
	error.payload = payload;
	return error;
};

const request = async (path, { method = 'GET', body } = {}) => {
	const response = await fetch(`${AUTH_BASE_PATH}${path}`, {
		method,
		credentials: 'include',
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw await toError(response);
	}

	const contentType = response.headers.get('content-type') || '';
	if (!contentType.includes('application/json')) {
		return null;
	}

	return response.json();
};

const useSession = () => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);

	const refetch = useCallback(async () => {
		setIsPending(true);
		try {
			const session = await request('/get-session', { method: 'GET' });
			setData(session);
			return session;
		} finally {
			setIsPending(false);
		}
	}, []);

	useEffect(() => {
		void refetch();
	}, [refetch]);

	return { data, isPending, refetch };
};

const withResult = async (promise) => {
	try {
		return { data: await promise, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

const authClient = {
	useSession,
	signUp: {
		email: (payload) => withResult(request('/sign-up/email', { method: 'POST', body: payload })),
	},
	signIn: {
		email: (payload) => withResult(request('/sign-in/email', { method: 'POST', body: payload })),
		social: async (payload) => {
			const result = await withResult(request('/sign-in/social', { method: 'POST', body: payload }));
			if (!result.error) {
				const url = result.data?.url;
				if (result.data?.redirect && url && typeof window !== 'undefined') {
					window.location.assign(url);
				}
			}
			return result;
		},
	},
	updateUser: (payload) => withResult(request('/update-user', { method: 'POST', body: payload })),
	signOut: () => withResult(request('/sign-out', { method: 'POST', body: {} })),
};

export { authClient };