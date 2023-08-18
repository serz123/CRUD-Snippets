/**
 * Module for the UserController.
 *
 * @author Vanja Maric
 * @version 1.0.0
 */

import { User } from '../models/registration.js'
import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Returns a HTML form for registring a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    res.render('user/registration', { user: res.locals.user })
  }

  /**
   * Registration post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async registerPost (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'The user was created successfully.' }
      res.redirect('../')
    } catch (error) {
      let message = error.message
      if (error.code === 11000) {
        message = 'Username already exists.'
      } else if (error.errors.password && error.errors.password.kind === 'minlength') {
        message = 'Password is too short.'
      }
      req.session.flash = { type: 'danger', text: message }
      res.redirect('/user/registration')
    }
  }

  /**
   * Returns a HTML form for logging in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    res.render('user/login', { user: res.locals.user })
  }

  /**
   * Log in post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async loginPost (req, res) {
    try {
      //  await User.authenticate....??????????
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate((err) => {
        if (err) {
          throw new Error('Failed to re-generate session.')
        }
        // Store the authenticated user in the session store
        req.session.user = user
        req.session.flash = { type: 'success', text: 'You are logged in.' }
        // Redirect
        res.redirect('../') // ????????
      })
    } catch (error) {
      // Redirect to the login form and display an error message...
      req.session.flash = {
        type: 'danger',
        text: 'Something went wrong.'
      }
      res.status(401).redirect('/user/login')
    }
  }

  /**
   * Log out post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error('Something went wrong.')
        }
        res.redirect('../')
      })
    } catch (err) {
      req.session.flash = {
        type: 'danger',
        text: 'Something went wrong.'
      }
      res.redirect('../')
    }
  }

  /**
   * Authorization.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - The next middleware function in the pipeline.
   */
  async authorize (req, res, next) {
    if (!req.session.user) {
      const error = new Error('Forbidden')
      error.status = 404
      return next(error)
    }
    next()
  }

  /**
   * Checks if the inlogged user owns the snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - The next middleware function in the pipeline.
   */
  async userCreatorCheck (req, res, next) {
    const snippet = await Snippet.findById(req.params.id)
    if (snippet.createdBy.equals(req.session.user._id)) {
      next()
    } else {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }
  }
}
