import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, Filter, Zap, Shield, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                TrippyPick
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                Browse
              </Link>
              <Link href="/compare" className="text-gray-600 hover:text-gray-900">
                Compare
              </Link>
              <Link href="/insights" className="text-gray-600 hover:text-gray-900">
                Insights
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Travel Discovery
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your Perfect
                  <span className="text-primary block">Travel Package</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  TrippyPick aggregates and analyzes thousands of travel packages from Instagram using advanced NLP and
                  data science to help you find the perfect trip.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white p-2 rounded-lg shadow-lg border max-w-md">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-400 ml-2" />
                  <Input placeholder="Where do you want to go?" className="border-0 focus-visible:ring-0 text-base" />
                  <Button size="sm">Search</Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/browse">
                  <Button size="lg" className="text-base px-8">
                    Explore Packages
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="text-base px-8 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Travel packages visualization"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="w-fit mx-auto">
              Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Choose TrippyPick?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes travel planning smarter, faster, and more personalized than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Instagram Integration</CardTitle>
                <CardDescription>
                  Automatically aggregates travel packages from Instagram using advanced scraping and NLP technology.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Smart Filtering</CardTitle>
                <CardDescription>
                  Use intelligent filters to find packages that match your budget, preferences, and travel style.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>
                  Get insights on pricing trends, popular destinations, and package comparisons with visual analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Our NLP algorithms understand your preferences and recommend the most suitable travel packages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Verified Packages</CardTitle>
                <CardDescription>
                  All packages are verified and analyzed for authenticity, pricing accuracy, and quality assurance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Stay updated with the latest packages, price changes, and availability in real-time.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="w-fit mx-auto">
              How It Works
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Simple Steps to Your Dream Trip</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Search & Filter</h3>
              <p className="text-gray-600">
                Use our smart search and filtering system to find packages that match your preferences and budget.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Compare & Analyze</h3>
              <p className="text-gray-600">
                Compare multiple packages side-by-side with detailed analytics and insights to make informed decisions.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Book & Enjoy</h3>
              <p className="text-gray-600">
                Connect directly with verified travel providers and book your perfect package with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Find Your Perfect Trip?</h2>
            <p className="text-xl opacity-90">
              Join thousands of travelers who trust TrippyPick to find the best travel packages tailored to their needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="text-base px-8">
                  Start Exploring
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Browse Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">TrippyPick</h3>
              <p className="text-gray-400">
                AI-powered travel package discovery platform that helps you find the perfect trip.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Product</h4>
              <div className="space-y-2">
                <Link href="/browse" className="block text-gray-400 hover:text-white">
                  Browse Packages
                </Link>
                <Link href="/compare" className="block text-gray-400 hover:text-white">
                  Compare
                </Link>
                <Link href="/insights" className="block text-gray-400 hover:text-white">
                  Insights
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white">
                  About
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contact
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white">
                  Privacy
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2">
                <Link href="/help" className="block text-gray-400 hover:text-white">
                  Help Center
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white">
                  FAQ
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrippyPick. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
