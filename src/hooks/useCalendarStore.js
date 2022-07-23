import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { converToDate } from '../helpers';

import {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
} from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

				dispatch(onUpdateEvent({ ...calendarEvent, user }));

				return;
			}

			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
		} catch (error) {
			console.log(error);
			Swal.fire('Error on save', error.response.data.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire('Error on delete', error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');

			const events = converToDate(data.events);

			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('error loading events');
			console.log(error);
		}
	};

	return {
		//* Props
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//? Methods
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
