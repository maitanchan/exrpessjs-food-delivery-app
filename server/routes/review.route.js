import express from 'express'
import { addReview, deleteReview, getReviews } from '../controllers/review.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Create review
router.post("/", verifyToken, addReview)

//Get all review
router.get("/:gigId", getReviews)

//Delete review
router.delete("/:id", deleteReview)

export default router