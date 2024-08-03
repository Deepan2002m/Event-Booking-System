import express from 'express';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Event Booking System API');
});

app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

mongoose.connect('mongodb://localhost:27017/event-booking-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

export default app;