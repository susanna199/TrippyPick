"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Share2,
  Clock,
  Plane,
  Hotel,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react"

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock data - in real app, fetch based on params.id
  const packageData = {
    id: 1,
    title: "Bali Paradise Getaway",
    location: "Bali, Indonesia",
    duration: "7 days, 6 nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    provider: "@bali_adventures",
    providerRating: 4.9,
    providerFollowers: "12.5K",
    discount: 19,
    tags: ["Beach", "Culture", "Adventure"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Experience the magic of Bali with this comprehensive 7-day package that combines stunning beaches, rich culture, and thrilling adventures. From the iconic rice terraces of Tegallalang to the sacred temples of Uluwatu, this journey will immerse you in the beauty and spirituality of the Island of the Gods.",
    highlights: [
      "Visit iconic Uluwatu Temple at sunset",
      "Explore traditional Ubud markets and rice terraces",
      "Relax on pristine beaches of Seminyak",
      "Traditional Balinese cooking class",
      "Volcano sunrise trekking at Mount Batur",
      "Spa treatments with traditional techniques",
    ],
    included: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast and 3 dinners",
      "Airport transfers and transportation",
      "English-speaking tour guide",
      "All entrance fees to attractions",
      "Traditional cooking class",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Lunch (except mentioned)",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar",
        description: "Airport pickup and transfer to Seminyak. Evening at leisure on the beach.",
      },
      {
        day: 2,
        title: "Uluwatu Temple & Kecak Dance",
        description: "Visit the clifftop Uluwatu Temple and watch traditional Kecak fire dance at sunset.",
      },
      {
        day: 3,
        title: "Ubud Cultural Experience",
        description: "Explore Ubud's art markets, visit Tegallalang Rice Terraces, and enjoy a cooking class.",
      },
      {
        day: 4,
        title: "Mount Batur Sunrise Trek",
        description: "Early morning volcano trek to catch the sunrise, followed by natural hot springs.",
      },
      {
        day: 5,
        title: "Beach Day & Spa",
        description: "Relax on Seminyak beach and enjoy traditional Balinese spa treatments.",
      },
      {
        day: 6,
        title: "Temple Hopping",
        description: "Visit Tanah Lot and Taman Ayun temples, shopping in local markets.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Final breakfast and airport transfer for departure.",
      },
    ],
    analytics: {
      priceHistory: [
        { month: "Jan", price: 1450 },
        { month: "Feb", price: 1380 },
        { month: "Mar", price: 1299 },
        { month: "Apr", price: 1350 },
        { month: "May", price: 1420 },
        { month: "Jun", price: 1599 },
      ],
      popularityScore: 85,
      bookingTrend: "increasing",
      bestTimeToBook: "2-3 months in advance",
      seasonality: "Peak season: July-August, December-January",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-primary">
              Browse
            </Link>
            <span>/</span>
            <span className="text-gray-900">{packageData.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{packageData.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {packageData.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {packageData.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {packageData.rating} ({packageData.reviews} reviews)
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {packageData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {packageData.discount > 0 && <Badge className="bg-red-500">-{packageData.discount}% OFF</Badge>}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={packageData.images[selectedImage] || "/placeholder.svg"}
                  alt={packageData.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {packageData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-md ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      width={150}
                      height={100}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {packageData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {packageData.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Not Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {packageData.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                {packageData.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {day.day}
                        </div>
                        Day {day.day}: {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{day.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary">{packageData.rating}</div>
                        <div className="flex justify-center my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(packageData.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{packageData.reviews} reviews</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Rating Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm w-8">{rating}★</span>
                          <Progress
                            value={rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : 2}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "8%" : "2%"}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">John Doe</h4>
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">2 weeks ago</span>
                            </div>
                            <p className="text-gray-700">
                              Amazing experience! The tour guide was knowledgeable and the accommodations were
                              excellent. The sunrise at Mount Batur was absolutely breathtaking. Highly recommend this
                              package!
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Price Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-primary">${packageData.price}</div>
                        <div className="text-sm text-gray-600">Current price is 15% below average</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>6-month low:</span>
                            <span className="font-semibold">$1,299</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>6-month high:</span>
                            <span className="font-semibold">$1,599</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Popularity Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-primary">
                          {packageData.analytics.popularityScore}/100
                        </div>
                        <Progress value={packageData.analytics.popularityScore} className="w-full" />
                        <div className="text-sm text-gray-600">
                          This package is trending {packageData.analytics.bookingTrend}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best Time to Book</h4>
                        <p className="text-gray-600">{packageData.analytics.bestTimeToBook}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Seasonality</h4>
                        <p className="text-gray-600">{packageData.analytics.seasonality}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-primary">${packageData.price}</span>
                        {packageData.originalPrice > packageData.price && (
                          <span className="text-lg text-gray-500 line-through">${packageData.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">per person</p>
                    </div>
                    {packageData.discount > 0 && (
                      <Badge className="bg-red-500">Save ${packageData.originalPrice - packageData.price}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add to Compare
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Free cancellation up to 48 hours</p>
                  </div>
                </CardContent>
              </Card>

              {/* Provider Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Travel Provider</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>BA</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{packageData.provider}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {packageData.providerRating} • {packageData.providerFollowers} followers
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm font-medium">{packageData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">Group Size</span>
                    </div>
                    <span className="text-sm font-medium">Max 12 people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Plane className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">Transport</span>
                    </div>
                    <span className="text-sm font-medium">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Hotel className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-medium">4-star hotels</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
