import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())

// routes
app.use('/api', authRoutes)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' })
})
// ใช้ PORT จาก env (สำคัญมาก)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})