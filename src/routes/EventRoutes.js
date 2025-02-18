import express from 'express';
import multer from 'multer';
import { deleteEvent, getallEvent, geteventbyid, getfilteroptions, getuniquevaluebyfield, saveEvent, searchEvent, updateEvent } from '../controllers/Events/EventsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const EventRouter = express.Router();

EventRouter.get('/apigetallEvents', getallEvent);
EventRouter.get('/geteventbyid', geteventbyid);
EventRouter.get('/apigetuniquevaluebyfield', getuniquevaluebyfield);
EventRouter.post('/searchEvents', searchEvent);
EventRouter.post('/apisaveEvent', authMiddleware(['Admin']), upload.array('Images'), saveEvent);
EventRouter.put('/apiupdateEvent', authMiddleware(['Admin']), upload.array('Images'), updateEvent);
EventRouter.delete('/apideleteEvent', authMiddleware(['Admin']), deleteEvent);

EventRouter.post('/getfilteroptions', authMiddleware(['Admin']), getfilteroptions);

export default EventRouter;
