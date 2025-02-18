import mongoose from 'mongoose';
import { conn } from '../config/db/db.js';
import moment from 'moment-timezone';

const RegistrationSchema = new mongoose.Schema(
  {
    Registration_id: { type: String, unique: true },
    Registration_Date: { type: Date, default: moment().tz('Asia/Kolkata').format('YYYY-MM-DD') },
    Title: String,
    Event_Date : Date,
    Event_Time : String,
    Poster_Type: String,
    First_Name: String,
    Last_Name: String,
    Email: String,
    Phone_Number: String,
    // Game_Title: String,
    // Team_Name: String,
    // Team_Members_Count: String,
    // Adults: String,
    // Kids: String,
    // Babes: String,
    // Number_Guests: String,
    attendeeType:String,
    userType:String,
    numTicketsadults:String,
    numTicketskids:String,
    Family_discound:String,
    numTickets:String,
    numminite:String,
    Num_Square:String,
    Total_Amount: String,
    Willingness: String,
    Payment_id: String,
    Payment_Type: String,
    Payment_Status: { type: String, default: "Not Paid" },
    Registration_Status: { type: String, default: "Payment Pending" },
    Description: String,
  },
  { timestamps: true }
);


const Registration = conn.model('registration', RegistrationSchema);

export { Registration };