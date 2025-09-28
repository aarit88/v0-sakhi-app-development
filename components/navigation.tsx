"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Dumbbell, Utensils, Activity, Sparkles } from "lucide-react"
import { useMagneticEffect } from "@/lib/hooks/use-advanced-animations"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { elementRef: logoRef, transform: logoTransform, handlers: logoHandlers } = useMagneticEffect(0.2)
  const { elementRef: ctaRef, transform: ctaTransform, handlers: ctaHandlers } = useMagneticEffect(0.15)

  const navItems = [
    { href: "#dashboard", label: "Dashboard", icon: Activity },
    { href: "#devices", label: "Devices", icon: Heart },
    { href: "#exercise", label: "Exercise", icon: Dumbbell },
    { href: "#diet", label: "Nutrition", icon: Utensils },
    { href: "#health", label: "Health", icon: Sparkles },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(`#${currentSection}`)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass-pink border-b border-pink-200/30 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              ref={logoRef}
              className="flex items-center space-x-2 group cursor-pointer magnetic-container"
              style={{ transform: `translate(${logoTransform.x}px, ${logoTransform.y}px)` }}
              {...logoHandlers}
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 animate-morph-blob-1 flex items-center justify-center group-hover:animate-glow-pulse transition-all duration-300">
                <Heart className="w-6 h-6 text-white group-hover:animate-heartbeat" />
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-pink-400 rounded-full animate-particle-float-1"
                      style={{
                        left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 25}px`,
                        top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 25}px`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent group-hover:animate-gradient-shift animate-text-reveal">
                SAKHI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                const isActive = activeSection === item.href
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group animate-slide-up hover-lift-rotate ${
                      isActive
                        ? "text-pink-600 bg-pink-100 shadow-md"
                        : "text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? "animate-bounce-gentle" : "group-hover:scale-110 group-hover:rotate-12"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>

                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full animate-pulse" />
                    )}

                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/10 group-hover:to-rose-500/10 transition-all duration-300 -z-10" />
                  </button>
                )
              })}

              <Button
                ref={ctaRef}
                className="ml-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 magnetic-strong ripple relative overflow-hidden"
                style={{ transform: `translate(${ctaTransform.x}px, ${ctaTransform.y}px)` }}
                {...ctaHandlers}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="hover:bg-pink-50 transition-all duration-300 hover-scale relative"
              >
                <div className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                  {isOpen ? (
                    <X className="w-6 h-6 text-pink-500 animate-elastic-in" />
                  ) : (
                    <Menu className="w-6 h-6 text-pink-500" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden animate-elastic-in">
              <div className="px-2 pt-2 pb-3 space-y-1 glass-pink rounded-2xl mt-2 border border-pink-200/50 shadow-xl">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon
                  const isActive = activeSection === item.href
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 animate-slide-in-left hover-lift ${
                        isActive
                          ? "text-pink-600 bg-pink-100/80 shadow-sm"
                          : "text-gray-700 hover:text-pink-500 hover:bg-pink-50/80"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? "animate-bounce-gentle" : ""
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse" />}
                    </button>
                  )
                })}
                <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up ripple">
                  <span className="relative z-10">Get Started</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`group relative w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
                  isActive ? "bg-pink-500 shadow-lg animate-glow-pulse" : "bg-gray-300 hover:bg-pink-400"
                }`}
                title={item.label}
              >
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </div>

                {isActive && <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-30" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-1 bg-pink-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 animate-gradient-shift"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`,
          }}
        />
      </div>
    </>
  )
}
