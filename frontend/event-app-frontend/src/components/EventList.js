import React, { useState } from 'react';
import EventItem from './EventItem';
import { Grid, Paper, Typography } from '@mui/material';

const EventList = ({ events, onEventDelete, onToggleReminder, onEventEdit }) => {
	const [editedEvents, setEditedEvents] = useState([]);

	const handleEventEdit = (eventId, updatedData) => {
		// Find the index of the event being edited
		const eventIndex =
			editedEvents
				.findIndex(
					event =>
						event._id === eventId
				);

		if (eventIndex !== -1) {
			// Update the edited event in the local state
			const updatedEditedEvents = [...editedEvents];
			updatedEditedEvents[eventIndex] = {
				...updatedEditedEvents[eventIndex],
				...updatedData,
			};

			setEditedEvents(updatedEditedEvents);
		} else {
			// If the event is not already in the local state, add it
			setEditedEvents(
				[...editedEvents,
				{ _id: eventId, ...updatedData }
				]
			);
		}
		// Pass the edit request to the parent component
		onEventEdit(eventId, updatedData);
	};

	return (
		<div style={{ padding: '20px', backgroundColor: '#121212', color: '#fff' }}>
			<Typography variant="h5" gutterBottom sx={{ color: '#B39DDB', fontWeight: 'bold' }}>
				Event List
			</Typography>

			<Grid container spacing={3} justifyContent="center">
				{events.map(event => (
					<Grid item xs={12} sm={6} md={4} key={event._id}>
						<Paper
							elevation={3}
							style={{
								padding: '10px',
								backgroundColor: '#212121', // Dark background for paper
								color: '#fff', // White text inside the paper
								borderRadius: '10px',
							}}
						>
							<EventItem
								event={
									editedEvents
										.find(
											editedEvent =>
												editedEvent._id === event._id) || event
								}
								onToggleReminder={onToggleReminder}
								onEventDelete={onEventDelete}
								onEventEdit={handleEventEdit}
							/>
						</Paper>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default EventList;
