"use client"

import { useEffect, useRef } from "react"
import lottie, { AnimationItem } from "lottie-web"

interface LottieAnimationProps {
  animationUrl: string
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function LottieAnimation({
  animationUrl,
  className = "",
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Cleanup any existing animation first
    if (animationRef.current) {
      animationRef.current.destroy()
      animationRef.current = null
    }

    const loadAnimation = async () => {
      try {
        const response = await fetch(animationUrl)
        const animationData = await response.json()

        // Double check container still exists and no animation is loaded
        if (containerRef.current && !animationRef.current) {
          animationRef.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay,
            animationData,
          })
        }
      } catch (error) {
        console.error("Error loading Lottie animation:", error)
      }
    }

    loadAnimation()

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [animationUrl, loop, autoplay])

  return <div ref={containerRef} className={className} />
}

export default LottieAnimation
