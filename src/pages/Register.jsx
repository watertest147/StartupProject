import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Sparkles, Eye, EyeOff, Mail, Lock, User,
  ArrowRight, CheckCircle2, Building2, ChevronRight
} from 'lucide-react'

const perks = [
  'คำนวณงบประมาณธุรกิจได้ไม่จำกัด',
  'เข้าถึงไอเดียธุรกิจกว่า 500+ แบบ',
  'รายงาน ROI แบบละเอียด',
  'ฟรีตลอดชีพ ไม่ต้องใช้บัตรเครดิต',
]

const inputVariants = {
  focus: { scale: 1.01, transition: { duration: 0.15 } },
  blur: { scale: 1 },
}

function FloatingInput({ id, label, type = 'text', icon: Icon, value, onChange, onBlurExtra, rightEl, hasError }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <motion.div
      variants={inputVariants}
      animate={focused ? 'focus' : 'blur'}
      className="relative"
    >
      <label
        htmlFor={id}
        className={`
          flex items-center gap-3 px-4 rounded-2xl border-2 bg-white transition-all duration-200 cursor-text
          ${hasError
            ? 'border-red-400 shadow-lg shadow-red-100'
            : focused
              ? 'border-violet-500 shadow-lg shadow-violet-100'
              : 'border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <Icon size={16} className={`shrink-0 transition-colors ${hasError ? 'text-red-400' : focused ? 'text-violet-500' : 'text-slate-400'}`} />
        <div className="flex-1 relative py-3.5">
          <span
            className={`
              absolute left-0 transition-all duration-200 pointer-events-none font-medium
              ${active
                ? `text-[10px] top-1 ${hasError ? 'text-red-400' : 'text-violet-500'}`
                : 'text-sm top-1/2 -translate-y-1/2 text-slate-400'
              }
            `}
          >
            {label}
          </span>
          <input
            id={id}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); onBlurExtra && onBlurExtra() }}
            className="w-full bg-transparent outline-none text-slate-800 text-sm font-medium pt-4"
          />
        </div>
        {rightEl}
      </label>
    </motion.div>
  )
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [emailError, setEmailError] = useState('')

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

  const rules = [
    { label: 'ความยาวอย่างน้อย 8 ตัวอักษร', pass: form.password.length >= 8 },
    { label: 'มีตัวเลข (0-9)', pass: /\d/.test(form.password) },
    { label: 'มีตัวอักษรพิมพ์ใหญ่ (A-Z)', pass: /[A-Z]/.test(form.password) },
    { label: 'มีอักขระพิเศษ (!@#$%^&*)', pass: /[^A-Za-z0-9]/.test(form.password) },
  ]
  const passedCount = rules.filter(r => r.pass).length
  const strength = form.password.length === 0 ? 0 : passedCount <= 1 ? 1 : passedCount <= 3 ? 2 : 3
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500']
  const strengthLabel = ['', 'อ่อนเกินไป', 'พอใช้', 'แข็งแกร่ง']

  // ตัวส่งข้อมูลไปยัง backend เมื่อกดปุ่มสมัคร
  const handleSubmit = async () => {
  // 🔒 เช็คข้อมูลพื้นฐาน
  if (!form.name || !form.email || !form.password || !agreed) return

  // 📧 เช็ค format email
  if (!isValidEmail(form.email)) {
    setEmailError('กรุณากรอกอีเมลให้ถูกต้อง เช่น name@gmail.com')
    return
  }

  setEmailError('')
  setLoading(true)

  try {
    const res = await fetch('https://startupproject.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    // 🔥 เช็ค response จาก backend
    if (!res.ok) {
      if (data.error === 'EMAIL_EXISTS') {
        setEmailError('อีเมลนี้ถูกใช้งานแล้ว')
      } else {
        alert('เกิดข้อผิดพลาด')
      }
      setLoading(false)
      return
    }

    console.log(data)
    setSubmitted(true)

  } catch (err) {
    console.error(err)
    alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้')
  }

  setLoading(false)
}


  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-violet-50/40 to-indigo-50 flex">

      {/* Left Panel — Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 relative overflow-hidden flex-col justify-between p-12"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute bottom-[-60px] left-[-60px] w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.03]" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <TrendingUp size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-tight">Startup<span className="text-violet-200">Calc</span></div>
            <div className="text-violet-300 text-[9px] font-medium tracking-widest uppercase">Budget Planner</div>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-white text-4xl font-bold leading-tight">
              วางแผนธุรกิจ<br />
              <span className="text-violet-200">อย่างมืออาชีพ</span>
            </h2>
            <p className="mt-3 text-violet-200/80 text-sm leading-relaxed">
              คำนวณงบประมาณ วิเคราะห์ความเป็นไปได้<br />
              และวางแผนการลงทุนได้ในที่เดียว
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} className="text-emerald-300" />
                </div>
                <span className="text-white/80 text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-4 py-3">
            <div className="flex -space-x-2">
              {['🧑‍💼','👩‍💻','👨‍🍳','👩‍🔬'].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm border-2 border-white/20">
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="text-white text-xs font-semibold">2,400+ ผู้ประกอบการ</div>
              <div className="text-violet-300 text-[10px]">เริ่มต้นแล้วในเดือนนี้</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-violet-400/60 text-xs">
          © 2025 StartupCalc · ทุกสิทธิ์สงวน
        </div>
      </motion.div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Header */}
                <div className="mb-8">
                  {/* Mobile logo */}
                  <div className="lg:hidden flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                      <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-slate-800">Startup<span className="text-violet-600">Calc</span></span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <Sparkles size={11} />
                    ฟรี ไม่มีค่าใช้จ่าย
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 leading-tight">สร้างบัญชีของคุณ</h1>
                  <p className="mt-1.5 text-slate-500 text-sm">เริ่มวางแผนธุรกิจในฝันได้เลย ใช้เวลาไม่ถึง 1 นาที</p>
                </div>

                {/* Form fields */}
                <div className="space-y-3">
                  <FloatingInput
                    id="name" label="ชื่อ-นามสกุล" icon={User}
                    value={form.name} onChange={v => setForm({ ...form, name: v })}
                  />
                  <div>
                    <FloatingInput
                      id="email" label="อีเมล" type="email" icon={Mail}
                      value={form.email}
                      onChange={v => {
                        setForm({ ...form, email: v })
                        if (emailError) setEmailError(isValidEmail(v) ? '' : 'กรุณากรอกอีเมลให้ถูกต้อง เช่น name@gmail.com')
                      }}
                      onBlurExtra={() => {
                        if (form.email && !isValidEmail(form.email))
                          setEmailError('กรุณากรอกอีเมลให้ถูกต้อง เช่น name@gmail.com')
                        else setEmailError('')
                      }}
                      hasError={!!emailError}
                    />
                    <AnimatePresence>
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="mt-1.5 ml-1 text-[11px] text-red-500 font-medium flex items-center gap-1"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#ef4444"/><path d="M6 3.5v3M6 8v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <FloatingInput
                    id="password" label="รหัสผ่าน" type={showPass ? 'text' : 'password'} icon={Lock}
                    value={form.password} onChange={v => setForm({ ...form, password: v })}
                    rightEl={
                      <button onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />

                  {/* Password strength + rules */}
                  <AnimatePresence>
                    {form.password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Strength bar */}
                        <div className="flex gap-1.5 items-center px-1 mb-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-slate-200'}`} />
                          ))}
                          <span className={`text-[10px] font-semibold ml-1 shrink-0 ${
                            strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-emerald-500'
                          }`}>
                            {strengthLabel[strength]}
                          </span>
                        </div>
                        {/* Rules checklist */}
                        <div className="bg-slate-50 rounded-xl px-4 py-3 grid grid-cols-2 gap-y-2 gap-x-3">
                          {rules.map((rule, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-2"
                            >
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                rule.pass ? 'bg-emerald-500' : 'bg-slate-200'
                              }`}>
                                {rule.pass
                                  ? <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  : <div className="w-1 h-1 rounded-full bg-slate-400" />
                                }
                              </div>
                              <span className={`text-[10px] font-medium transition-colors ${rule.pass ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {rule.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Agreement */}
                <label className="flex items-start gap-3 mt-5 cursor-pointer group">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`
                      mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                      ${agreed ? 'bg-violet-600 border-violet-600' : 'border-slate-300 group-hover:border-violet-400'}
                    `}
                  >
                    {agreed && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className="text-slate-500 text-xs leading-relaxed">
                    ฉันยอมรับ{' '}
                    <a href="#" className="text-violet-600 font-medium hover:underline">ข้อกำหนดการใช้งาน</a>
                    {' '}และ{' '}
                    <a href="#" className="text-violet-600 font-medium hover:underline">นโยบายความเป็นส่วนตัว</a>
                  </span>
                </label>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(124,58,237,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || !form.name || !form.email || !form.password || !agreed}
                  className="mt-6 w-full cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles size={15} />
                      สร้างบัญชีฟรี
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-slate-400 text-xs">หรือ</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Google SSO */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium py-3 rounded-2xl transition-all text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  ลงทะเบียนด้วย Google
                </motion.button>

                <p className="text-center text-slate-500 text-xs mt-5">
                  มีบัญชีแล้ว?{' '}
                  <a href="#" className="text-violet-600 font-semibold hover:underline">เข้าสู่ระบบ</a>
                </p>
              </motion.div>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-200"
                >
                  <CheckCircle2 size={36} className="text-white" />
                </motion.div>
                <h2 className="mt-6 text-2xl font-bold text-slate-900">ยินดีต้อนรับ! 🎉</h2>
                <p className="mt-2 text-slate-500 text-sm">บัญชีของคุณถูกสร้างแล้ว พร้อมเริ่มวางแผนธุรกิจได้เลย</p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-flex items-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-violet-200"
                >
                  ไปคำนวณงบประมาณ
                  <ChevronRight size={16} />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}