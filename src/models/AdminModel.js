import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Adminschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Role: { type: String, default: 'Admin' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
})
const Admin = conn.model('admins', Adminschema)
export { Admin }
