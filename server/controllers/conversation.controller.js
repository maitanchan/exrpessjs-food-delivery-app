import conversationModel from "../models/conversation.model.js"
import { createError } from "../utils/error.js"


export const addConversation = async (req, res, next) => {

    try {

        const newConversation = new conversationModel({

            id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.userId,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,

        })

        const savedConversation = await newConversation.save()

        res.status(200).json(savedConversation)

    } catch (err) {

        next(err)

    }

}

export const updateConversation = async (req, res, next) => {

    try {

        const updatedConversation = await conversationModel.findOneAndUpdate(

            { id: req.params.id },
            {
                $set: {
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true })
                },
            },
            {
                new: true
            },

        )

        res.status(200).json(updatedConversation)

    } catch (err) {

        next(err)

    }

}

export const getConversation = async (req, res, next) => {

    try {

        const conversation = await conversationModel.findOne({ id: req.params.id })

        if (!conversation)
            return next(createError(404, "Không tìm thấy cuộc hội thoại nào"))

        res.status(200).json(conversation)

    } catch (err) {

        next(err)

    }

}

export const getConversations = async (req, res, next) => {

    try {

        const conversations = await conversationModel.find(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }).sort({ updatedAt: -1 })

        res.status(200).json(conversations)

    } catch (err) {

        next(err)

    }

}