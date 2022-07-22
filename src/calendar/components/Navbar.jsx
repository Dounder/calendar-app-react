import { useAuthStore } from '../../hooks/useAuthStore';

export const Navbar = () => {
	const { user, onStartLogout } = useAuthStore();

	return (
		<div className='navbar navbar-dark bg-dark mb-4 px-4'>
			<span className='navbar-brand'>
				<i className='fas fa-calendar-alt'></i>
				&nbsp; {user.name}
			</span>

			<button className='btn btn-outline-danger' onClick={onStartLogout}>
				<i className='fas fa-sign-out-alt'></i>
				<span>&nbsp;Exit</span>
			</button>
		</div>
	);
};
