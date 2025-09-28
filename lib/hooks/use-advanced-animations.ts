"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// Advanced animation hook with intersection observer and gesture support
export function useAdvancedAnimations() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mouse tracking for magnetic effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({
        x: (e.clientX - centerX) / rect.width,
        y: (e.clientY - centerY) / rect.height,
      })
    }
  }, [])

  // Gesture handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    document.addEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    document.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleMouseDown = useCallback(() => setIsDragging(true), [])
  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  return {
    elementRef,
    isVisible,
    mousePosition,
    isHovered,
    isDragging,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
  }
}

// Stagger animation hook
export function useStaggerAnimation(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of items
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev]
                newState[i] = true
                return newState
              })
            }, i * delay)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [itemCount, delay])

  return { containerRef, visibleItems }
}

// Parallax scroll hook
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        setOffset(rate)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { elementRef, offset }
}

// Morphing animation hook
export function useMorphing(shapes: string[], interval = 3000) {
  const [currentShape, setCurrentShape] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length)
    }, interval)

    return () => clearInterval(timer)
  }, [shapes.length, interval])

  return { currentShape, shape: shapes[currentShape] }
}

// Magnetic button effect
export function useMagneticEffect(strength = 0.3) {
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        setTransform({ x: deltaX, y: deltaY })
      }
    },
    [strength],
  )

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleMouseLeave = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove)
    setTransform({ x: 0, y: 0 })
  }, [handleMouseMove])

  return {
    elementRef,
    transform,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
