"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Plane,
  Clock,
} from "lucide-react"

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const trendingDestinations = [
    { name: "Bali, Indonesia", growth: 23, packages: 156, avgPrice: 1299 },
    { name: "Santorini, Greece", growth: 18, packages: 89, avgPrice: 1699 },
    { name: "Tokyo, Japan", growth: 15, packages: 134, avgPrice: 1899 },
    { name: "Swiss Alps", growth: 12, packages: 67, avgPrice: 2499 },
    { name: "Dubai, UAE", growth: 8, packages: 92, avgPrice: 2799 },
  ]

  const priceAnalytics = [
    { category: "Beach Destinations", avgPrice: 1450, change: -5.2, packages: 234 },
    { category: "Mountain Adventures", avgPrice: 2100, change: 3.1, packages: 156 },
    { category: "City Breaks", avgPrice: 1680, change: -2.8, packages: 189 },
    { category: "Cultural Tours", avgPrice: 1820, change: 1.5, packages: 167 },
    { category: "Luxury Experiences", avgPrice: 3200, change: 7.3, packages: 78 },
  ]

  const seasonalTrends = [
    { month: "Jan", bookings: 1200, avgPrice: 1650 },
    { month: "Feb", bookings: 1100, avgPrice: 1580 },
    { month: "Mar", bookings: 1400, avgPrice: 1620 },
    { month: "Apr", bookings: 1600, avgPrice: 1750 },
    { month: "May", bookings: 1800, avgPrice: 1820 },
    { month: "Jun", bookings: 2200, avgPrice: 1950 },
  ]

  const popularProviders = [
    { name: "@bali_adventures", packages: 45, rating: 4.8, followers: "12.5K" },
    { name: "@swiss_tours", packages: 32, rating: 4.9, followers: "8.9K" },
    { name: "@japan_explorer", packages: 38, rating: 4.7, followers: "15.2K" },
    { name: "@greek_islands", packages: 28, rating: 4.9, followers: "6.7K" },
    { name: "@dubai_luxury", packages: 22, rating: 4.8, followers: "9.1K" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Travel Insights</h1>
              <p className="text-gray-600">Data-driven insights into travel trends and pricing</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Package Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-3.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.1</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="destinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Trending Destinations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending Destinations
                  </CardTitle>
                  <CardDescription>Destinations with highest growth in package offerings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingDestinations.map((destination, index) => (
                    <div key={destination.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{destination.name}</h4>
                          <p className="text-sm text-gray-600">{destination.packages} packages</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="font-semibold">+{destination.growth}%</span>
                        </div>
                        <p className="text-sm text-gray-600">${destination.avgPrice} avg</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Destination Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Popular Categories
                  </CardTitle>
                  <CardDescription>Distribution of packages by destination type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: "Beach Destinations", percentage: 32, count: 912 },
                    { category: "City Breaks", percentage: 24, count: 683 },
                    { category: "Mountain Adventures", percentage: 18, count: 512 },
                    { category: "Cultural Tours", percentage: 15, count: 427 },
                    { category: "Luxury Experiences", percentage: 11, count: 313 },
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-gray-600">{item.count} packages</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                      <div className="text-right">
                        <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Regional Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Regional Distribution
                </CardTitle>
                <CardDescription>Package distribution across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { region: "Asia", packages: 1024, growth: 15.2, color: "bg-blue-500" },
                    { region: "Europe", packages: 856, growth: 8.7, color: "bg-green-500" },
                    { region: "Americas", packages: 634, growth: 12.1, color: "bg-purple-500" },
                    { region: "Oceania", packages: 333, growth: 6.3, color: "bg-orange-500" },
                  ].map((region) => (
                    <div key={region.region} className="text-center space-y-2">
                      <div
                        className={`w-16 h-16 ${region.color} rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {region.packages}
                      </div>
                      <h3 className="font-semibold">{region.region}</h3>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center justify-center text-green-600">
                          <TrendingUp className="w-3 h-3 mr-1" />+{region.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Price Analysis by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Price Analysis by Category
                  </CardTitle>
                  <CardDescription>Average prices and trends across different travel categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {priceAnalytics.map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.category}</h4>
                        <p className="text-sm text-gray-600">{item.packages} packages</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${item.avgPrice}</div>
                        <div
                          className={`flex items-center text-sm ${item.change > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {item.change > 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Price Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Price Distribution
                  </CardTitle>
                  <CardDescription>How packages are distributed across price ranges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { range: "$0 - $500", count: 234, percentage: 8.2 },
                    { range: "$500 - $1,000", count: 567, percentage: 19.9 },
                    { range: "$1,000 - $2,000", count: 1245, percentage: 43.7 },
                    { range: "$2,000 - $3,000", count: 623, percentage: 21.9 },
                    { range: "$3,000+", count: 178, percentage: 6.3 },
                  ].map((item) => (
                    <div key={item.range} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.range}</span>
                        <span className="text-gray-600">{item.count} packages</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                      <div className="text-right">
                        <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Best Value Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Best Value Destinations
                </CardTitle>
                <CardDescription>
                  Destinations offering the best value for money based on price and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { destination: "Bali, Indonesia", price: 1299, rating: 4.8, valueScore: 9.2 },
                    { destination: "Prague, Czech Republic", price: 899, rating: 4.6, valueScore: 8.9 },
                    { destination: "Bangkok, Thailand", price: 756, rating: 4.5, valueScore: 8.7 },
                    { destination: "Lisbon, Portugal", price: 1156, rating: 4.7, valueScore: 8.5 },
                    { destination: "Budapest, Hungary", price: 678, rating: 4.4, valueScore: 8.3 },
                    { destination: "Istanbul, Turkey", price: 945, rating: 4.6, valueScore: 8.1 },
                  ].map((item) => (
                    <div key={item.destination} className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-semibold">{item.destination}</h4>
                      <div className="flex justify-between text-sm">
                        <span>Avg Price:</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rating:</span>
                        <span className="font-medium">{item.rating}★</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Value Score:</span>
                        <Badge variant="secondary">{item.valueScore}/10</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Seasonal Booking Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Seasonal Booking Trends
                  </CardTitle>
                  <CardDescription>Booking volume and pricing patterns throughout the year</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {seasonalTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-primary">{month.month}</span>
                        </div>
                        <div>
                          <div className="font-medium">{month.bookings} bookings</div>
                          <div className="text-sm text-gray-600">Average: ${month.avgPrice}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Progress value={(month.bookings / 2500) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Peak Season Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Peak Season Analysis
                  </CardTitle>
                  <CardDescription>Best times to book for different destination types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "Beach Destinations",
                      peak: "Dec - Feb",
                      shoulder: "Mar - May",
                      low: "Jun - Nov",
                      savings: "25%",
                    },
                    {
                      type: "Mountain Adventures",
                      peak: "Jun - Aug",
                      shoulder: "Apr - May, Sep",
                      low: "Oct - Mar",
                      savings: "30%",
                    },
                    {
                      type: "City Breaks",
                      peak: "Jul - Aug",
                      shoulder: "Apr - Jun, Sep",
                      low: "Oct - Mar",
                      savings: "20%",
                    },
                    {
                      type: "Cultural Tours",
                      peak: "Apr - Jun",
                      shoulder: "Mar, Jul - Sep",
                      low: "Oct - Feb",
                      savings: "22%",
                    },
                  ].map((item) => (
                    <div key={item.type} className="p-3 border rounded-lg space-y-2">
                      <h4 className="font-semibold">{item.type}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Peak:</span>
                          <span className="ml-2 font-medium">{item.peak}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Low:</span>
                          <span className="ml-2 font-medium">{item.low}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Potential savings in low season:</span>
                        <Badge variant="secondary" className="text-green-600">
                          Up to {item.savings}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Booking Lead Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plane className="w-5 h-5 mr-2" />
                  Optimal Booking Windows
                </CardTitle>
                <CardDescription>When to book for the best prices and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">2-3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Months in Advance</h3>
                      <p className="text-sm text-gray-600">Best prices for international packages</p>
                      <Badge variant="secondary" className="text-green-600">
                        Save up to 30%
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">4-6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Weeks in Advance</h3>
                      <p className="text-sm text-gray-600">Good balance of price and availability</p>
                      <Badge variant="secondary" className="text-blue-600">
                        Save up to 15%
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-600">1-2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Weeks in Advance</h3>
                      <p className="text-sm text-gray-600">Last-minute deals and cancellations</p>
                      <Badge variant="secondary" className="text-orange-600">
                        Save up to 25%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Providers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Top Performing Providers
                  </CardTitle>
                  <CardDescription>Providers with the highest ratings and package offerings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularProviders.map((provider, index) => (
                    <div key={provider.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.followers} followers</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{provider.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.packages} packages</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Provider Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Provider Growth Metrics
                  </CardTitle>
                  <CardDescription>Growth in provider activity and engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>New Providers (This Month)</span>
                        <span className="font-semibold">28</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Active Providers</span>
                        <span className="font-semibold">342</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Avg Packages per Provider</span>
                        <span className="font-semibold">8.3</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Avg Provider Rating</span>
                        <span className="font-semibold">4.7/5</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Provider Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Provider Specializations
                </CardTitle>
                <CardDescription>Distribution of providers by their specialization areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { category: "Adventure Tours", providers: 89, percentage: 26, avgRating: 4.6 },
                    { category: "Cultural Experiences", providers: 76, percentage: 22, avgRating: 4.8 },
                    { category: "Beach Resorts", providers: 65, percentage: 19, avgRating: 4.7 },
                    { category: "City Tours", providers: 54, percentage: 16, avgRating: 4.5 },
                    { category: "Luxury Travel", providers: 34, percentage: 10, avgRating: 4.9 },
                    { category: "Budget Travel", providers: 24, percentage: 7, avgRating: 4.4 },
                  ].map((item) => (
                    <div key={item.category} className="p-4 border rounded-lg space-y-3">
                      <h4 className="font-semibold">{item.category}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Providers:</span>
                          <span className="font-medium">{item.providers}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Market Share:</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Rating:</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{item.avgRating}</span>
                          </div>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
