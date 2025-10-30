"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LoginModal } from "@/components/login-modal"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AnimatedHero } from "@/components/animated-hero"
import { AnimatedTimeline } from "@/components/animated-timeline"
import { AnimatedProblems } from "@/components/animated-problems"
import { AnimatedCriteria } from "@/components/animated-criteria"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { Swords, Shield, Crown } from "lucide-react"

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user && mounted) {
      router.push("/dashboard")
    }
  }, [user, router, mounted])

  if (!mounted) return null
  if (user) return null

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Background Patterns - Simplified */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Single floating ornament instead of 3 */}
        <motion.div
          className="absolute top-20 right-20 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-32 h-32 text-emerald-500" />
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 border-b backdrop-blur-md relative"
        style={{
          borderImage: "linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(139, 92, 246, 0.3), rgba(234, 179, 8, 0.3)) 1",
          borderWidth: "0 0 2px 0",
          background: "rgba(8, 8, 20, 0.8)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            {/* Sponsor Logos */}
            <div className="flex items-center gap-3">
              <motion.img
                src="/baldmann.png"
                alt="BaldMann"
                className="w-10 h-10 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.img
                src="/jammu.png"
                alt="University of Jammu"
                className="w-10 h-10 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            {/* Separator */}
            <div className="w-px h-8 bg-linear-to-b from-emerald-400/50 to-violet-400/50"></div>
            
            {/* Main Logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Shield className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              NeuroFusion'25
            </h1>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setLoginOpen(true)}
              className="relative overflow-hidden group bg-linear-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 text-white font-bold px-6 py-2 border-2 border-emerald-400/50"
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Swords className="w-4 h-4" />
                Enter Portal
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <AnimatedHero />

      {/* Timeline Section */}
      <motion.section
        className="relative max-w-7xl mx-auto px-4 py-20 border-t"
        style={{
          borderImage: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent) 1",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-linear-to-r from-emerald-900/60 via-cyan-900/60 to-violet-900/60 border border-emerald-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold">Quest Timeline</p>
        </motion.div>
        <motion.h3
          className="text-5xl font-black mb-16 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            style={{ backgroundSize: "200% auto" }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Battle Schedule
          </motion.span>
        </motion.h3>
        <AnimatedTimeline />
      </motion.section>

      {/* Problem Statements */}
      <motion.section
        className="relative max-w-7xl mx-auto px-4 py-20 border-t"
        style={{
          borderImage: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent) 1",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-linear-to-r from-violet-900/60 via-purple-900/60 to-pink-900/60 border border-violet-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-violet-400 uppercase tracking-widest font-bold">Choose Your Quest</p>
        </motion.div>
        <motion.h3
          className="text-5xl font-black mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-linear-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            style={{ backgroundSize: "200% auto" }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Challenges Await
          </motion.span>
        </motion.h3>
        <AnimatedProblems />
      </motion.section>

      {/* Judging Criteria */}
      <motion.section
        className="relative max-w-7xl mx-auto px-4 py-20 border-t"
        style={{
          borderImage: "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), transparent) 1",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full bg-linear-to-r from-yellow-900/60 via-amber-900/60 to-orange-900/60 border border-yellow-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-yellow-400 uppercase tracking-widest font-bold">Victory Metrics</p>
        </motion.div>
        <motion.h3
          className="text-5xl font-black mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="bg-linear-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            style={{ backgroundSize: "200% auto" }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Judgment Criteria
          </motion.span>
        </motion.h3>
        <AnimatedCriteria />
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative border-t mt-20 py-12 text-center backdrop-blur-sm"
        style={{
          borderImage: "linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(139, 92, 246, 0.3), rgba(234, 179, 8, 0.3)) 1",
          background: "rgba(8, 8, 20, 0.6)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
        </motion.div>
        <p className="text-gray-300 mb-4 font-bold">© 2025 NeuroFusion'25. All rights reserved.</p>
        
        {/* Sponsor Logos in Footer */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/30"
            whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.6)" }}
          >
            <motion.img
              src="/baldmann.png"
              alt="BaldMann"
              className="w-8 h-8 object-contain"
              whileHover={{ scale: 1.1 }}
            />
            <span className="text-emerald-400 font-bold text-sm">BaldMann</span>
          </motion.div>
          
          <div className="text-gray-500">&</div>
          
          <motion.div 
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50 border border-violet-500/30"
            whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.6)" }}
          >
            <motion.img
              src="/jammu.png"
              alt="University of Jammu"
              className="w-8 h-8 object-contain"
              whileHover={{ scale: 1.1 }}
            />
            <span className="text-violet-400 font-bold text-sm">University of Jammu</span>
          </motion.div>
        </motion.div>
        
        <p className="text-sm text-gray-400 mb-2">
          Proudly sponsored by our partners
        </p>
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">May the code be with you</span>
          <Swords className="w-4 h-4 text-violet-400" />
        </motion.div>
      </motion.footer>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </main>
  )
}
