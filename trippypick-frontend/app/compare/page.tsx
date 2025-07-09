"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  X,
  Plus,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

export default function ComparePage() {
  const [selectedPackages, setSelectedPackages] = useState([1, 2])
  const [searchQuery, setSearchQuery] = useState("")

  const allPackages = [
    {
      id: 1,
      title: "Bali Paradise Getaway",
      location: "Bali, Indonesia",
      duration: "7 days, 6 nights",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=300",
      provider: "@bali_adventures",
      highlights: ["Beach", "Culture", "Adventure"],
      included: ["Accommodation", "Breakfast", "Transport", "Guide"],
      groupSize: "Max 12",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      location: "Interlaken, Switzerland",
      duration: "5 days, 4 nights",
      price: 2499,
      originalPrice: 2899,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=300",
      provider: "@swiss_tours",
      highlights: ["Mountains", "Adventure", "Luxury"],
      included: ["Accommodation", "All Meals", "Transport", "Guide", "Equipment"],
      groupSize: "Max 8",
      difficulty: "Moderate",
    },
    {
      id: 3,
      title: "Tokyo Cultural Experience",
      location: "Tokyo, Japan",
      duration: "6 days, 5 nights",
      price: 1899,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
      provider: "@japan_explorer",
      highlights: ["Culture", "Food", "City"],
      included: ["Accommodation", "Breakfast", "Transport", "Guide"],
      groupSize: "Max 15",
      difficulty: "Easy",
    },
    {
      id: 4,
      title: "Santorini Sunset Romance",
      location: "Santorini, Greece",
      duration: "4 days, 3 nights",
      price: 1699,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg?height=200&width=300",
      provider: "@greek_islands",
      highlights: ["Romance", "Beach", "Luxury"],
      included: ["Accommodation", "Breakfast", "Transport", "Wine Tour"],
      groupSize: "Max 10",
      difficulty: "Easy",
    },
  ]

  const availablePackages = allPackages.filter((pkg) => !selectedPackages.includes(pkg.id))
  const comparePackages = allPackages.filter((pkg) => selectedPackages.includes(pkg.id))

  const addPackage = (packageId: number) => {
    if (selectedPackages.length < 3) {
      setSelectedPackages([...selectedPackages, packageId])
    }
  }

  const removePackage = (packageId: number) => {
    setSelectedPackages(selectedPackages.filter((id) => id !== packageId))
  }

  const getComparisonIcon = (value: number, compareValue: number) => {
    if (value < compareValue) return <TrendingDown className="w-4 h-4 text-green-500" />
    if (value > compareValue) return <TrendingUp className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Compare Packages</h1>
            <p className="text-gray-600">Compare up to 3 travel packages side by side</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedPackages.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Start Comparing</h2>
              <p className="text-gray-600">Select packages from below to start comparing features, prices, and more.</p>
            </div>
          </div>
        ) : (
          /* Comparison Table */
          <div className="space-y-8">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparePackages.map((pkg, index) => (
                    <Card key={pkg.id} className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => removePackage(pkg.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>

                      <CardHeader className="pb-4">
                        <div className="relative">
                          <Image
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-primary">#{index + 1}</Badge>
                        </div>
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{pkg.title}</CardTitle>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {pkg.location}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Price Comparison */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Price</h4>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                              {pkg.originalPrice > pkg.price && (
                                <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                              )}
                              {index > 0 && getComparisonIcon(pkg.price, comparePackages[0].price)}
                            </div>
                            <p className="text-xs text-gray-600">per person</p>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Duration</h4>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="text-sm">{pkg.duration}</span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Rating</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{pkg.rating}</span>
                            </div>
                            <span className="text-xs text-gray-600">({pkg.reviews} reviews)</span>
                          </div>
                        </div>

                        {/* Group Size */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Group Size</h4>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="text-sm">{pkg.groupSize}</span>
                          </div>
                        </div>

                        {/* Difficulty */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Difficulty</h4>
                          <Badge
                            variant={
                              pkg.difficulty === "Easy"
                                ? "secondary"
                                : pkg.difficulty === "Moderate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {pkg.difficulty}
                          </Badge>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Highlights</h4>
                          <div className="flex flex-wrap gap-1">
                            {pkg.highlights.map((highlight) => (
                              <Badge key={highlight} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* What's Included */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">What's Included</h4>
                          <div className="space-y-1">
                            {pkg.included.map((item) => (
                              <div key={item} className="flex items-center text-sm">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Provider */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">Provider</h4>
                          <p className="text-sm text-gray-600">{pkg.provider}</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2 pt-4 border-t">
                          <Link href={`/package/${pkg.id}`}>
                            <Button className="w-full" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full bg-transparent" size="sm">
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Package Card */}
                  {selectedPackages.length < 3 && (
                    <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[600px]">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Add Package</h3>
                          <p className="text-sm text-gray-600">Compare up to 3 packages</p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Comparison</CardTitle>
                <CardDescription>Key differences at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-700">Feature</th>
                        {comparePackages.map((pkg) => (
                          <th key={pkg.id} className="text-left py-2 font-medium text-gray-700 min-w-[200px]">
                            {pkg.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 font-medium text-gray-600">Best Price</td>
                        {comparePackages.map((pkg) => {
                          const isLowest = pkg.price === Math.min(...comparePackages.map((p) => p.price))
                          return (
                            <td key={pkg.id} className="py-3">
                              <div className="flex items-center space-x-2">
                                <span className={isLowest ? "text-green-600 font-semibold" : ""}>${pkg.price}</span>
                                {isLowest && (
                                  <Badge variant="secondary" className="text-xs">
                                    Best
                                  </Badge>
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-gray-600">Highest Rated</td>
                        {comparePackages.map((pkg) => {
                          const isHighest = pkg.rating === Math.max(...comparePackages.map((p) => p.rating))
                          return (
                            <td key={pkg.id} className="py-3">
                              <div className="flex items-center space-x-2">
                                <span className={isHighest ? "text-green-600 font-semibold" : ""}>{pkg.rating}★</span>
                                {isHighest && (
                                  <Badge variant="secondary" className="text-xs">
                                    Best
                                  </Badge>
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-gray-600">Value Score</td>
                        {comparePackages.map((pkg) => {
                          const valueScore = (pkg.rating * 20 - pkg.price / 100).toFixed(1)
                          const isHighest =
                            Number.parseFloat(valueScore) ===
                            Math.max(...comparePackages.map((p) => p.rating * 20 - p.price / 100))
                          return (
                            <td key={pkg.id} className="py-3">
                              <div className="flex items-center space-x-2">
                                <span className={isHighest ? "text-green-600 font-semibold" : ""}>{valueScore}</span>
                                {isHighest && (
                                  <Badge variant="secondary" className="text-xs">
                                    Best
                                  </Badge>
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Packages to Add */}
        {selectedPackages.length > 0 && selectedPackages.length < 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Add More Packages</h2>
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePackages
                .filter(
                  (pkg) =>
                    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pkg.location.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((pkg) => (
                  <Card key={pkg.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="relative">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.title}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{pkg.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {pkg.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">${pkg.price}</span>
                            {pkg.originalPrice > pkg.price && (
                              <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {pkg.rating} ({pkg.reviews})
                          </div>
                        </div>
                        <Button onClick={() => addPackage(pkg.id)} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
