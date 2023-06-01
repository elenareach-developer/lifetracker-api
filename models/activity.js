"use strict"

const db = require("../db");

class Activity{
    static async gitTotalExerciseMinutes({user}){
        const results = await db.query(
            `  SELECT SUM(duration)
            FROM exercises
            Where user_id = $1
            `,
            [user.id]
        )
        return results.rows[0]
    }

    static async averagrExercises({user}){
        const results = await db.query(
            `SELECT AVG(intensity)
            FROM exercises
            WHERE user_id = $1`,
            [user.id]
        )
        return results.rows[0]
    }

    static async averageHoursOfSleep({user}){
        const result = await db.query(
            `SELECT SUM(AGE(end_time, start_time))
            FORM sleep
            WHERE user_id`,[user.id]
        )
        return result.rows[0]
    }
    static async getCaloriesSummaryStats({user}){
        `SELECT AVG(calories) AS "avgCAlories", MAX(calories) as "maxCalories", timestamp:: date as ts
        FROM nutrition
        WHERE user_id = $1
        GROUT BY timestamp::date
        ORDER BY timestemp::date DESC`,
        [user.id]
        return results.rows
    }

}

module.exports = Activity