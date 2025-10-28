const connection = require('../database/connection')
const crypto = require('crypto')

const getAllUsers = () => 
    new Promise((resolve, reject) => {
        const sql ='SELECT user_id, firstname, lastname, email FROM users'
        connection.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            } 
            resolve(results)
        })
})

const createUser = (firstName, lastName, email, password) => 
    new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (user_id, firstname, lastname, email, password) VALUES (?,?,?,?,?)'
        const values = [crypto.randomUUID(), firstName, lastName, email, password]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            console.log('create results: ', results)
            resolve(results)
        })
})

const updateUser = (userId, firstName, lastName, email, password) => 
    new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE user_id = ?'
        const values = [firstName, lastName, email, password, userId]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            console.log('update results: ', results)
            resolve(results)
        })
})

const deleteUser = (userId) => 
    new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE user_id = ?'
        const values = [userId]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
})

const getUserById = (userId) => 
    new Promise((resolve, reject) => {
        const sql = 'SELECT user_id, firstname, lastname, email FROM users WHERE user_id = ?'
        const values = [userId]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })

})

const getUserByEmail = (email) => 
    new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?'
        const values = [email]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail
}