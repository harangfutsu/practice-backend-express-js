const pool = require('../database/connection')
const crypto = require('crypto')

const getAllUsers = () =>
    new Promise((resolve, reject) => {
        const sql = 'SELECT user_id, firstname, lastname, email FROM users'
        pool.query(sql)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
    })

const createUser = (firstName, lastName, email, password, verificationToken) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (user_id, firstname, lastname, email, password, verification_token, is_verified)
            VALUES ($1, $2, $3, $4, $5, $6, false)
        `
        const values = [crypto.randomUUID(), firstName, lastName, email, password, verificationToken]

        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const updateUser = (userId, firstName, lastName, email, password) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET firstname = $1, lastname = $2, email = $3, password = $4
            WHERE user_id = $5
        `
        const values = [firstName, lastName, email, password, userId]

        pool.query(sql, values)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const deleteUser = (userId) =>
    new Promise((resolve, reject) => {
        const sql = `DELETE FROM users WHERE user_id = $1`
        pool.query(sql, [userId])
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

const getUserById = (userId) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT user_id, firstname, lastname, email FROM users WHERE user_id = $1`
        pool.query(sql, [userId])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

const getUserByEmail = (email) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = $1`
        pool.query(sql, [email])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

const getUserByVerificationToken = (token) =>
    new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE verification_token = $1`
        pool.query(sql, [token])
            .then(res => resolve(res.rows[0]))
            .catch(err => reject(err))
    })

const verifyUserEmail = (token) =>
    new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET is_verified = true, verification_token = NULL
            WHERE verification_token = $1
        `
        pool.query(sql, [token])
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    getUserByVerificationToken,
    verifyUserEmail
}
