import express from 'express'
import { createMessage, getMessage, getMessages } from '../controllers/message.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Create message
router.post("/", verifyToken, createMessage)

//Get all messages
router.get("/:id", verifyToken, getMessages)


//Get a message
router.get("/single/:id", verifyToken, getMessage)



export default router