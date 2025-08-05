import os
from dotenv import load_dotenv
from supabase import create_client
from flask import Flask, render_template

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)

# Testing backend connectivity
@app.route('/test')
def test():
    # Fetch data from packages table
    response = supabase.table('packages').select('*').execute()
    
    # Print in terminal
    print("Supabase packages table data:", response.data)
    
    # Return JSON to browser
    return {"packages": response.data}

@app.route('/home')
def home():
    features = [
        {
            "title": "Instagram Integration",
            "description": "Automatically aggregates travel packages from Instagram using advanced scraping and NLP technology.",
            "icon": "fa-globe",
            "color": "blue"
        },
        {
            "title": "Smart Filtering",
            "description": "Use intelligent filters to find packages that match your budget, preferences, and travel style.",
            "icon": "fa-filter",
            "color": "purple"
        },
        {
            "title": "Data Analytics",
            "description": "Get insights on pricing trends, popular destinations, and package comparisons with visual analytics.",
            "icon": "fa-chart-line",
            "color": "green"
        },
        {
            "title": "AI-Powered Matching",
            "description": "Our NLP algorithms understand your preferences and recommend the most suitable travel packages.",
            "icon": "fa-bolt",
            "color": "orange"
        },
        {
            "title": "Verified Packages",
            "description": "All packages are verified and analyzed for authenticity, pricing accuracy, and quality assurance.",
            "icon": "fa-shield-alt",
            "color": "red"
        },
        {
            "title": "Real-time Updates",
            "description": "Stay updated with the latest packages, price changes, and availability in real-time.",
            "icon": "fa-sync-alt",
            "color": "purple"
        }
    ]

    steps = [
        {"title": "Search & Filter", "description": "Find packages using smart filters and preferences.", "icon": "fa-search"},
        {"title": "Compare & Analyze", "description": "Analyze pricing, features, and destinations easily.", "icon": "fa-chart-bar"},
        {"title": "Book & Enjoy", "description": "Book your chosen package securely and start your trip.", "icon": "fa-suitcase-rolling"}
    ]

    return render_template(
        "home.html",
        title="Discover Your Perfect Travel Package",
        features=features,
        steps=steps
    )

@app.route('/browse')
def browse():
    packages = [
        {
            "title": "Weekend Trip to Coorg",
            "location": "Coorg, Karnataka",
            "price": 5999,
            "duration": "2 Days / 1 Night",
            "agency": "WanderOn",
            "rating": 4.5
        },
        {
            "title": "Leh-Ladakh Adventure",
            "location": "Leh, Ladakh",
            "price": 22999,
            "duration": "7 Days / 6 Nights",
            "agency": "Adventure Buddha",
            "rating": 4.8
        },
        {
            "title": "Meghalaya Monsoon Magic",
            "location": "Shillong, Cherrapunji",
            "price": 14999,
            "duration": "5 Days / 4 Nights",
            "agency": "MuddieTrails",
            "rating": 4.7
        }
    ]
    return render_template("browse.html", packages=packages)

@app.route('/compare')
def compare():
    packages = [
        {
            "title": "Bali Paradise Getaway",
            "location": "Bali, Indonesia",
            "price": 1299,
            "original_price": 1599,
            "duration": "7 days, 6 nights",
            "rating": 4.8,
            "reviews": 124,
            "group_size": 12,
            "difficulty": "Easy",
            "tags": ["Beach", "Culture", "Adventure"],
            "included": ["Accommodation", "Breakfast", "Transport", "Guide"],
            "provider": "bali_adventures"
        },
        {
            "title": "Swiss Alps Adventure",
            "location": "Interlaken, Switzerland",
            "price": 2499,
            "original_price": 2899,
            "duration": "5 days, 4 nights",
            "rating": 4.9,
            "reviews": 89,
            "group_size": 8,
            "difficulty": "Moderate",
            "tags": ["Mountains", "Adventure", "Luxury"],
            "included": ["Accommodation", "All Meals", "Transport", "Guide", "Equipment"],
            "provider": "swiss_tours"
        }
        # Third slot left empty to show "Add Package" placeholder
    ]

    return render_template("compare.html", packages=packages)


@app.route('/insights')
def insights():
    return render_template('insights.html')


if __name__ == '__main__':
    app.run(debug=True)
