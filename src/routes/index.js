import express from 'express'
import apiRouter from './apiRoutes.js'
import categoryRouter from './categoryRoutes.js'
import EventRouter from './EventRoutes.js'
import RegistrationsRouter from './RegistrationsRouter.js'
import GalleryRouter from './GalleryRouter.js'

const router = express.Router()
router.use('/api', apiRouter)
router.use('/category', categoryRouter)
router.use('/events', EventRouter)
router.use('/register', RegistrationsRouter)
router.use('/gallery', GalleryRouter)

export default router
