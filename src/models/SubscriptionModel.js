import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';

const Subscriptionschema = mongoose.Schema({
  First_Name: String,
  Last_Name : String,
  Email : String,
  Subscription_Status : {type: String, default:'Subscriped'}
  
}, { timestamps: true })

const Subscription = conn.model('subscription', Subscriptionschema);
export { Subscription };