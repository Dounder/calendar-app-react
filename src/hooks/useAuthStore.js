import { useDispatch, useSelector } from 'react-redux';

import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onStartLogin = async ({ email, password }) => {
		try {
			dispatch(onChecking());

			const { data } = await calendarApi.post('/auth', { email, password });

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.user.name, uid: data.user._id }));
		} catch (error) {
			dispatch(onLogout('Invalid credentials'));
			setTimeout(() => dispatch(clearErrorMessage()), 10);
		}
	};

	const onStartRegister = async ({ name, email, password }) => {
		try {
			dispatch(onChecking());

			const { data } = await calendarApi.post('/auth/new', { name, email, password });

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.user.name, uid: data.user._id }));
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg || 'Something went wrong'));
			setTimeout(() => dispatch(clearErrorMessage()), 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');

		if (!token) return dispatch(onLogout());

		try {
			const { data } = await calendarApi.get('/auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.user.name, uid: data.user._id }));
		} catch (error) {
			dispatch(onLogout());
			localStorage.clear();
		}
	};

	const onStartLogout = () => {
		localStorage.clear();
		dispatch(onLogout());
		dispatch(onLogoutCalendar());
	};

	return {
		//* Properties
		errorMessage,
		status,
		user,

		//? Methods
		checkAuthToken,
		onStartLogin,
		onStartLogout,
		onStartRegister,
	};
};
