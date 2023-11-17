import express from 'express'
import { getUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Update user
router.put("/:id", verifyToken, updateUser)

//Get a user
router.get("/find/:id", getUser)


export default router