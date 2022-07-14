import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();
	const { isDateModalOpen } = useUiStore();

	const onClick = async () => {
		await startDeletingEvent();
	};

	return (
		<button
			className='btn btn-danger fab-danger'
			onClick={onClick}
			style={{ display: hasEventSelected && !isDateModalOpen ? '' : 'none' }}
		>
			<i className='fas fa-trash-alt'></i>
		</button>
	);
};
