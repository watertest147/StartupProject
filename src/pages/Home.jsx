// src/pages/Home.jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { BarChart2, Lightbulb, Sparkles, TrendingUp, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import InstallButton from '../components/InstallButton'

const MotionLink = motion(Link)

const features = [
  {
    icon: '🧮',
    color: '#f5f3ff',
    title: 'คำนวณงบอัตโนมัติ',
    desc: 'กรอกข้อมูล ระบบคำนวณต้นทุน กำไร และจุดคุ้มทุนให้อัตโนมัติพร้อมกราฟ',
  },
  {
    icon: '💡',
    color: '#ecfdf5',
    title: 'ไอเดียธุรกิจ AI',
    desc: 'AI แนะนำไอเดียธุรกิจที่เหมาะกับงบ ทำเล และสไตล์ของคุณโดยเฉพาะ',
  },
  {
    icon: '📱',
    color: '#fff7ed',
    title: 'ใช้ได้ทุกอุปกรณ์',
    desc: 'รองรับทั้ง iOS, Android และ Desktop ติดตั้งเป็นแอปได้เลยไม่ต้องผ่าน App Store',
  },
]

const stats = [
  { num: '12,000+', label: 'ผู้ใช้งานแล้ว' },
  { num: '98%', label: 'ความพึงพอใจ' },
  { num: 'ฟรี', label: 'ตลอดชีพ' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden">

        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[.08] blur-[100px] pointer-events-none animate-[float1_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 -right-10 w-[500px] h-[500px] rounded-full bg-indigo-600 opacity-[.07] blur-[100px] pointer-events-none animate-[float2_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500 opacity-[.07] blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">

          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5 }}
              className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-violet-200/60"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              เครื่องมือใหม่สำหรับสตาร์ทอัพไทย
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .1 }}
              className="text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold leading-[1.15] text-slate-900 mb-5"
            >
              วางแผนงบ{' '}
              <span className="bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                เริ่มธุรกิจ
              </span>
              {' '}ให้ฉลาดขึ้น
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .2 }}
              className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md"
            >
              คำนวณต้นทุน ประมาณรายได้ และค้นหาไอเดียธุรกิจที่ใช่ด้วย AI
              ช่วยวิเคราะห์ เหมาะสำหรับผู้เริ่มต้นและ SME
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .3 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <MotionLink
                to="/calculator"
                whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(124,58,237,.4)' }}
                whileTap={{ scale: .97 }}
                className="flex items-center gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-lg shadow-violet-200"
              >
                <BarChart2 size={16} />
                เริ่มคำนวณงบ
              </MotionLink>
              <MotionLink
                to="/ideas"
                whileHover={{ y: -2 }}
                whileTap={{ scale: .97 }}
                className="flex items-center gap-2 bg-white text-slate-700 font-semibold text-sm px-5 py-3.5 rounded-xl border-[1.5px] border-slate-200 hover:border-violet-400 hover:text-violet-600 transition-colors"
              >
                <Lightbulb size={16} />
                ดูไอเดียธุรกิจ
              </MotionLink>
            </motion.div>

            {/* Install button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .38 }}
            >
              <InstallButton />
              <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <Smartphone size={12} />
                รองรับ iOS, Android และ Desktop (PWA)
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .6, delay: .45 }}
              className="flex items-center gap-6 mt-8"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900">{s.num}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Budget card mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7, delay: .2 }}
            className="hidden lg:block relative p-4"
          >
            {/* Floating top badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 right-4 z-10 flex items-center gap-2 bg-white rounded-2xl px-3.5 py-2.5 shadow-lg text-xs"
            >
              <span className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center text-sm">💡</span>
              <div>
                <div className="font-semibold text-slate-800">ไอเดียใหม่</div>
                <div className="text-slate-400">ร้านกาแฟ + Co-working</div>
              </div>
            </motion.div>

            {/* Main card */}
            <div className="bg-white rounded-3xl p-7 shadow-[0_20px_60px_rgba(0,0,0,.10)] border border-slate-100">
              <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">ตัวอย่างแผนงบประมาณ</span>
              <h3 className="mt-3 mb-4 font-bold text-slate-900">ร้านกาแฟขนาดเล็ก 📊</h3>

              {[
                { label: 'รายได้ต่อเดือน', val: '+฿85,000', color: 'text-emerald-600' },
                { label: 'ต้นทุนวัตถุดิบ', val: '-฿28,000', color: 'text-red-500' },
                { label: 'ค่าเช่า + ค่าแรง', val: '-฿32,000', color: 'text-red-500' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 rounded-xl px-3.5 py-2.5 mb-2 text-sm">
                  <span className="text-slate-500">{row.label}</span>
                  <span className={`font-semibold ${row.color}`}>{row.val}</span>
                </div>
              ))}

              <div className="mt-4 mb-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1.5, delay: .8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-4">
                <span>ใช้ไปแล้ว 68%</span><span>เหลือ ฿25,000</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  กำไร ฿25,000/เดือน ✓
                </span>
                <div className="relative w-11 h-11">
                  <svg className="-rotate-90" width="44" height="44" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#ede9fe" strokeWidth="4"/>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#7c3aed" strokeWidth="4" strokeDasharray="113" strokeDashoffset="30" strokeLinecap="round"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-violet-700">73</span>
                </div>
              </div>
            </div>

            {/* Floating bottom badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5, ease: 'easeInOut' }}
              className="absolute -bottom-4 left-4 z-10 flex items-center gap-2 bg-white rounded-2xl px-3.5 py-2.5 shadow-lg text-xs"
            >
              <span className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">📈</span>
              <div>
                <div className="font-semibold text-slate-800">Break-even</div>
                <div className="text-slate-400">เดือนที่ 4</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">ทำไมต้อง StartupCalc</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">ครบ จบ ในที่เดียว</h2>
            <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
              เครื่องมือที่ออกแบบมาสำหรับคนไทยที่อยากเริ่มธุรกิจ ไม่ต้องรู้เรื่องการเงินมาก่อน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(124,58,237,.1)' }}
                className="bg-white rounded-2xl p-6 border border-slate-200 cursor-default transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}