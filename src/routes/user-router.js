/**
 * User routes.
 *
 * @author Vanja Maric
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/registration', (req, res, next) => controller.register(req, res, next))
router.post('/registration', (req, res, next) => controller.registerPost(req, res, next))

router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (req, res, next) => controller.loginPost(req, res, next))
router.get('/logout', controller.authorize, (req, res, next) => controller.logout(req, res, next))
