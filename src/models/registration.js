/**
 * Mongoose model Snippet.
 *
 * @author Mats Loock & Vanja Maric
 * @version 2.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [1, 'The password must be of minimum length 10 characters.'],
    required: true
  }
}, {
  timestamps: true
})

/**
 * Authenticate a User by comparing the input password with the hashed password stored in the database.
 *
 * @param {string} username - The username of the User to be authenticated
 * @param {string} password - The password of the User to be authenticated
 * @returns {object} - The User object if authentication is successful
 * @throws {Error} - If authentication fails
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!user || !isPasswordValid) {
    throw new Error('Error') // ?????????????
  }

  return user
}

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})
// Create a model using the schema.
export const User = mongoose.model('User', schema)
