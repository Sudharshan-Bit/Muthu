import express from 'express'

import authMiddleware from '../middlewares/authMiddleware.js'
import { FreeRegisterion, addSubscription, deleteRegistration, getOrderitemsbyid, getRegisterStatusbyid, getallRegistrations, getfilteroptions, saveRegistration, updateRegistration } from '../controllers/Registration/RegistrationController.js'
const RegistrationsRouter = express.Router()
RegistrationsRouter.post('/apisaveregistration', saveRegistration)
RegistrationsRouter.post('/addsubscription', addSubscription)
RegistrationsRouter.get('/getregisterstatusbyid', getRegisterStatusbyid)
RegistrationsRouter.post('/apifreeregisterion', FreeRegisterion)
RegistrationsRouter.get('/apigetallregistrations', authMiddleware(['Employee', 'Admin','Customer']), getallRegistrations)
RegistrationsRouter.get('/apigetregistrationitemsbyid', authMiddleware(['Customer', 'Employee', 'Admin']), getOrderitemsbyid)
RegistrationsRouter.put('/apiupdateregistration', authMiddleware(['Customer', 'Employee', 'Admin']), updateRegistration)
RegistrationsRouter.delete('/apideleteregistration', authMiddleware(['Employee', 'Admin']), deleteRegistration)

RegistrationsRouter.post('/getfilteroptions', authMiddleware(['Admin']), getfilteroptions);
export default RegistrationsRouter
