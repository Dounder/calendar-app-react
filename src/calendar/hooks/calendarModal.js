import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import { useEffect, useMemo, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

export const calendarModal = () => {
	const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const titleClass = useMemo(() => {
		if (!formSubmitted) return '';

		return formValues.title.length > 0 ? '' : 'is-invalid';
	}, [formValues.title, formSubmitted]);

	useEffect(() => {
		if (activeEvent !== null) setFormValues({ ...activeEvent });
	}, [activeEvent]);

	const onInputChange = ({ target }) => setFormValues({ ...formValues, [target.name]: target.value });

	const onDateChange = (event, changing) => setFormValues({ ...formValues, [changing]: event });

	const onSubmit = async (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(difference) || difference <= 0)
			return Swal.fire('Fechas inválidas', 'La fecha de finalización debe ser mayor a la de inicio', 'error');

		if (formValues.title.length <= 0) return;

		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted(false);
	};

	const onCloseModal = () => {
		setActiveEvent(null);
		closeDateModal();
	};

	return {
		//* Props
		isDateModalOpen,
		formValues,
		titleClass,

		//? Methods
		onInputChange,
		onDateChange,
		onSubmit,
		openDateModal,
		onCloseModal,
	};
};
