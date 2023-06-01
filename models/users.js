
"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorisedError } = require("../utils/errors")
const validationFields = require("../utils/validation")

const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      date: user.date,
    }
  }

  static async getUsers(){
    const result = await db.query(
      `SELECT *  FROM users`)
    return result
  }
  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]

     if(!email&&!password) new UnauthorisedError("Invalid username/password")
    const user = await User.fetchUserByEmail(email)

    if (user) {
      // compare hashed password to a new hash from password
     // const isValid = await bcrypt.compare(password, user.password)
     const isValid = (password === user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorisedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, location} = creds
    console.log("email, password, firstName, lastName, location")
    console.log(email, password, firstName, lastName, location)
    const requiredCreds = ["email", "password", "firstName", "lastName", "location"]
    // try {
    //   validationFields({ required: requiredCreds, obj: creds, location: "user registration" })
    //    console.log("did not pas validation")
    //  } catch (err) {
    //    throw err
    // }

     const existingUserWithEmail = await User.fetchUserByEmail(email)
      if (existingUserWithEmail) {
        return new BadRequestError(`Duplicate email: ${email}`)
    }
 
    const normalizedEmail = email.toString().toLowerCase()
  
    const result = await db.query(
      `INSERT INTO users (
          password,
          first_name,
          last_name,
          email,
          location
        )
        VALUES ('${password}', '${firstName}', '${lastName}', '${normalizedEmail}', '${location}')
        RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  location,
                  date
                  `
    )

    const user = result.rows[0]
   
    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    console.log("email")
    console.log(email)
    console.log(`SELECT id,
    email, 
    password,
    first_name AS "firstName",
    last_name AS "lastName",
    location,
    date              
 FROM users
 WHERE email = "${email}"`)
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              location,
              date              
           FROM users
           WHERE email = '${email}'`
    )

    const user = result.rows[0]
    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              location,
              date              
           FROM users
           WHERE id = ${userId}`
    )

    const user = result.rows[0]

    return user
  }
}

module.exports = User
