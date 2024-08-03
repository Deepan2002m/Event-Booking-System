import express from 'express';
import * as bookingController from '../controllers/bookingController';

const router = express.Router();

router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.cancelBooking);
router.post('/print-ticket', bookingController.printTicket);

export default router;