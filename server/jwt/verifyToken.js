import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {

    const token = req.cookies.accessToken

    if (!token)
        return next(createError(401, "Bạn chưa đăng nhập"))

    jwt.verify(token, process.env.JWT, (err, payload) => {

        if (err) {

            return next(createError(401, "Mã cookie không hợp lệ"))

        } else {

            req.userId = payload.id
            req.isSeller = payload.isSeller

        }

        next()

    })

}