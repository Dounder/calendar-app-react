import { useDispatch, useSelector } from 'react-redux';

import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);

	const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));

	const startSavingEvent = async (calendarEvent) => {
		calendarEvent._id
			? dispatch(onUpdateEvent({ ...calendarEvent }))
			: dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
	};

	const startDeletingEvent = async () => {
		dispatch(onDeleteEvent());
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
	};
};
