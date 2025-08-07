import os
from dotenv import load_dotenv
from supabase import create_client
from flask import Flask, render_template, request
import math

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- THE CRITICAL FIX IS ON THIS LINE ---
# This explicitly configures the static folder path for Flask.
app = Flask(__name__, static_folder='static', static_url_path='/static')


@app.route('/test')
def test():
    # Fetch data from packages table
    response = supabase.table('packages').select('*').execute()
    
    # Print in terminal
    print("Supabase packages table data:", response.data)
    
    # Return JSON to browser
    return {"packages": response.data}

@app.route('/')
@app.route('/home')
def home():
    features = [
        {
            "title": "Smart Filtering",
            "description": "Use intelligent filters to find packages that match your budget, preferences, and travel style",
            "icon": "fa-filter",
            "color": "purple"
        },
        {
            "title": "Data Analytics",
            "description": "Get insights on pricing trends, popular destinations, and package comparisons with visual analytics",
            "icon": "fa-chart-line",
            "color": "green"
        },
        {
            "title": "AI-Powered Matching",
            "description": "Our NLP algorithms understand your preferences and recommend the most suitable travel packages",
            "icon": "fa-bolt",
            "color": "orange"
        },
        {
            "title": "Verified Packages",
            "description": "All packages are verified and analyzed for authenticity, pricing accuracy, and quality assurance",
            "icon": "fa-shield-alt",
            "color": "red"
        },
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
    # This now correctly queries only the columns that exist
    response = supabase.table('packages').select(
        'package_id, package_name, destination, cost_per_package, themes, destination_img, days, nights'
    ).execute()
    packages = response.data if response.data else []
    # 🧹 Clean the destination_img paths
    for pkg in packages:
        if pkg.get("destination_img", "").startswith("static/"):
            pkg["destination_img"] = pkg["destination_img"].replace("static/", "", 1).strip()

    return render_template("browse.html", packages=packages)

# @app.route('/package/<int:package_id>')
# def package_detail(package_id):
#     # (Your package_detail function remains here)
#     response = supabase.table('packages').select('*').eq('package_id', package_id).single().execute()
#     if not response.data:
#         return "Package not found", 404
#     package = response.data
#     return render_template("package_detail.html", package=package)

@app.route('/package/<int:package_id>')
def package_detail(package_id):
    # --- THIS QUERY IS NOW REVERTED ---
    # It fetches only from the 'packages' table to avoid the join error.
    pkg_response = supabase.table('packages').select('*').eq('package_id', package_id).single().execute()
    
    # If the package doesn't exist, show a 404 error
    if not pkg_response.data:
        return "Package not found", 404
    package = pkg_response.data

    # Fetch the related itinerary for that package
    itinerary_response = supabase.table('itinerary').select('*').eq('package_id', package_id).execute()
    itinerary = itinerary_response.data if itinerary_response.data else []

    # Pass both package and itinerary to the template
    return render_template(
        "package_detail.html", 
        package=package,
        itinerary=itinerary
    )


# ... (all your other routes like /compare, /insights, etc., remain here) ...


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

# In your app.py, replace the entire /compare route and its helper function
# with the code below.

def transform_package_data(db_package):
    """
    Transforms a single package object from Supabase DB schema 
    to the structure expected by the Jinja template.
    """
    agency_data = db_package.get('agency', {}) or {} 

    themes_str = db_package.get('themes', '')
    themes_list = []
    if themes_str and themes_str.startswith('[') and themes_str.endswith(']'):
        cleaned_str = themes_str.strip("[]").replace("'", "")
        themes_list = [theme.strip() for theme in cleaned_str.split(',') if theme.strip()]

    highlights_list = [tag.strip() for tag in db_package.get('highlights', '').split(',') if tag.strip()]
    
    # Combine themes and highlights for the tags
    combined_tags = list(dict.fromkeys(themes_list + highlights_list))

    transformed = {
        "package_id": db_package.get('package_id'),
        "title": db_package.get('package_name', 'N/A'),
        "location": db_package.get('destination', 'N/A'),
        "price": db_package.get('cost_per_package', 0),
        # "original_price" has been removed to prevent the error
        "duration_days": db_package.get('days', 0),
        "duration": f"{db_package.get('days', 0)} days, {db_package.get('nights', 0)} nights",
        "rating": agency_data.get('avg_rating', 0),
        "reviews": agency_data.get('total_review_count', 0),
        "group_size": db_package.get('group_size', 0),
        "image_url": db_package.get('destination_img', ''), 
        "tags": combined_tags,
        "included": [item.strip() for item in db_package.get('inclusions_detailed', '').split(',') if item.strip()],
        "provider": db_package.get('agency_name', 'N/A')
    }
    transformed['value_score'] = calculate_value_score(transformed)
    return transformed


@app.route('/compare')
def compare():
    package_ids_str = request.args.get('ids', '')
    package_ids = []
    if package_ids_str:
        try:
            package_ids = [int(id) for id in package_ids_str.split(',') if id.isdigit()]
        except (ValueError, TypeError):
            package_ids = []
    
    packages_in_comparison = []
    if package_ids:
        response = supabase.table('packages') \
            .select('*, agency:agency_id(*)') \
            .in_('package_id', package_ids) \
            .execute()
        if response.data:
            db_packages_map = {item['package_id']: item for item in response.data}
            for pid in package_ids:
                if pid in db_packages_map:
                    packages_in_comparison.append(transform_package_data(db_packages_map[pid]))

    if len(packages_in_comparison) > 1:
        best_price_package = min(packages_in_comparison, key=lambda p: p['price'])
        best_price_package['is_best_price'] = True
        best_rating_package = max(packages_in_comparison, key=lambda p: p['rating'])
        best_rating_package['is_highest_rated'] = True

    padded_packages = packages_in_comparison[:]
    while len(padded_packages) < 3:
        padded_packages.append(None)
        
    packages_to_add = []
    # The query has been corrected to remove 'original_cost'
    query = supabase.table('packages').select('package_id, package_name, destination, cost_per_package, destination_img').limit(3)
    
    if package_ids:
        query = query.not_.in_('package_id', package_ids)
    
    response_to_add = query.execute()
    
    if response_to_add.data:
        for pkg in response_to_add.data:
            packages_to_add.append({
                "package_id": pkg.get('package_id'),
                "title": pkg.get('package_name'),
                "location": pkg.get('destination'),
                "price": pkg.get('cost_per_package'),
                # "original_price" has been removed to prevent the error
                "image_url": pkg.get('destination_img'),
            })

    return render_template(
        "compare.html", 
        packages=padded_packages,
        packages_to_add=packages_to_add
    )


# Add these imports at the top of your app.py file
from collections import Counter, defaultdict
import re
# The opencage import has been removed

@app.route('/insights')
def insights():
    # --- 1. KPI Calculations (Existing Logic) ---
    pkg_count_response = supabase.table('packages').select('package_id', count='exact').execute()
    total_packages = pkg_count_response.count if hasattr(pkg_count_response, 'count') else 0

    price_response = supabase.table('packages').select('cost_per_package').execute()
    avg_price = 0
    if price_response.data:
        prices = [p['cost_per_package'] for p in price_response.data if p.get('cost_per_package') is not None]
        if prices:
            avg_price = sum(prices) / len(prices)

    agency_count_response = supabase.table('agency').select('agency_id', count='exact').execute()
    total_agencies = agency_count_response.count if hasattr(agency_count_response, 'count') else 0

    rating_response = supabase.table('agency').select('avg_rating').execute()
    avg_rating = 0
    if rating_response.data:
        ratings = [a['avg_rating'] for a in rating_response.data if a.get('avg_rating') is not None]
        if ratings:
            avg_rating = sum(ratings) / len(ratings)

    kpi_data = {
        "total_packages": total_packages,
        "avg_price": avg_price,
        "total_agencies": total_agencies,
        "avg_rating": avg_rating
    }

    # --- 2. Fetch all necessary data in one go ---
    all_packages_response = supabase.table('packages').select('destination, themes, cost_per_package').execute()
    all_packages = all_packages_response.data if all_packages_response.data else []

    # --- 3. Trending Destinations (Existing Logic) ---
    destination_counts = Counter(pkg['destination'] for pkg in all_packages if pkg.get('destination'))
    top_destinations = destination_counts.most_common(3)

    # --- 4. Popular Categories with Custom Grouping (Existing Logic) ---
    category_map = {
        'Mountain Adventures': ['Adventure & Trekking', 'Camping & Nature'],
        'Wildlife and Nature': ['Camping & Nature', 'Wildlife & Forests'],
        'Cultural Tours': ['Heritage & Cultural'],
        'Beaches': ['Beaches & Coastal'],
        'Budget Friendly': ['Backpacking & Budget']
    }
    category_packages = defaultdict(set)
    for i, pkg in enumerate(all_packages):
        themes_str = pkg.get('themes', '[]')
        found_themes = re.findall(r"'(.*?)'", themes_str)
        for category, keywords in category_map.items():
            if any(keyword in found_themes for keyword in keywords):
                category_packages[category].add(i)
        price = pkg.get('cost_per_package')
        if price is not None and price > 10000:
            category_packages['Luxury Experience'].add(i)
    
    popular_categories = []
    if total_packages > 0:
        for category, packages_set in category_packages.items():
            count = len(packages_set)
            percentage = (count / total_packages) * 100
            popular_categories.append({"name": category, "count": count, "percentage": round(percentage)})
    popular_categories.sort(key=lambda x: x['count'], reverse=True)

    # --- 5. REVERTED: Rule-Based Regional Distribution ---
    destination_to_state_map = {
        # Karnataka
        'Hampi': 'Karnataka', 'Gokarna': 'Karnataka', 'Coorg': 'Karnataka', 
        'Chikmagalur': 'Karnataka', 'Agumbe': 'Karnataka', 'Dandeli': 'Karnataka',
        'Nethravati': 'Karnataka', 'Sakleshpur': 'Karnataka', 'Udupi': 'Karnataka',
        'Chikamagluru': 'Karnataka',

        # Kerala
        'Wayanad': 'Kerala', 'Munnar': 'Kerala', 'Alleppey': 'Kerala', 
        'Kochi': 'Kerala', 'Kerala Circuit': 'Kerala', 'Paithalama': 'Kerala',
        'Varkala': 'Kerala',

        # Tamil Nadu
        'Ooty': 'Tamil Nadu', 'Kodaikanal': 'Tamil Nadu', 'Pondicherry': 'Tamil Nadu',
        'Coonoor': 'Tamil Nadu', 'Valparai': 'Tamil Nadu', 'Yelagiri': 'Tamil Nadu',

        # Goa
        'Goa': 'Goa', 'Dhudhsagar Trek': 'Goa',
        
        # Other States
        'Gandikota': 'Andhra Pradesh'
    }
    regional_counts = Counter()
    for pkg in all_packages:
        destination = pkg.get('destination')
        if destination in destination_to_state_map:
            state = destination_to_state_map[destination]
            regional_counts[state] += 1
        elif destination: # If destination exists but is not in the map
            regional_counts['Other'] += 1
            
    # The total of regional_counts.values() will now equal total_packages
    
    # Format for the template, focusing on the states you requested
    target_states = ['Karnataka', 'Kerala', 'Tamil Nadu', 'Goa']
    regional_distribution = [{"name": state, "count": regional_counts.get(state, 0)} for state in target_states]


    # --- 6. Price Analysis and Distribution (Existing Logic) ---
    price_analysis = []
    for category, packages_set in category_packages.items():
        prices = [all_packages[i]['cost_per_package'] for i in packages_set if all_packages[i].get('cost_per_package') is not None]
        if prices:
            avg_cat_price = sum(prices) / len(prices)
            price_analysis.append({"name": category, "avg_price": round(avg_cat_price), "count": len(prices)})
    price_analysis.sort(key=lambda x: x['avg_price'], reverse=True)

    price_bins = {
        "₹1,000 - ₹4,000": (1000, 4000), "₹4,000 - ₹8,000": (4000, 8000),
        "₹8,000 - ₹10,000": (8000, 10000), "₹10,000+": (10000, float('inf'))
    }
    bin_counts = Counter()
    for pkg in all_packages:
        price = pkg.get('cost_per_package')
        if price is not None:
            for label, (lower, upper) in price_bins.items():
                if lower <= price < upper:
                    bin_counts[label] += 1
                    break
    
    price_distribution = []
    total_priced_packages = sum(bin_counts.values())
    if total_priced_packages > 0:
        for label, (lower, upper) in price_bins.items():
            count = bin_counts[label]
            percentage = (count / total_priced_packages) * 100
            price_distribution.append({"label": label, "count": count, "percentage": round(percentage)})

    return render_template(
        'insights.html', 
        kpis=kpi_data,
        trending_destinations=top_destinations,
        popular_categories=popular_categories,
        regional_distribution=regional_distribution,
        price_analysis=price_analysis,
        price_distribution=price_distribution
    )


# --- NEW ROUTE: Admin Sign In ---
@app.route('/admin/signin')
def admin_signin():
    return render_template('admin_signin.html')

# --- NEW ROUTE: Caption Recommender ---
@app.route('/caption-recommender')
def caption_recommender():
    return render_template('caption_recommender.html')

# --- NEW ROUTE: Price Predictor ---
@app.route('/price-predictor')
def price_predictor():
    return render_template('price_predictor.html')

if __name__ == '__main__':
    app.run(debug=True)