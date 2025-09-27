const connection = require('../database/connection')
const crypto = require('crypto')

const getAllCourse = () => 
    new Promise((resolve, reject) => {
        const sql ='SELECT * FROM courses'
        connection.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            } 
            resolve(results)
        })
})

const createCourse = (title, category, description, price, language) => 
    new Promise((resolve, reject) => {
        const sql = 'INSERT INTO courses (course_id, title, category, description, price, language) VALUES (?,?,?,?,?,?)'
        const values = [crypto.randomUUID(), title, category, description, price, language]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            console.log('create results: ', results)
            resolve(results)
        })
})

const updateCourse = (id, title, category, description, price, language) => 
    new Promise((resolve, reject) => {
        const sql = 'UPDATE courses SET title = ?, category = ?, description = ?, price = ?, language = ? WHERE course_id = ?'
        const values = [title, category, description, price, language, id]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            console.log('update results: ', results)
            resolve(results)
        })
})

const deleteCourse = (id) => 
    new Promise((resolve, reject) => {
        const sql = 'DELETE FROM courses WHERE course_id = ?'
        const values = [id]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
})

const getCourseById = (id) => 
    new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM courses WHERE course_id = ?'
        const values = [id]
        connection.query(sql, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })

})

module.exports = {
    getAllCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById

}