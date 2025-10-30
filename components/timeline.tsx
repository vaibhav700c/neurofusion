"use client"

import { useEffect, useState } from "react"
import { TIMELINE } from "@/lib/mock-data"

export function Timeline() {
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
    if (diff < 3600000) return "active" // within 1 hour
    return "upcoming"
  }

  const totalDuration = TIMELINE[TIMELINE.length - 1].time.getTime() - TIMELINE[0].time.getTime()
  const elapsedTime = currentTime.getTime() - TIMELINE[0].time.getTime()
  const progressPercentage = Math.min(Math.max((elapsedTime / totalDuration) * 100, 0), 100)

  return (
    <div className="w-full py-8 px-4">
      <div className="space-y-6">
        <div className="relative">
          {/* Background progress bar */}
          <div className="absolute top-2 left-0 right-0 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-linear-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Timeline events */}
          <div className="flex items-center justify-between relative pt-8">
            {TIMELINE.map((event, index) => {
              const status = getTimelineStatus(event.time)
              const isActive = status === "active"
              const isCompleted = status === "completed"

              return (
                <div key={event.id} className="flex flex-col items-center flex-1">
                  <div className={`relative z-10 transition-all duration-300 ${isActive ? "scale-125" : "scale-100"}`}>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/50"
                          : isActive
                            ? "bg-cyan-500 border-cyan-300 shadow-lg shadow-cyan-500/50 animate-pulse"
                            : "bg-gray-700 border-gray-600"
                      }`}
                    />
                  </div>

                  <div className="text-center mt-4 w-24">
                    <p
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : isCompleted ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      {event.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-gray-400">
            {currentTime > TIMELINE[TIMELINE.length - 1].time
              ? "Hackathon Completed"
              : currentTime < TIMELINE[0].time
                ? "Hackathon Starting Soon"
                : "Hackathon In Progress"}
          </span>
        </div>
      </div>
    </div>
  )
}
