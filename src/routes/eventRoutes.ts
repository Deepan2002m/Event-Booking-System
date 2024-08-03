import express from 'express';
import * as eventController from '../controllers/eventController';

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

export default router;