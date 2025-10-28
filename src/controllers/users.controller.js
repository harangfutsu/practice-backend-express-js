const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcrypt')
const userModel = require('../models/users.model')
const {successHandler, errorHandler} = require('../utils/helper.responses')

const getAllUsers = async (req, res) => {
    
    try {
        const allUser = await userModel.getAllUsers()

        if (!allUser || allUser.length === 0){

            return errorHandler(
                res, 
                false, 
                404, 
                "Belum ada user terdaftar")}

        return successHandler(
            res, 
            true, 
            200, 
            "Menampilkan seluruh user", 
            allUser)

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        // Validasi input
        if (!firstName || !lastName || !email || !password) {
            return errorHandler(res, false, 400, "Semua field wajib diisi")
        }

        // Enkripsi password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Simpan ke database
        const createdUser = await userModel.createUser(firstName, lastName, email, hashedPassword)

        if (!createdUser.affectedRows) {
            return errorHandler(res, false, 400, "Gagal membuat user")
        }

        return successHandler(
            res,
            true,
            201,
            "User berhasil dibuat",
            { firstName, lastName, email }
        )

    } catch (error) {
        return errorHandler(
            res,
            false,
            500,
            `Internal Server Error: ${error.message}`
        )
    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params
        const {firstName, lastName, email, password} = req.body 

        if (!firstName || !lastName || !email || !password) {

            return errorHandler(
                res, 
                false, 
                400, 
                "Semua field wajib diisi")}

        const updatedUser = await userModel.updateUser(userId, firstName, lastName, email, password)

        if (!updatedUser.affectedRows) {

            return errorHandler(
                res, 
                false, 
                404, 
                "Gagal membuat user")}
        
        return successHandler(
            res, 
            true, 
            200, 
            "User berhasil diperbarui", 
            {userId, firstName, lastName, email})

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params

        const user = await userModel.getUserById(userId)

        if (!user || user.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "User tidak ditemukan")
        }
        
        const deletedUser = await userModel.deleteUser(userId)

        if (!deletedUser.affectedRows) {

            return errorHandler(
                res, 
                false, 
                404, 
                "User tidak ditemukan")}

        return successHandler(
            res, 
            true, 
            200, 
            "User berhasil dihapus", {user})

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

const getUserById = async (req, res) => {
    try {
        const {userId} = req.params

        const user = await userModel.getUserById(userId)

        if (!user || user.length === 0) {

            return errorHandler(
                res, 
                false, 
                404, 
                "User tidak ditemukan")}

        return successHandler(
            res, 
            true, 
            200, 
            "User berhasil ditemukan", 
            user)

    } catch (error) {

        return errorHandler(
            res, 
            false, 
            500, 
            `Internal Server Error: ${error.message}`)}
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validasi input
        if (!email || !password) {
            return errorHandler(res, false, 400, "Email dan password wajib diisi")
        }

        // Cek apakah user dengan email tsb ada
        const user = await userModel.getUserByEmail(email)

        if (!user || user.length === 0) {
            return errorHandler(res, false, 401, "Email atau password salah")
        }

        const foundUser = user[0]

        // Bandingkan password yang dikirim dengan hash di database
        const isMatch = await bcrypt.compare(password, foundUser.password)

        if (!isMatch) {
            return errorHandler(res, false, 401, "Email atau password salah")
        }

        // Buat token JWT
        const token = jwt.sign(
            { userId: foundUser.user_id, email: foundUser.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        )

        // Kirim respons sukses
        return successHandler(
            res,
            true,
            200,
            "Login berhasil",
            {
                token,
                user: {
                    userId: foundUser.user_id,
                    firstName: foundUser.firstname,
                    lastName: foundUser.lastname,
                    email: foundUser.email
                }
            }
        )

    } catch (error) {
        return errorHandler(res, false, 500, `Internal Server Error: ${error.message}`)
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    loginUser

}