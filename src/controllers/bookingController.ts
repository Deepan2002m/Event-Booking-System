import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    if (booking) {
      res.json({ message: 'Booking cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await bookingService.printTicket(req.body.bookingId);
    res.json({ ticket });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};