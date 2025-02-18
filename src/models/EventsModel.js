import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';

const Eventsschema = mongoose.Schema({
  Images: Array,
  Title: String,
  Poster_Type: String,
  Event_Category_Type:String,
  country: {type: String,default: 'USA'},
  state:String,
  city:String,
  zipCode:String,
  ParticipantsType:String,
  address:String,
  maplink:String,
  startDate:String,
  endDate:String,
  
  
  eligibility_type:String,
  registerLastDate:String,
  event_mode_type:String,

  timeZone:{type: String},
  startTimePT: {type: String,default: '00:00'},
  startTimeMT: {type: String,default: '00:00'},
  startTimeCT: {type: String,default: '00:00'},
  startTimeET: {type: String,default: '00:00'},

  endtimeZone:{type: String,default: '00:00'},
  endTimePT: {type: String,default: '00:00'},
  endTimeMT: {type: String,default: '00:00'},
  endTimeCT: {type: String,default: '00:00'},
  endTimeET: {type: String,default: '00:00'},
  
  fields:String,
  Family_discound:String,
  Peyment : String,
  Guest_Count : String,
  Fees_Audience : String,
  Fees_Participants : String,
  Entry_Fees : String,
  Fees_Stall: String,
  Participant_Type : String,
  Games : Array,
  Description : String,
  Disclaimer : String,
  
}, { timestamps: true })

const Events = conn.model('events', Eventsschema);
export { Events };
