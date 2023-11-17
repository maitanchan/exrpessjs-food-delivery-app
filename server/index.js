import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.route.js'
import conversationRoute from './routes/conversation.route.js'
import gigRoute from './routes/gig.route.js'
import messageRoute from './routes/message.route.js'
import orderRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'
import userRoute from './routes/user.route.js'

const app = express()
dotenv.config()

const port = process.env.PORT || 9000

//Connect MongoDB
const connect = async () => {

    try {

        await mongoose.connect(process.env.MONGO)

        console.log("Connected to MongoDB")

    } catch (err) {

        throw err

    }

}


//Middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

//Routes
app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/messages", messageRoute)
app.use("/api/orders", orderRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/users", userRoute)

//Config error
app.use((err, req, res, next) => {

    const statusErr = err.status || 500
    const messageErr = err.message || "Đã có lỗi xảy ra"

    return res.status(statusErr).json({

        success: false,
        status: statusErr,
        message: messageErr

    })

})

app.listen(port, () => {
    connect()
    console.log(`Server is running at http://localhost:${port}`)
})