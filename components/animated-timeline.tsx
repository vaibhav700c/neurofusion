"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TIMELINE } from "@/lib/mock-data"
import { Clock, Zap, Trophy, Flag, Crown } from "lucide-react"

export function AnimatedTimeline() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!currentTime) return null

  const getTimelineStatus = (eventTime: Date) => {
    const diff = eventTime.getTime() - currentTime.getTime()
    if (diff < 0) return "completed"
    if (diff < 3600000) return "active"
    return "upcoming"
  }

  const totalDuration = TIMELINE[TIMELINE.length - 1].time.getTime() - TIMELINE[0].time.getTime()
  const elapsedTime = currentTime.getTime() - TIMELINE[0].time.getTime()
  const progressPercentage = Math.min(Math.max((elapsedTime / totalDuration) * 100, 0), 100)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const icons = [Flag, Zap, Clock, Trophy, Crown]

  return (
    <motion.div
      className="w-full py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="space-y-12">
        <motion.div className="relative" variants={itemVariants}>
          {/* Medieval chain background */}
          <div className="absolute top-2 left-0 right-0 h-3 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-emerald-500/30" />
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="h-full bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between relative pt-16">
            {TIMELINE.map((event, index) => {
              const status = getTimelineStatus(event.time)
              const isActive = status === "active"
              const isCompleted = status === "completed"
              const Icon = icons[index]

              return (
                <motion.div key={event.id} className="flex flex-col items-center flex-1 relative" variants={itemVariants}>
                  {/* Connecting line to next milestone */}
                  {index < TIMELINE.length - 1 && (
                    <motion.div
                      className="absolute top-0 left-1/2 w-full h-1 -z-10"
                      style={{
                        background: isCompleted
                          ? "linear-gradient(90deg, rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.3))"
                          : "linear-gradient(90deg, rgba(75, 85, 99, 0.5), rgba(75, 85, 99, 0.3))",
                      }}
                    />
                  )}

                  <motion.div
                    className="relative z-10 mb-6"
                    animate={isActive ? { y: [-5, 5, -5] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {/* Fortress/Castle Style Badge */}
                    <motion.div
                      className={`relative w-20 h-20 rounded-lg border-2 flex items-center justify-center overflow-hidden ${
                        isCompleted
                          ? "bg-linear-to-br from-emerald-900/60 to-emerald-700/60 border-emerald-400"
                          : isActive
                            ? "bg-linear-to-br from-cyan-900/60 to-cyan-700/60 border-cyan-400"
                            : "bg-linear-to-br from-gray-900/60 to-gray-800/60 border-gray-600"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={
                        isActive
                          ? {
                              boxShadow: [
                                "0 0 20px rgba(6, 182, 212, 0.5)",
                                "0 0 40px rgba(6, 182, 212, 0.8)",
                                "0 0 20px rgba(6, 182, 212, 0.5)",
                              ],
                            }
                          : isCompleted
                            ? { boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }
                            : {}
                      }
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />

                      {/* Icon */}
                      <motion.div
                        animate={isActive ? { rotate: 360 } : {}}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            isCompleted
                              ? "text-emerald-300"
                              : isActive
                                ? "text-cyan-300"
                                : "text-gray-500"
                          }`}
                        />
                      </motion.div>

                      {/* Scan lines */}
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)",
                        }}
                      />

                      {/* Active pulse rings */}
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-cyan-400"
                            animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-violet-400"
                            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                          />
                        </>
                      )}

                      {/* Completion checkmark */}
                      {isCompleted && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div className="text-center w-32" variants={itemVariants}>
                    <motion.p
                      className={`text-sm font-bold transition-colors duration-300 mb-2 ${
                        isActive ? "text-cyan-400" : isCompleted ? "text-emerald-400" : "text-gray-400"
                      }`}
                      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {event.label}
                    </motion.p>
                    <motion.div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        isActive
                          ? "bg-cyan-900/40 border-cyan-500/50 text-cyan-300"
                          : isCompleted
                            ? "bg-emerald-900/40 border-emerald-500/50 text-emerald-300"
                            : "bg-gray-900/40 border-gray-600/50 text-gray-500"
                      }`}
                    >
                      {event.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 p-6 rounded-lg bg-linear-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 border border-emerald-500/30 backdrop-blur-sm"
          variants={itemVariants}
          whileHover={{ scale: 1.02, borderColor: "rgba(16, 185, 129, 0.6)" }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 shadow-lg"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-gray-200 font-bold text-lg">
            {currentTime > TIMELINE[TIMELINE.length - 1].time
              ? "👑 Quest Complete - Victory Achieved!"
              : currentTime < TIMELINE[0].time
                ? "⚔️ Prepare for Battle - Quest Begins Soon"
                : "⚡ Battle in Progress - Warriors Engaged!"}
          </span>
          <motion.div
            className="w-4 h-4 rounded-full bg-linear-to-r from-violet-500 to-pink-500 shadow-lg"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.75 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
