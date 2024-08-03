import Event, { IEvent } from '../models/Event';

export const createEvent = async (eventData: Partial<IEvent>): Promise<IEvent> => {
  const event = new Event(eventData);
  return await event.save();
};

export const getEvents = async (): Promise<IEvent[]> => {
  return await Event.find({ availableTickets: { $gt: 0 } });
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
  return await Event.findById(id);
};