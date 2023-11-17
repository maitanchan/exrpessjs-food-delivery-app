import userModel from "../models/user.model.js"
import { createError } from "../utils/error.js"

export const updateUser = async (req, res, next) => {

    const userId = req.params.id

    if (userId === req.userId) {

        try {

            const updatedUser = await userModel.findByIdAndUpdate(

                userId,
                {
                    $set: req.body
                },
                {
                    new: true
                }

            )

            const { password, ...others } = updatedUser._doc

            res.status(200).json(others)

        } catch (err) {

            next(err)

        }

    } else {

        return next(createError(401, "Bạn chỉ có thể thay đổi tài khoản của bạn"))


    }

}

export const getUser = async (req, res, next) => {

    try {

        const userId = req.params.id

        const user = await userModel.findById(userId)

        const { password, ...others } = user._doc

        res.status(200).json(others)

    } catch (err) {

        next(err)

    }

}