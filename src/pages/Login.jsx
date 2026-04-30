import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Eye, EyeOff, Mail, Lock,
  ArrowRight, CheckCircle2, ChevronRight, ShieldCheck
} from 'lucide-react'

const highlights = [
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
    <motion.div variants={inputVariants} animate={focused ? 'focus' : 'blur'} className="relative">
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

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

  const handleSubmit = async () => {
  setLoginError('')

  if (!form.email || !form.password) return

  if (!isValidEmail(form.email)) {
    setEmailError('กรุณากรอกอีเมลให้ถูกต้อง เช่น name@gmail.com')
    return
  }

  setEmailError('')
  setLoading(true)

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      if (data.error === 'INVALID_CREDENTIALS') {
        setLoginError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      } else {
        setLoginError('เกิดข้อผิดพลาด')
      }
    } else {
      console.log(data)
      setLoggedIn(true)
    }

  } catch (err) {
    console.error(err)
    setLoginError('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้')
  }

  setLoading(false)
}

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-violet-50/40 to-indigo-50 flex">

      {/* ─── Left Panel — Branding ─── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex w-[45%] bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 relative overflow-hidden flex-col justify-between p-12"
      >
        {/* BG decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute bottom-[-60px] left-[-60px] w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.03]" />
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
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

        {/* Copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-white text-4xl font-bold leading-tight">
              ยินดีต้อนรับ<br />
              <span className="text-violet-200">กลับมาอีกครั้ง</span>
            </h2>
            <p className="mt-3 text-violet-200/80 text-sm leading-relaxed">
              แผนธุรกิจและงบประมาณของคุณ<br />
              รอคุณอยู่ที่นี่เลยครับ
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {highlights.map((item, i) => (
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
                <span className="text-white/80 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-emerald-300" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">ปลอดภัย 100%</div>
              <div className="text-violet-300 text-[10px]">ข้อมูลของคุณถูกเข้ารหัสด้วย SSL</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-violet-400/60 text-xs">
          © 2025 StartupCalc · ทุกสิทธิ์สงวน
        </div>
      </motion.div>

      {/* ─── Right Panel — Form ─── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {!loggedIn ? (
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
                    <ShieldCheck size={11} />
                    เข้าสู่ระบบอย่างปลอดภัย
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 leading-tight">เข้าสู่ระบบ</h1>
                  <p className="mt-1.5 text-slate-500 text-sm">ยินดีต้อนรับกลับ กรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ</p>
                </div>

                {/* Global login error */}
                <AnimatePresence>
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/>
                          <path d="M8 5v4M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {loginError}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fields */}
                <div className="space-y-3">
                  {/* Email */}
                  <div>
                    <FloatingInput
                      id="email" label="อีเมล" type="email" icon={Mail}
                      value={form.email}
                      onChange={v => {
                        setForm({ ...form, email: v })
                        setLoginError('')
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
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5.5" stroke="#ef4444"/>
                            <path d="M6 3.5v3M6 8v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                          {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password */}
                  <FloatingInput
                    id="password" label="รหัสผ่าน" type={showPass ? 'text' : 'password'} icon={Lock}
                    value={form.password}
                    onChange={v => { setForm({ ...form, password: v }); setLoginError('') }}
                    rightEl={
                      <button
                        onClick={() => setShowPass(!showPass)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                </div>

                {/* Remember me + Forgot */}
                <div className="flex items-center justify-between mt-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`
                        w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                        ${rememberMe ? 'bg-violet-600 border-violet-600' : 'border-slate-300 group-hover:border-violet-400'}
                      `}
                    >
                      {rememberMe && (
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-slate-500 text-xs">จดจำฉัน</span>
                  </label>

                  <a href="#" className="text-xs text-violet-600 font-semibold hover:underline">
                    ลืมรหัสผ่าน?
                  </a>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(124,58,237,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || !form.email || !form.password}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      เข้าสู่ระบบ
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
                  เข้าสู่ระบบด้วย Google
                </motion.button>

                <p className="text-center text-slate-500 text-xs mt-5">
                  ยังไม่มีบัญชี?{' '}
                  <a href="#" className="text-violet-600 font-semibold hover:underline">สมัครฟรีเลย</a>
                </p>
              </motion.div>

            ) : (
              /* ─── Success state ─── */
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
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-violet-200"
                >
                  <ShieldCheck size={36} className="text-white" />
                </motion.div>
                <h2 className="mt-6 text-2xl font-bold text-slate-900">เข้าสู่ระบบสำเร็จ! 👋</h2>
                <p className="mt-2 text-slate-500 text-sm">ยินดีต้อนรับกลับมา พร้อมเริ่มวางแผนธุรกิจได้เลย</p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-flex items-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-violet-200"
                >
                  ไปยังแดชบอร์ด
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