import express from 'express'
import { addConversation, getConversation, getConversations, updateConversation } from '../controllers/conversation.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Add a conversation
router.post("/", verifyToken, addConversation)

//Get a conversation
router.get("/single/:id", verifyToken, getConversation)

//Get all conversation
router.get("/", verifyToken, getConversations)

//Update conversation
router.put("/:id", verifyToken, updateConversation)

export default router