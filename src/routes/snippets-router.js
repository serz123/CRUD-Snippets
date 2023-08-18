/**
 * Snippets routes.
 *
 * @author Mats Loock & Vanja Maric
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new SnippetsController()
const controller2 = new UserController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', controller2.authorize, (req, res, next) => controller.create(req, res, next))
router.post('/create', controller2.authorize, (req, res, next) => controller.createPost(req, res, next))

router.get('/:id/update', controller2.authorize, controller2.userCreatorCheck, (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', controller2.authorize, controller2.userCreatorCheck, (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', controller2.authorize, controller2.userCreatorCheck, (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', controller2.authorize, controller2.userCreatorCheck, (req, res, next) => controller.deletePost(req, res, next))
