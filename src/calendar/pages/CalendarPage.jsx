import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';
import { Calendar } from 'react-big-calendar';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { getMessagesEs, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
	const { openDateModal } = useUiStore();
	const { events, setActiveEvent } = useCalendarStore();
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	const eventStyleGetter = (event, start, end, isSelected) => ({
		backgroundColor: '#347cf7',
		borderRadius: '0px',
		opacity: 0.8,
		color: 'white',
	});

	const onDoubleClick = () => openDateModal();

	const onSelect = (event) => setActiveEvent(event);

	const onViewChange = (event) => localStorage.setItem('lastView', event);

	return (
		<>
			<Navbar />

			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc(100vh - 80px)' }}
				messages={getMessagesEs()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
			/>

			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</>
	);
};
