import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Smartphone } from 'lucide-react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const onInstalled = () => setInstalled(true)

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setDeferredPrompt(null)
  }

  if (!deferredPrompt || installed) return null

  return (
    <div>
      <motion.button
        onClick={handleInstall}
        whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 bg-linear-to-r from-sky-500 to-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md shadow-indigo-200"
      >
        <Download size={15} />
        ดาวน์โหลดแอปฟรี
      </motion.button>
      <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
        <Smartphone size={12} />
        รองรับ iOS, Android และ Desktop (PWA)
      </p>
    </div>
  )
}