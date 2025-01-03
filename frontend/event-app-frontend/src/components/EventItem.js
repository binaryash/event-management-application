import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TextField, Button, Typography, Card, CardContent, CardActions, Box } from '@mui/material';

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(event.title);
	const [editedDate, setEditedDate] = useState(moment(event.date).format("YYYY-MM-DD"));
	const [isEventToday, setIsEventToday] = useState(false);

	useEffect(() => {
		if (event) {
			const today = new Date();
			const eventDate = new Date(event.date);

			today.setHours(0, 0, 0, 0);
			eventDate.setHours(0, 0, 0, 0);

			// Check if today is the event's date
			if (today.getTime() === eventDate.getTime()) {
				setIsEventToday(true);
			} else {
				setIsEventToday(false);
			}

			// Check if the event is today and has a reminder
			if (today.getTime() === eventDate.getTime() && event.reminder) {
				alert(`Today is the day of the event: ${event.title}`);
			}
		}
	}, [event, event.reminder]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		onEventEdit(event._id, { title: editedTitle, date: editedDate });
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setEditedTitle(event.title);
		setEditedDate(moment(event.date).format("YYYY-MM-DD"));
		setIsEditing(false);
	};

	return (
		<Card 
			variant="outlined" 
			sx={{
				mb: 2, 
				borderRadius: 2, 
				boxShadow: 3, 
				backgroundColor: '#212121',  // Dark background for the card
				color: '#fff',  // Ensure text is white
			}}
		>
			<CardContent>
				<Typography 
					variant="body2" 
					sx={{
						color: '#B39DDB', // Light purple color for reminder text
						fontWeight: 'bold'
					}} 
					gutterBottom
				>
					{event.reminder ? "Reminder On" : ""}
				</Typography>

				<div className="event-info">
					{isEditing ? (
						<>
							<TextField
								label="Event Title"
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								fullWidth
								autoFocus
								sx={{
									mb: 2,
									input: { color: '#B39DDB' }, // Light purple for input text
									label: { color: '#B39DDB' }, // Light purple for label
								}}
							/>
							<TextField
								label="Event Date"
								type="date"
								value={editedDate}
								onChange={(e) => setEditedDate(e.target.value)}
								InputLabelProps={{
									shrink: true,
									style: { color: '#B39DDB' }, // Light purple for input label
								}}
								fullWidth
								sx={{
									mb: 2,
									input: { color: '#B39DDB' }, // Light purple for input text
								}}
							/>
						</>
					) : (
						<>
							<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#B39DDB' }}>
								{event.title}
							</Typography>
							<Typography variant="body2" sx={{ color: '#aaa' }} paragraph>
								<span style={{ fontWeight: "700" }}>Event On:</span> {moment(event.date).calendar()}
							</Typography>

							{/* Show message if the event is today */}
							{isEventToday && (
								<Typography variant="body2" sx={{ color: '#FFEB3B', fontWeight: 'bold' }}>
									Event is Today!
								</Typography>
							)}
						</>
					)}
				</div>
			</CardContent>

			<CardActions>
				<Box sx={{ display: 'flex', gap: 2 }}>
					{isEditing ? (
						<>
							<Button
								variant="contained"
								sx={{
									flex: 1,
									backgroundColor: '#B39DDB',
									color: '#fff',
									"&:hover": { backgroundColor: '#9575CD' },
								}}
								onClick={handleSaveClick}
							>
								Save
							</Button>
							<Button
								variant="outlined"
								sx={{
									flex: 1,
									borderColor: '#B39DDB',
									color: '#B39DDB',
									"&:hover": { borderColor: '#9575CD', color: '#9575CD' },
								}}
								onClick={handleCancelClick}
							>
								Cancel
							</Button>
						</>
					) : (
						<>
							<Button
								variant="outlined"
								color={event.reminder ? "secondary" : "primary"}
								sx={{
									flex: 1,
									borderColor: event.reminder ? '#9575CD' : '#B39DDB',
									color: event.reminder ? '#9575CD' : '#B39DDB',
									"&:hover": { borderColor: '#9575CD', color: '#9575CD' },
								}}
								onClick={() => onToggleReminder(event._id)}
							>
								{event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
							</Button>
							<Button
								variant="outlined"
								color="error"
								sx={{
									flex: 1,
									borderColor: '#FF3B3B',
									color: '#FF3B3B',
									"&:hover": { borderColor: '#FF3B3B', color: '#FF3B3B' },
								}}
								onClick={() => onEventDelete(event._id)}
							>
								Delete
							</Button>
							<Button
								variant="contained"
								sx={{
									flex: 1,
									backgroundColor: '#B39DDB',
									color: '#fff',
									"&:hover": { backgroundColor: '#9575CD' },
								}}
								onClick={handleEditClick}
							>
								Edit
							</Button>
						</>
					)}
				</Box>
			</CardActions>
		</Card>
	);
};

export default EventItem;
