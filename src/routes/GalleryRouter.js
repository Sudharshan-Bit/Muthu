import express from 'express';
import multer from 'multer';
import { deleteGallery, getallGallery, getallGallerys, getfilteroptions, getGallerybyid, getuniquevaluebyfield, saveGallery, searchGallery, updateGallery } from '../controllers/Gallery/GalleryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const GalleryRouter = express.Router();

GalleryRouter.get('/apigetallgallery', getallGallery);
GalleryRouter.get('/apigetallgallerys', getallGallerys);
GalleryRouter.get('/getgallerybyid', getGallerybyid);
GalleryRouter.get('/apigetuniquevaluebyfield', getuniquevaluebyfield);
GalleryRouter.post('/searchgallery', searchGallery);
GalleryRouter.post('/apisavegallery', authMiddleware(['Admin']), upload.array('Src'), saveGallery);
GalleryRouter.put('/apiupdategallery', authMiddleware(['Admin']), upload.array('Src'), updateGallery);
GalleryRouter.delete('/apideletegallery', authMiddleware(['Admin']), deleteGallery);

GalleryRouter.post('/getfilteroptions', authMiddleware(['Admin']), getfilteroptions);

export default GalleryRouter;
