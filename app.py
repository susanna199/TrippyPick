import os
from dotenv import load_dotenv
from supabase import create_client
from flask import Flask, render_template,request
import math

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

# @app.route('/compare')
# def compare():
#     packages = [
#         {
#             "title": "Bali Paradise Getaway",
#             "location": "Bali, Indonesia",
#             "price": 1299,
#             "original_price": 1599,
#             "duration": "7 days, 6 nights",
#             "rating": 4.8,
#             "reviews": 124,
#             "group_size": 12,
#             "difficulty": "Easy",
#             "tags": ["Beach", "Culture", "Adventure"],
#             "included": ["Accommodation", "Breakfast", "Transport", "Guide"],
#             "provider": "bali_adventures"
#         },
#         {
#             "title": "Swiss Alps Adventure",
#             "location": "Interlaken, Switzerland",
#             "price": 2499,
#             "original_price": 2899,
#             "duration": "5 days, 4 nights",
#             "rating": 4.9,
#             "reviews": 89,
#             "group_size": 8,
#             "difficulty": "Moderate",
#             "tags": ["Mountains", "Adventure", "Luxury"],
#             "included": ["Accommodation", "All Meals", "Transport", "Guide", "Equipment"],
#             "provider": "swiss_tours"
#         }
#         # Third slot left empty to show "Add Package" placeholder
#     ]

#     return render_template("compare.html", packages=packages)


# --- Helper Functions ---

def calculate_value_score(package):
    """
    Calculates a 'Value Score' for a package.
    A higher score is better.
    This is a sample formula; you can tune the weights.
    """
    try:
        price = float(package.get('price', 100000)) # Use a high default price to avoid division by zero
        rating = float(package.get('rating', 0))
        reviews = int(package.get('reviews', 0))
        days = int(package.get('duration_days', 1))

        # Weight reviews logarithmically so a jump from 10 to 100 is more significant than 1000 to 1100
        review_weight = math.log(reviews + 1) + 1 
        
        # Core value is rating weighted by reviews and duration
        quality_score = (rating * review_weight * days)
        
        # Value score is quality per dollar (multiplied by 1000 for a nicer number)
        value_score = (quality_score / price) * 1000
        
        return round(value_score, 1)
    except (ValueError, TypeError, ZeroDivisionError):
        return 0.0


def transform_package_data(db_package):
    """
    Transforms a single package object from Supabase DB schema 
    to the structure expected by the Jinja template.
    """
    # The JOIN is still useful for getting rating/review data from the agency table
    agency_data = db_package.get('agency', {}) or {} 

    transformed = {
        "package_id": db_package.get('package_id'),
        "title": db_package.get('package_name', 'N/A'),
        "location": db_package.get('destination', 'N/A'),
        "price": db_package.get('cost_per_package', 0),
        "original_price": db_package.get('original_cost'),
        "duration_days": db_package.get('days', 0),
        "duration": f"{db_package.get('days', 0)} days, {db_package.get('nights', 0)} nights",
        "rating": agency_data.get('avg_rating', 0),
        "reviews": agency_data.get('total_review_count', 0),
        "group_size": db_package.get('group_size', 0),
        "difficulty": db_package.get('difficulty', 'N/A'),
        "image_url": db_package.get('image_url', ''),
        "tags": [tag.strip() for tag in db_package.get('highlights', '').split(',') if tag.strip()],
        "included": [item.strip() for item in db_package.get('inclusions_detailed', '').split(',') if item.strip()],
        # Get agency_name directly from the package data, which is more reliable.
        "provider": db_package.get('agency_name', 'N/A')
    }
    # Calculate and add value score
    transformed['value_score'] = calculate_value_score(transformed)
    return transformed

# --- Main Flask Route ---

@app.route('/compare')
def compare():
    package_ids_str = request.args.get('ids', '')
    package_ids = []
    if package_ids_str:
        try:
            package_ids = [int(id) for id in package_ids_str.split(',') if id.isdigit()]
        except (ValueError, TypeError):
            package_ids = []
    
    # --- 1. Fetch and process packages for the main comparison view ---
    packages_in_comparison = []
    if package_ids:
        # The select query still joins with 'agency' to get review/rating data
        response = supabase.table('packages') \
            .select('*, agency:agency_id(*)') \
            .in_('package_id', package_ids) \
            .execute()
        if response.data:
            db_packages_map = {item['package_id']: item for item in response.data}
            for pid in package_ids:
                if pid in db_packages_map:
                    packages_in_comparison.append(transform_package_data(db_packages_map[pid]))

    # --- 2. Analyze the compared packages to find the "best" for the summary table ---
    if len(packages_in_comparison) > 1:
        # Find best price (lowest)
        best_price_package = min(packages_in_comparison, key=lambda p: p['price'])
        best_price_package['is_best_price'] = True
        
        # Find highest rating
        best_rating_package = max(packages_in_comparison, key=lambda p: p['rating'])
        best_rating_package['is_highest_rated'] = True

    # Pad with None to ensure 3 slots are always available for the template
    padded_packages = packages_in_comparison[:]
    while len(padded_packages) < 3:
        padded_packages.append(None)
        
    # --- 3. Fetch a list of other packages to show in the "Add More" section ---
    packages_to_add = []
    # --- MODIFICATION: ALWAYS FETCH 3 PACKAGES TO ADD ---
    # Create a query to get up to 3 other packages
    query = supabase.table('packages').select('*').limit(3)
    
    # Exclude the ones already being compared
    if package_ids:
        query = query.not_.in_('package_id', package_ids)
    
    response_to_add = query.execute()

    if response_to_add.data:
        # We only need a subset of data for the small "add" cards
        for pkg in response_to_add.data:
            packages_to_add.append({
                "package_id": pkg.get('package_id'),
                "title": pkg.get('package_name'),
                "location": pkg.get('destination'),
                "price": pkg.get('cost_per_package'),
                "original_price": pkg.get('original_cost'),
                "image_url": pkg.get('image_url'),
            })

    return render_template(
        "compare.html", 
        packages=padded_packages,
        packages_to_add=packages_to_add
    )
@app.route('/insights')
def insights():
    return render_template('insights.html')


if __name__ == '__main__':
    app.run(debug=True)
