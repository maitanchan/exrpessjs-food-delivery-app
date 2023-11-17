import gigModel from "../models/gig.model.js"
import reviewModel from "../models/review.model.js"
import { createError } from "../utils/error.js"

export const addReview = async (req, res, next) => {



    if (req.isSeller) {

        return next(createError(403, "Người bán không thể thực hiện đánh giá"))

    } else {

        try {

            const newReview = new reviewModel({

                ...req.body,
                userId: req.userId,
                gigId: req.body.gigId

            })

            const review = await reviewModel.findOne({ gigId: req.body.gigId, userId: req.userId })

            if (review)
                return next(createError(403, "Bạn chỉ được tạo 1 bài đánh giá về dịch vụ này"))

            const savedReview = await newReview.save()

            await gigModel.findByIdAndUpdate(

                req.body.gigId,
                {
                    $inc: {
                        totalStars: req.body.star,
                        starNumber: 1
                    }
                }

            )

            res.status(200).json(savedReview)

        } catch (err) {

            next(err)

        }

    }

}

export const getReviews = async (req, res, next) => {

    try {

        const gigId = req.params.gigId

        const reviews = await reviewModel.find({ gigId: gigId })

        res.status(200).json(reviews)

    } catch (err) {

        next(err)

    }

}

export const deleteReview = async (req, res, next) => {

    try {

        await reviewModel.findByIdAndDelete(req.params.id)

        res.status(200).json("Xóa bài đánh giá thành công")

    } catch (err) {

        next(err)

    }

}