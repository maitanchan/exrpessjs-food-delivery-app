import express from 'express'
import { confirm, getOders, intent } from '../controllers/order.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Create payment intent
router.post("/create-payment-intent/:id", verifyToken, intent)

//Get all orders
router.get("/", verifyToken, getOders)

//Success order
router.put("/", verifyToken, confirm)

export default router