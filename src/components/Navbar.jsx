import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, TrendingUp, BarChart2, Lightbulb, Home, Info, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
const MotionLink = motion(Link)
const navItems = [
  { label: 'หน้าแรก', path: '/', icon: Home },
  { label: 'คำนวณงบ', path: '/calculator', icon: BarChart2 },
  { label: 'ไอเดียธุรกิจ', path: '/ideas', icon: Lightbulb },
  { label: 'เกี่ยวกับ', path: '/about', icon: Info },
]


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)'])
  const navShadow = useTransform(scrollY, [0, 80], ['0 0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0,0,0,0.08)'])

  return (
    <motion.nav
      style={{ background: navBg, boxShadow: navShadow }}
      className="fixed w-full z-50 backdrop-blur-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
                <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-slate-900">
                Startup<span className="text-violet-600">Calc</span>
              </span>
              <span className="text-[9px] font-medium text-slate-400 tracking-widest uppercase">
                Budget Planner
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  onClick={() => setActiveItem(i)}
                  className={`
                    relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors
                    ${activeItem === i
                      ? 'text-violet-600 bg-violet-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={14} strokeWidth={2} />
                  {item.label}
                  {activeItem === i && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-violet-50 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <MotionLink to="/login"  whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              เข้าสู่ระบบ
            </MotionLink>
            <MotionLink
              to="/register"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(124,58,237,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-200 cursor-pointer"
            >
              <Sparkles size={14} />
              เริ่มต้นฟรี
            </MotionLink>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {isOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-slate-100"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setActiveItem(i); setIsOpen(false) }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Icon size={14} className="text-slate-500" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.a>
                )
              })}

              <div className="pt-3 pb-1 flex flex-col gap-2.5 border-t border-slate-100 mt-2">
                <MotionLink to="/login" className="text-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors py-2">
                  เข้าสู่ระบบ
                </MotionLink>
                <MotionLink
                  to="/register"
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-semibold py-3 rounded-xl shadow-md shadow-violet-200"
                >
                  <Sparkles size={14} />
                  เริ่มต้นฟรี
                </MotionLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
