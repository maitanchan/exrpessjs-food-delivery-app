import bcrypt, { hash } from 'bcrypt'
import userModel from '../models/user.model.js'
import { createError } from '../utils/error.js'
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {

    try {

        const hash = bcrypt.hashSync(req.body.password, 5)

        const newUser = new userModel({

            ...req.body,
            password: hash

        })

        await newUser.save()

        res.status(200).json("Tạo tài khoản thành công")

    } catch (err) {

        next(createError(403, "Thông tin tài khoản hoặc mật khẩu đã có người sử dụng"))

    }

}

export const login = async (req, res, next) => {

    try {

        const user = await userModel.findOne({

            username: req.body.username

        })

        if (!user)
            return next(createError(404, "Không tìm thấy tài khoản"))

        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password)

        if (!isCorrectPassword)
            return next(createError(401, "Sai thông tin tài khoản hoặc mật khẩu"))

        const token = jwt.sign({

            id: user._id,
            isSeller: user.isSeller

        }, process.env.JWT)

        const { password, ...others } = user._doc

        res.cookie("accessToken", token, { httpOnly: true }).status(200).json(others)


    } catch (err) {

        next(err)

    }

}

export const logout = async (req, res, next) => {

    res.clearCookie("accessToken", {

        sameSite: "none",
        secure: true

    }).status(200).json("Đăng xuất thành công")

}