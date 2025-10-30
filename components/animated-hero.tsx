"use client"

import { motion } from "framer-motion"
import { Sparkles, Swords } from "lucide-react"
import dynamic from "next/dynamic"

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false })

export function AnimatedHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-4 pb-8">
      {/* Two-Column Layout: Text Left, Lottie Right */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div className="text-left space-y-4 md:space-y-5" variants={itemVariants}>
            {/* Sponsor Logos Section */}
            <motion.div 
              className="flex items-center justify-center gap-8 md:gap-12 mb-8"
              variants={itemVariants}
            >
              {/* BaldMann Logo */}
              <motion.div
                className="relative flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border-2 border-emerald-500/50 p-3"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                      "0 0 40px rgba(16, 185, 129, 0.6)",
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ 
                    borderColor: "rgba(16, 185, 129, 0.8)",
                    boxShadow: "0 0 50px rgba(16, 185, 129, 0.8)"
                  }}
                >
                  <img 
                    src="/baldmann.png" 
                    alt="BaldMann" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  className="mt-3 px-3 py-1 bg-emerald-500/20 rounded-lg text-sm md:text-base font-bold text-emerald-300 border border-emerald-500/40 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  BaldMann
                </motion.div>
              </motion.div>

              {/* Sparkles Separator */}
              <motion.div
                className="flex flex-col items-center gap-2 mx-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-300" />
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              </motion.div>

              {/* University of Jammu Logo */}
              <motion.div
                className="relative flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border-2 border-violet-500/50 p-3"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(139, 92, 246, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.6)",
                      "0 0 20px rgba(139, 92, 246, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  whileHover={{ 
                    borderColor: "rgba(139, 92, 246, 0.8)",
                    boxShadow: "0 0 50px rgba(139, 92, 246, 0.8)"
                  }}
                >
                  <img 
                    src="/jammu.png" 
                    alt="University of Jammu" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  className="mt-3 px-3 py-1 bg-violet-500/20 rounded-lg text-sm md:text-base font-bold text-violet-300 border border-violet-500/40 whitespace-nowrap text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  University of Jammu
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Epic Title */}
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.span
                  className="block bg-linear-to-r from-emerald-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  NEURO
                </motion.span>
                <motion.span
                  className="block bg-linear-to-r from-violet-400 via-purple-300 to-violet-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  FUSION
                </motion.span>
                <motion.span
                  className="block bg-linear-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  25
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants}>
              <motion.p 
                className="text-base md:text-lg lg:text-xl font-light"
                animate={{
                  color: ["#a3e635", "#10b981", "#06b6d4", "#a3e635"],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Swords className="inline w-4 h-4 md:w-5 md:h-5 mr-2" />
                Where Innovation Meets Intelligence
                <Swords className="inline w-4 h-4 md:w-5 md:h-5 ml-2" />
              </motion.p>
            </motion.div>

            {/* Organizers Badge */}
            <motion.div 
              className="inline-block px-3 md:px-4 py-2 rounded-full bg-linear-to-r from-emerald-900/40 via-violet-900/40 to-yellow-900/40 border border-emerald-500/30 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs md:text-sm text-gray-300">
                Forged by <span className="text-emerald-400 font-bold">BaldMann</span>
                {" "}&{" "}
                <span className="text-violet-400 font-bold">University of Jammu</span>
              </p>
            </motion.div>


          </motion.div>

          {/* Right Column - Lottie Animation */}
          <motion.div 
            className="flex items-center justify-center lg:justify-end" 
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              <LottieAnimation 
                animationUrl="https://assets2.lottiefiles.com/packages/lf20_fcfjwiyb.json"
                className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] relative z-10"
              />
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div 
          className="w-6 h-12 md:w-8 md:h-14 border-2 rounded-full flex items-start justify-center p-2 relative overflow-hidden"
          animate={{
            borderColor: [
              "rgba(16, 185, 129, 0.5)",
              "rgba(139, 92, 246, 0.5)",
              "rgba(16, 185, 129, 0.5)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-emerald-400"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.p 
          className="text-xs text-gray-400 mt-2 tracking-wider hidden md:block"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL
        </motion.p>
      </motion.div>
    </section>
  )
}
