"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { PROBLEM_STATEMENTS } from "@/lib/mock-data"
import { Sparkles, Code, Brain, Zap, Shield } from "lucide-react"

export function AnimatedProblems() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const icons = [Sparkles, Code, Brain, Zap, Shield]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {PROBLEM_STATEMENTS.map((problem, index) => {
        const Icon = icons[index % icons.length]
        const borderColors = [
          "from-emerald-500/60 via-cyan-500/60 to-emerald-500/60",
          "from-violet-500/60 via-purple-500/60 to-violet-500/60",
          "from-yellow-500/60 via-amber-500/60 to-yellow-500/60",
          "from-pink-500/60 via-rose-500/60 to-pink-500/60",
        ]
        const glowColors = [
          "rgba(16, 185, 129, 0.4)",
          "rgba(139, 92, 246, 0.4)",
          "rgba(234, 179, 8, 0.4)",
          "rgba(236, 72, 153, 0.4)",
        ]
        
        return (
          <motion.div key={problem.id} variants={itemVariants} className="h-full group">
            <motion.div
              whileHover={{ 
                y: -8, 
              }}
              transition={{ duration: 0.2 }}
              className="h-full relative"
            >
              <Card className="relative p-6 border-2 hover:border-opacity-100 bg-linear-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm h-full flex flex-col overflow-hidden transition-all duration-300"
                style={{
                  borderImage: `linear-gradient(135deg, ${borderColors[index % borderColors.length]}) 1`
                }}
              >
                {/* Corner Ornaments - Simplified */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors" />

                {/* Icon - Simplified */}
                <div
                  className={`relative w-12 h-12 rounded-lg bg-linear-to-br ${borderColors[index % borderColors.length]} flex items-center justify-center mb-4 flex-shrink-0`}
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                  <Icon className="relative z-10 w-6 h-6 text-white" />
                  
                  {/* Static number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-linear-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-xs font-bold text-black shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-bold text-foreground mb-3 text-base leading-tight flex-shrink-0 relative z-10 group-hover:text-emerald-300 transition-colors">
                  {problem.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-4 relative z-10 group-hover:text-gray-300 transition-colors">
                  {problem.description}
                </p>

                {/* Focus Areas Tags */}
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {problem.focusAreas.map((area, areaIndex) => (
                    <span
                      key={`${problem.id}-${area}-${areaIndex}`}
                      className="text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border whitespace-nowrap"
                      style={{
                        background: `linear-gradient(135deg, ${glowColors[index % glowColors.length]}, transparent)`,
                        borderColor: glowColors[index % glowColors.length].replace('0.4', '0.6')
                      }}
                    >
                      <span className="relative z-10 font-medium">{area}</span>
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
