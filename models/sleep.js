"use strict"

const db = require("../db");
const {NotFoundError} = require("../utils/errors")
const {validationFields} = require("../utils/validation")

class Sleep {
    static async create({sleep, user}){
        const {startTime, endTime} = sleep
        try{
            validationFields({required:["startTime","endTime"], obj:sleep, location:"sleep create"})
        }catch(err){
            throw err
        }
        
        const result = await db.query(
            `
            INSERT INTO sleep(start_time, end_time, user_id)
            VALUES (${startTime}, ${endTime}, ${user.id})
            RETURNING id,
                        start_time as "startTime",
                        end_time as "endTime",
                        user_id as "userId",
                        timestamp`,
        ) 
        return result.rows[0]
    }

    static async fetchById(sleepId) {
    const results = await db.query(
      `
      SELECT id,
              start_time as "startTime",
              end_time as "endTime",
              user_id as "userId",
              timestamp
      FROM sleep
      WHERE id = ${sleepId}
    `)

    const sleep = results.rows[0]

    if (!sleep) {
      throw new NotFoundError("Sleep not found.")
    }

    return sleep
  }

  static async list(user) {
  
    const results = await db.query(
      `
      SELECT id,
              start_time as "startTime",
              end_time as "endTime",
              user_id AS "userId",
              timestamp
      FROM sleep
      WHERE user_id = ${user.id}
      ORDER BY start_time DESC
    `
    )

    const sleeps = results.rows

    return sleeps || []
  }

}
module.exports = Sleep
