
import db from '../db.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'MISSING_FIELDS' })
  }

  const checkSql = 'SELECT * FROM users WHERE email = ?'

  db.query(checkSql, [email], async (err, results) => {
    if (err) return res.status(500).json(err)

    if (results.length > 0) {
      return res.status(400).json({ error: 'EMAIL_EXISTS' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json(err)

      res.json({ message: 'สมัครสำเร็จ' })
    })
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'MISSING_FIELDS' })
  }

  const sql = 'SELECT * FROM users WHERE email = ?'

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log("❌ LOGIN ERROR:", err)
      return res.status(500).json({ error: 'SERVER_ERROR' })
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'INVALID_CREDENTIALS' })
    }

    const user = results[0]

    try {
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ error: 'INVALID_CREDENTIALS' })
      }

      res.json({
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      })

    } catch (err) {
      return res.status(500).json({ error: 'SERVER_ERROR' })
    }
  })
}