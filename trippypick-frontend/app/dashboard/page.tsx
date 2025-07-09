"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Bell } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const savedPackages = [
    {
      id: 1,
      title: "Bali Paradise Getaway",
      location: "Bali, Indonesia",
      price: 1299,
      image: "/placeholder.svg?height=200&width=300",
      savedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      location: "Interlaken, Switzerland",
      price: 2499,
      image: "/placeholder.svg?height=200&width=300",
      savedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Tokyo Cultural Experience",
      location: "Tokyo, Japan",
      price: 1899,
      image: "/placeholder.svg?height=200&width=300",
      savedDate: "2 weeks ago"
    }
  ]

  const recentActivity = [
    { action: "Saved", item: "Santorini Sunset Romance", time: "2 hours ago" },
    { action: "Compared", item: "3 Beach Destinations", time: "1 day ago" },
    { action: "Viewed", item: "Amazon Rainforest Expedition", time: "3 days ago" },
    { action: "Saved", item: "Dubai Luxury Experience", time: "1 week ago" }
  ]

  const recommendations = [
    {
      id: 4,
      title: "Santorini Sunset Romance",
      location: "Santorini, Greece",
      price: 1699,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      reason: "Based on your interest in beach destinations"
    },
    {
      id: 5,
      title: "Amazon Rainforest Expedition",
      location: "Manaus, Brazil",
      price: 2199,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      reason: "Adventure packages similar to your saved items"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-gray-600">Ready to plan your next adventure?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div\
