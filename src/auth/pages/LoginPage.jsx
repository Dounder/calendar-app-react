import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = { loginEmail: '', loginPassword: '' };
const registerFormFields = {
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
	registerName: '',
};

export const LoginPage = () => {
	const { onStartLogin, errorMessage, onStartRegister } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);
	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange: onRegisterInputChange,
	} = useForm(registerFormFields);

	const loginSubmit = (e) => {
		e.preventDefault();

		onStartLogin({ email: loginEmail, password: loginPassword });
	};

	const onRegisterSubmit = (e) => {
		e.preventDefault();

		if (registerPassword !== registerPassword2)
			return Swal.fire('Passwords do not match', '', 'error');

		if (registerPassword.length < 6)
			return Swal.fire('Password must be at least 6 characters', '', 'error');

		if (registerName.length < 3)
			return Swal.fire('Name must be at least 3 characters', '', 'error');

		if (!registerEmail.includes('@')) return Swal.fire('Email must be valid', '', 'error');

		onStartRegister({ name: registerName, email: registerEmail, password: registerPassword });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Authentication Error', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Correo'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='d-grid gap-2'>
							<input type='submit' className='btnSubmit' value='Login' />
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Registro</h3>
					<form onSubmit={onRegisterSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
								type='password'
								className='form-control'
								placeholder='Contraseña'
							/>
						</div>

						<div className='form-group mb-2'>
							<input
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInputChange}
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
							/>
						</div>

						<div className='d-grid gap-2'>
							<input type='submit' className='btnSubmit' value='Crear cuenta' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
