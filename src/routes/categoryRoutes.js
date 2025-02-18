import express from 'express'
import multer from 'multer'
//import { deleteCategory, getallCategory, getuniquevaluebyfield, saveCategory, searchCategory, updateCategory } from '../controllers/category/categoryController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const storage = multer.memoryStorage()
const upload = multer({ storage })
const categoryRouter = express.Router()

// categoryRouter.get('/apigetallcategory', getallCategory)
// categoryRouter.get('/apigetuniquevaluebyfield', getuniquevaluebyfield)
// categoryRouter.post('/searchcategory', searchCategory)
// categoryRouter.post('/apisavecategory', authMiddleware(['Admin']), upload.array('Images'), saveCategory)
// categoryRouter.put('/apiupdatecategory', authMiddleware(['Admin']), upload.array('Images'), updateCategory)
// categoryRouter.delete('/apideletecategory', authMiddleware(['Admin']), deleteCategory)
export default categoryRouter
