"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Calendar, Star, Heart, Share2, SlidersHorizontal, Grid3X3, List } from "lucide-react"

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([500, 5000])

  const packages = [
    {
      id: 1,
      title: "Bali Paradise Getaway",
      location: "Bali, Indonesia",
      duration: "7 days, 6 nights",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Beach", "Culture", "Adventure"],
      provider: "@bali_adventures",
      discount: 19,
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
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Mountains", "Adventure", "Luxury"],
      provider: "@swiss_tours",
      discount: 14,
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
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Culture", "Food", "City"],
      provider: "@japan_explorer",
      discount: 14,
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
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Romance", "Beach", "Luxury"],
      provider: "@greek_islands",
      discount: 15,
    },
    {
      id: 5,
      title: "Amazon Rainforest Expedition",
      location: "Manaus, Brazil",
      duration: "8 days, 7 nights",
      price: 2199,
      originalPrice: 2599,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Adventure", "Nature", "Wildlife"],
      provider: "@amazon_tours",
      discount: 15,
    },
    {
      id: 6,
      title: "Dubai Luxury Experience",
      location: "Dubai, UAE",
      duration: "5 days, 4 nights",
      price: 2799,
      originalPrice: 3299,
      rating: 4.8,
      reviews: 142,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Luxury", "City", "Shopping"],
      provider: "@dubai_luxury",
      discount: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Packages</h1>
              <p className="text-gray-600">Discover amazing travel packages from around the world</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search destinations..." className="pl-10" />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 days</SelectItem>
                      <SelectItem value="4-7">4-7 days</SelectItem>
                      <SelectItem value="8-14">8-14 days</SelectItem>
                      <SelectItem value="15+">15+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="space-y-2">
                    {["Beach", "Adventure", "Culture", "Luxury", "Nature", "City", "Romance"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Rating</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                      <SelectItem value="3.0">3.0+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {packages.length} packages</p>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`group hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
                >
                  <div className={viewMode === "list" ? "w-64 flex-shrink-0" : ""}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        width={400}
                        height={300}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "h-48 w-full" : "aspect-[4/3] w-full"
                        }`}
                      />
                      {pkg.discount > 0 && <Badge className="absolute top-3 left-3 bg-red-500">-{pkg.discount}%</Badge>}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            <Link href={`/package/${pkg.id}`}>{pkg.title}</Link>
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {pkg.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {pkg.rating} ({pkg.reviews})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {pkg.duration}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {pkg.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                            {pkg.originalPrice > pkg.price && (
                              <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">per person</p>
                          <p className="text-xs text-gray-500">by {pkg.provider}</p>
                        </div>
                        <div className="space-y-2">
                          <Link href={`/package/${pkg.id}`}>
                            <Button className="w-full">View Details</Button>
                          </Link>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Compare
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Packages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
