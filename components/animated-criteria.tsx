"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { JUDGING_CRITERIA } from "@/lib/mock-data"
import { Lightbulb, Code2, Target, TrendingUp, DollarSign } from "lucide-react"

export function AnimatedCriteria() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: { opacity: 1, scale: 1, rotateY: 0 },
  }

  const icons = [Lightbulb, Code2, Target, TrendingUp, DollarSign]
  const colors = [
    { bg: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/40", text: "text-emerald-400", glow: "rgba(16, 185, 129, 0.3)" },
    { bg: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/40", text: "text-violet-400", glow: "rgba(139, 92, 246, 0.3)" },
    { bg: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/40", text: "text-yellow-400", glow: "rgba(234, 179, 8, 0.3)" },
    { bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40", text: "text-cyan-400", glow: "rgba(6, 182, 212, 0.3)" },
    { bg: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/40", text: "text-pink-400", glow: "rgba(236, 72, 153, 0.3)" },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {JUDGING_CRITERIA.map((criteria, index) => {
        const Icon = icons[index]
        const color = colors[index]
        
        return (
          <motion.div 
            key={criteria.name} 
            variants={itemVariants} 
            className="h-full group"
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
                          <Card className={`relative p-6 border-2 ${color.border} bg-linear-to-br ${color.bg} backdrop-blur-sm h-full flex flex-col justify-between overflow-hidden group-hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-primary/50`}>
                {/* Holographic corners */}
                <div className="absolute top-0 left-0 w-6 h-6">
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${color.text} from-transparent`} />
                  <div className={`absolute top-0 left-0 h-full w-0.5 bg-linear-to-b ${color.text} from-transparent`} />
                </div>
                <div className="absolute top-0 right-0 w-6 h-6">
                  <div className={`absolute top-0 right-0 w-full h-0.5 bg-linear-to-l ${color.text} from-transparent`} />
                  <div className={`absolute top-0 right-0 h-full w-0.5 bg-linear-to-b ${color.text} from-transparent`} />
                </div>
                <div className="absolute bottom-0 left-0 w-6 h-6">
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r ${color.text} from-transparent`} />
                  <div className={`absolute bottom-0 left-0 h-full w-0.5 bg-linear-to-t ${color.text} from-transparent`} />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6">
                  <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-linear-to-l ${color.text} from-transparent`} />
                  <div className={`absolute bottom-0 right-0 h-full w-0.5 bg-linear-to-t ${color.text} from-transparent`} />
                </div>

                {/* Tech scan lines */}
                <div className="absolute inset-0 opacity-10">
                  <div style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)",
                  }} className="w-full h-full" />
                </div>

                {/* Animated glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${color.glow}, transparent)` }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  {/* Icon Badge */}
                  <motion.div
                    className={`w-16 h-16 rounded-lg bg-linear-to-br ${color.bg} border-2 ${color.border} flex items-center justify-center mb-4 relative overflow-hidden`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                    <Icon className={`w-8 h-8 ${color.text} relative z-10`} />
                  </motion.div>

                  <motion.h3
                    className={`font-bold text-foreground mb-3 text-base leading-tight ${color.text}`}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {criteria.name}
                  </motion.h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                      {criteria.description}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {criteria.subDescription}
                    </p>
                  </div>
                </div>



                {/* Scanning beam effect */}
                <motion.div
                  className={`absolute inset-x-0 h-px bg-linear-to-r from-transparent via-current to-transparent ${color.text}`}
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
              </Card>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
