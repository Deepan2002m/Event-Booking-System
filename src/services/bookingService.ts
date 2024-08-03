import Booking, { IBooking } from '../models/Booking';
import Event from '../models/Event';

export const createBooking = async (bookingData: Partial<IBooking>): Promise<IBooking> => {
  const { eventId, quantity } = bookingData;
  
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  
  if (event.availableTickets < quantity) {
    throw new Error('Not enough tickets available');
  }
  
  if (quantity > 15) {
    throw new Error('Maximum 15 tickets per booking');
  }
  
  const booking = new Booking(bookingData);
  const savedBooking = await booking.save();
  
  event.availableTickets -= quantity;
  await event.save();
  
  return savedBooking;
};

export const cancelBooking = async (id: string): Promise<IBooking | null> => {
  const booking = await Booking.findByIdAndDelete(id);
  if (booking) {
    const event = await Event.findById(booking.eventId);
    if (event) {
      event.availableTickets += booking.quantity;
      await event.save();
    }
  }
  return booking;
};

export const printTicket = async (bookingId: string): Promise<string> => {
  const booking = await Booking.findById(bookingId).populate('eventId');
  if (!booking) {
    throw new Error('Booking not found');
  }
  
  const event = booking.eventId as IEvent;
  
  return `
    Event: ${event.name}
    Date: ${event.date}
    Tickets: ${booking.quantity}
    Booking ID: ${booking._id}
    User ID: ${booking.userId}
  `;
};