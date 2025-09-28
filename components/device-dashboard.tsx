"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Thermometer,
  Droplets,
  Brain,
  Heart,
  Wifi,
  Battery,
  Settings,
  Power,
  TrendingUp,
  Clock,
  Zap,
  Activity,
  Bell,
  Signal,
  Bluetooth,
  Smartphone,
  Waves,
  Sun,
  Moon,
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useStaggerAnimation, useMagneticEffect } from "@/lib/hooks/use-advanced-animations"

export function DeviceDashboard() {
  const [heatPackTemp, setHeatPackTemp] = useState([38])
  const [bottleReminder, setBottleReminder] = useState(true)
  const [moodLightOn, setMoodLightOn] = useState(true)
  const [selectedMood, setSelectedMood] = useState("calm")
  const [isConnecting, setIsConnecting] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])

  const { containerRef, visibleItems } = useStaggerAnimation(3, 150)
  const { elementRef: syncButtonRef, transform: syncTransform, handlers: syncHandlers } = useMagneticEffect(0.3)

  const [devices, setDevices] = useState([
    {
      id: "heat-pack",
      name: "Smart Heat Pack",
      icon: Thermometer,
      status: "active",
      battery: 85,
      temperature: heatPackTemp[0],
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      description: "Providing gentle warmth therapy for menstrual comfort",
      lastSync: "2 min ago",
      usage: 78,
      signalStrength: 95,
      isCharging: false,
      nextMaintenance: "7 days",
      totalUsage: "24.5 hours",
      efficiency: 92,
    },
    {
      id: "water-bottle",
      name: "Smart Water Bottle",
      icon: Droplets,
      status: "active",
      battery: 92,
      hydration: 75,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      description: "Tracking hydration levels and sending gentle reminders",
      lastSync: "1 min ago",
      usage: 65,
      signalStrength: 88,
      isCharging: true,
      nextMaintenance: "14 days",
      totalUsage: "156 hours",
      efficiency: 87,
      waterTemp: 22,
      reminderInterval: 60,
    },
    {
      id: "mood-light",
      name: "AURA Mood Light",
      icon: Brain,
      status: moodLightOn ? "active" : "inactive",
      battery: 78,
      mood: selectedMood,
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      description: "Ambient lighting to support emotional wellness",
      lastSync: "30 sec ago",
      usage: 45,
      signalStrength: 92,
      isCharging: false,
      nextMaintenance: "21 days",
      totalUsage: "89 hours",
      efficiency: 94,
      brightness: 80,
      colorTemp: 3000,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate battery drain
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          battery: Math.max(0, device.battery - Math.random() * 0.1),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDeviceToggle = (deviceId: string) => {
    setIsConnecting(true)
    setTimeout(() => {
      setDevices((prev) =>
        prev.map((device) =>
          device.id === deviceId ? { ...device, status: device.status === "active" ? "inactive" : "active" } : device,
        ),
      )
      setIsConnecting(false)
      addNotification(
        `${deviceId} ${devices.find((d) => d.id === deviceId)?.status === "active" ? "deactivated" : "activated"}`,
      )
    }, 1000)
  }

  const addNotification = (message: string) => {
    setNotifications((prev) => [message, ...prev.slice(0, 2)])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(0, -1))
    }, 3000)
  }

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood)
    setDevices((prev) => prev.map((device) => (device.id === "mood-light" ? { ...device, mood } : device)))
    addNotification(`Mood light set to ${mood}`)
  }

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(selectedDevice === deviceId ? null : deviceId)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    addNotification(`Ambient sounds ${!isPlaying ? "started" : "stopped"}`)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    addNotification(`Volume set to ${value[0]}%`)
  }

  return (
    <section id="devices" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300/30 rounded-full animate-particle-float-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-rose-200/20 animate-morph-blob-1 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 animate-morph-blob-2 blur-3xl" />
      </div>

      <div className="fixed top-20 right-4 z-40 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="glass-pink rounded-xl p-4 shadow-xl animate-elastic-in border border-pink-200/50 backdrop-blur-xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center animate-glow-pulse">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-800 font-medium">{notification}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your Smart{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Device Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Monitor and control your connected health devices from one intelligent dashboard. Each device learns your
            patterns and adapts to your unique wellness needs.
          </p>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-3 gap-8 mb-12">
          {devices.map((device, index) => {
            const IconComponent = device.icon
            const isSelected = selectedDevice === device.id
            const isVisible = visibleItems[index]

            return (
              <Card
                key={device.id}
                className={`relative overflow-hidden border-0 bg-gradient-to-br ${device.bgColor} transition-all duration-500 cursor-pointer ${
                  isVisible ? "animate-slide-up opacity-100" : "opacity-0"
                } ${
                  isSelected
                    ? "ring-2 ring-pink-400 shadow-2xl scale-105 animate-glow-pulse"
                    : "hover:shadow-xl card-interactive"
                }`}
                onClick={() => handleDeviceSelect(device.id)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 animate-pulse" />
                )}

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`relative w-12 h-12 bg-gradient-to-br ${device.color} animate-morph flex items-center justify-center group-hover:animate-glow-pulse transition-all duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />

                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            device.signalStrength > 80
                              ? "bg-green-500 animate-pulse"
                              : device.signalStrength > 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={device.status === "active" ? "default" : "secondary"}
                        className={`transition-all duration-300 ${
                          device.status === "active"
                            ? "bg-green-100 text-green-700 animate-pulse shadow-sm"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {device.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {device.status === "inactive" && <XCircle className="w-3 h-3 mr-1" />}
                        {device.status}
                      </Badge>

                      <div className="flex items-center text-sm text-gray-600 space-x-1">
                        <Battery className={`w-4 h-4 ${device.isCharging ? "animate-pulse text-green-500" : ""}`} />
                        <span className={device.battery < 20 ? "text-red-500 font-semibold" : ""}>
                          {Math.round(device.battery)}%
                        </span>
                        {device.isCharging && <Zap className="w-3 h-3 text-green-500 animate-bounce" />}
                      </div>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {device.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 leading-relaxed">{device.description}</p>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Signal</span>
                      <div className="flex items-center space-x-1">
                        <Signal className="w-3 h-3 text-gray-400" />
                        <span className="font-medium">{device.signalStrength}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Efficiency</span>
                      <span className="font-medium text-green-600">{device.efficiency}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Usage</span>
                      <span className="font-medium">{device.usage}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Last sync</span>
                      <span className="font-medium">{device.lastSync}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  {/* Device-specific controls */}
                  {device.id === "heat-pack" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Temperature</span>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-pink-500" />
                          <span className="text-2xl font-bold text-pink-600 animate-bounce-gentle">
                            {heatPackTemp[0]}°C
                          </span>
                        </div>
                      </div>

                      <div className="relative">
                        <Slider
                          value={heatPackTemp}
                          onValueChange={(value) => {
                            setHeatPackTemp(value)
                            addNotification(`Heat pack temperature set to ${value[0]}°C`)
                          }}
                          max={45}
                          min={35}
                          step={1}
                          className="w-full"
                        />
                        <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs text-gray-400">
                          <span>Cool</span>
                          <span>Warm</span>
                          <span>Hot</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>35°C</span>
                        <span>45°C</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { temp: 37, label: "Gentle", icon: Sun },
                          { temp: 40, label: "Medium", icon: Waves },
                          { temp: 43, label: "Intense", icon: Zap },
                        ].map((preset) => {
                          const PresetIcon = preset.icon
                          return (
                            <Button
                              key={preset.temp}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setHeatPackTemp([preset.temp])
                                addNotification(`Heat pack set to ${preset.label} mode`)
                              }}
                              className="text-xs hover-lift-rotate flex items-center space-x-1 transition-all duration-300"
                            >
                              <PresetIcon className="w-3 h-3" />
                              <span>{preset.label}</span>
                            </Button>
                          )
                        })}
                      </div>

                      <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-pink-700 font-medium">Therapy Session</span>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-pink-500" />
                            <span className="font-semibold text-pink-800">15:30</span>
                          </div>
                        </div>
                        <div className="text-xs text-pink-600 mt-1">Recommended: 20 minutes</div>
                        <Progress value={77.5} className="mt-2 h-2" />
                      </div>
                    </div>
                  )}

                  {device.id === "water-bottle" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Hydration Level</span>
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-2xl font-bold text-blue-600">{device.hydration}%</span>
                        </div>
                      </div>

                      <div className="relative">
                        <Progress value={device.hydration} className="w-full h-4 bg-blue-100" />
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-liquid-wave rounded-full transition-all duration-300"
                          style={{ width: `${device.hydration}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Smart Reminders</span>
                        <div className="flex items-center space-x-2">
                          <Bell
                            className={`w-4 h-4 ${bottleReminder ? "text-blue-500 animate-wiggle" : "text-gray-400"}`}
                          />
                          <Switch
                            checked={bottleReminder}
                            onCheckedChange={(checked) => {
                              setBottleReminder(checked)
                              addNotification(`Hydration reminders ${checked ? "enabled" : "disabled"}`)
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-blue-700 font-medium">Daily Goal</span>
                          <span className="font-semibold text-blue-800">2.5L / 3L</span>
                        </div>
                        <div className="text-xs text-blue-600 mb-2">500ml remaining</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span>Water temp</span>
                            <span className="font-medium">{device.waterTemp}°C</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Next reminder</span>
                            <span className="font-medium">{device.reminderInterval}min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {device.id === "mood-light" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Current Mood</span>
                        <Badge className="bg-purple-100 text-purple-700 capitalize animate-pulse flex items-center space-x-1">
                          <Brain className="w-3 h-3" />
                          <span>{selectedMood}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Light Status</span>
                        <div className="flex items-center space-x-2">
                          {moodLightOn ? (
                            <Sun className="w-4 h-4 text-yellow-500 animate-pulse" />
                          ) : (
                            <Moon className="w-4 h-4 text-gray-400" />
                          )}
                          <Switch
                            checked={moodLightOn}
                            onCheckedChange={(checked) => {
                              setMoodLightOn(checked)
                              addNotification(`Mood light ${checked ? "turned on" : "turned off"}`)
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Brightness</span>
                          <span className="font-medium">{device.brightness}%</span>
                        </div>
                        <Slider
                          value={[device.brightness]}
                          onValueChange={(value) => {
                            setDevices((prev) =>
                              prev.map((d) => (d.id === device.id ? { ...d, brightness: value[0] } : d)),
                            )
                          }}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { mood: "calm", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Waves },
                          { mood: "energetic", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Zap },
                          { mood: "focused", color: "bg-green-100 text-green-700 border-green-200", icon: Activity },
                          { mood: "relaxed", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Sparkles },
                        ].map(({ mood, color, icon: MoodIcon }) => (
                          <Button
                            key={mood}
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoodChange(mood)}
                            className={`text-xs capitalize transition-all duration-300 hover-lift flex items-center space-x-1 ${
                              selectedMood === mood ? `${color} border-2 animate-glow-pulse` : "hover:scale-105"
                            }`}
                          >
                            <MoodIcon className="w-3 h-3" />
                            <span>{mood}</span>
                          </Button>
                        ))}
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-purple-700 font-medium">Ambient Sounds</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={togglePlayback}
                            className="h-6 w-6 p-0 hover:bg-purple-200"
                          >
                            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <VolumeX className="w-4 h-4 text-purple-500" />
                          <Slider
                            value={volume}
                            onValueChange={handleVolumeChange}
                            max={100}
                            min={0}
                            step={5}
                            className="flex-1"
                          />
                          <Volume2 className="w-4 h-4 text-purple-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Wifi className="w-4 h-4" />
                        <Bluetooth className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium ${device.status === "active" ? "text-green-600" : "text-gray-500"}`}
                      >
                        {device.status === "active" ? "Connected" : "Disconnected"}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          device.status === "active" ? "bg-green-400 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                    </div>

                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeviceToggle(device.id)}
                        disabled={isConnecting}
                        className="hover-scale"
                      >
                        {isConnecting ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Power className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="hover-scale">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      device.status === "active" ? "bg-green-400 animate-pulse shadow-lg" : "bg-gray-400"
                    }`}
                  />
                  {device.isCharging && <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />}
                </div>

                <div className="absolute bottom-4 left-4">
                  {device.status === "active" && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Activity className="w-3 h-3 animate-pulse text-green-500" />
                      <span className="font-medium">Active</span>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" />
                    </div>
                  )}
                </div>

                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                    <span
                      className={
                        device.efficiency > 90
                          ? "text-green-600"
                          : device.efficiency > 70
                            ? "text-yellow-600"
                            : "text-red-600"
                      }
                    >
                      {device.efficiency}%
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 overflow-hidden relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 animate-gradient-shift" />
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center text-gray-900">
              <Zap className="w-5 h-5 mr-2 text-pink-500 animate-bounce-gentle" />
              Smart Controls
              <Sparkles className="w-4 h-4 ml-2 text-pink-400 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                ref={syncButtonRef}
                variant="outline"
                className="flex flex-col items-center p-6 h-auto bg-transparent magnetic-strong transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-50 hover:to-rose-50 group"
                style={{ transform: `translate(${syncTransform.x}px, ${syncTransform.y}px)` }}
                {...syncHandlers}
                onClick={() => {
                  devices.forEach((device) => handleDeviceToggle(device.id))
                  addNotification("All devices synchronized")
                }}
              >
                <Power className="w-6 h-6 mb-2 text-gray-600 group-hover:text-pink-500 transition-colors group-hover:animate-pulse" />
                <span className="text-sm font-medium">Sync All</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto bg-transparent hover-lift-rotate group"
              >
                <TrendingUp className="w-6 h-6 mb-2 text-gray-600 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium">Analytics</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto bg-transparent hover-lift-rotate group"
              >
                <Clock className="w-6 h-6 mb-2 text-gray-600 group-hover:text-green-500 transition-colors" />
                <span className="text-sm font-medium">Schedule</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto bg-transparent hover-lift-rotate group"
              >
                <Heart className="w-6 h-6 mb-2 text-gray-600 group-hover:text-red-500 transition-colors group-hover:animate-heartbeat" />
                <span className="text-sm font-medium">Health Sync</span>
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600 mt-1">Excellent</div>
                <div className="text-xs text-gray-500">All systems operational</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Devices</span>
                  <Smartphone className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {devices.filter((d) => d.status === "active").length}/{devices.length}
                </div>
                <div className="text-xs text-gray-500">Connected and monitoring</div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Battery</span>
                  <Battery className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 mt-1">
                  {Math.round(devices.reduce((acc, d) => acc + d.battery, 0) / devices.length)}%
                </div>
                <div className="text-xs text-gray-500">Across all devices</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
