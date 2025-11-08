const jwt = require('jsonwebtoken')
const { errorHandler } = require('../utils/helper.responses')
const verifyToken = (req, res, next) => {
try {
// Ambil token dari header Authorization
const authHeader = req.headers.authorization
// Pastikan token ada
if (!authHeader) {
return errorHandler(res, false, 401, "Akses ditolak. Token tidak ditemukan")
}
// Format token: "Bearer <token>"
const token = authHeader.split(' ')[1]
if (!token) {
return errorHandler(res, false, 401, "Format token tidak valid")
}
// Verifikasi token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// Simpan data user hasil decode ke request agar bisa digunakan di controller
req.user = decoded
// Jika valid → lanjut ke controller berikutnya
next()
} catch (error) {
return errorHandler(res, false, 403, "Autentikasi gagal: Token tidak valid atau telah kedaluwarsa")
}
}
module.exports = {
verifyToken
}
