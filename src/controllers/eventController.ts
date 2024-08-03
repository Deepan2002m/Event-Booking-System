import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};