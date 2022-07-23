import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [],
		activeEvent: null,
		isLoadingEvents: true,
	},
	reducers: {
		onLoadEvents: (state, { payload = [] }) => {
			state.isLoadingEvents = false;
			payload.forEach((event) => {
				const existingEvent = state.events.some((e) => e.id === event.id);

				if (!existingEvent) state.events.push(event);
			});
		},
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => (event.id === payload.id ? payload : event));
		},
		onDeleteEvent: (state) => {
			if (state.activeEvent) {
				state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
				state.activeEvent = null;
			}
		},
		onLogoutCalendar: (state) => {
			state.events = [];
			state.activeEvent = null;
			state.isLoadingEvents = true;
		},
	},
});

export const {
	onLoadEvents,
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLogoutCalendar,
} = calendarSlice.actions;
