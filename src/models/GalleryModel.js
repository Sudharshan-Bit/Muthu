import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';

const Galleryschema = mongoose.Schema({
  Src: Array,
  Src_Type : String,
  Title: String,
  Event_Date : Date,

}, { timestamps: true })

const Gallery = conn.model('gallerys', Galleryschema);
export { Gallery };
