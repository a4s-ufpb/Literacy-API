import express from 'express'
import * as controller from '../controllers/indexController'

let router = express.Router()

router.route('/')
    .get(controller.getWelcome)

export default router