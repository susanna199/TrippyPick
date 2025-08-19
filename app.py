import os
from dotenv import load_dotenv
from supabase import create_client
from flask import Flask, render_template, request, send_from_directory  
import math
import ast 

# Needed for admin dashboard
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import math
from collections import Counter, defaultdict
import re
from openai import OpenAI
from transformers import pipeline

from collections import Counter, defaultdict
import re


# --- This block calculates the absolute path to your project ---
# This ensures that Flask knows exactly where your project folder is,
# regardless of how you run the script.
project_root = os.path.abspath(os.path.dirname(__file__))

# --- Setup ---
# Load environment variables from .env file
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
openai_client = OpenAI(api_key=OPENAI_API_KEY)


# --- THE CRITICAL FIX IS ON THIS LINE ---
# This explicitly configures the static folder path for Flask.
app = Flask(__name__, root_path=project_root)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "a-default-fallback-secret-key")
# --- ADD THIS SECTION ---
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --- NLP Model Setup ---
theme_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
CANDIDATE_LABELS = [
    "Adventure & Trekking", "Mountains & Hill Stations", "Beaches & Coastal Getaways",
    "Heritage & Cultural", "Camping & Nature", "Wildlife & Forests",
    "Waterfalls & Lakes", "Backpacking / Budget Trips"
]

# @app.route('/test')
# def test():
#     # Fetch data from packages table
#     response = supabase.table('packages').select('*').execute()
    
#     # Print in terminal
#     print("Supabase packages table data:", response.data)
    
#     # Return JSON to browser
#     return {"packages": response.data}

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
    # --- 1. Fetch data for the filter dropdowns ---
    all_packages_response = supabase.table('packages').select('destination, days, agency_name, themes, cost_per_package').execute()
    all_packages = all_packages_response.data if all_packages_response.data else []
    
    # This part for populating filters remains the same
    destinations = sorted(list(set(p['destination'] for p in all_packages)))
    durations = sorted(list(set(p['days'] for p in all_packages)))
    agencies = sorted(list(set(p['agency_name'] for p in all_packages)))
    
    all_themes = set()
    for p in all_packages:
        try:
            themes_list = ast.literal_eval(p['themes'])
            all_themes.update(theme.strip() for theme in themes_list if theme.strip())
        except (ValueError, SyntaxError):
            continue
    themes = sorted(list(all_themes))

    costs = [p['cost_per_package'] for p in all_packages]
    min_cost = min(costs) if costs else 0
    max_cost = max(costs) if costs else 100000

    # --- 2. Build and execute the query based on filters ---
    query = supabase.table('packages').select('*')
    selected_destination = request.args.get('destination')
    selected_duration = request.args.get('duration')
    selected_agency = request.args.get('agency')
    selected_theme = request.args.get('theme')
    selected_max_cost = request.args.get('max_cost')

    if selected_destination:
        query = query.eq('destination', selected_destination)
    if selected_duration:
        query = query.eq('days', int(selected_duration))
    if selected_agency:
        query = query.eq('agency_name', selected_agency)
    if selected_max_cost:
        query = query.lte('cost_per_package', int(selected_max_cost))

    filtered_packages_response = query.execute()
    packages = filtered_packages_response.data if filtered_packages_response.data else []

    # --- 3. Apply the theme filter in Python ---
    if selected_theme:
        final_packages = []
        for package in packages:
            try:
                package_themes = ast.literal_eval(package['themes'])
                if package_themes and package_themes[0] == selected_theme:
                    final_packages.append(package)
            except (ValueError, SyntaxError, IndexError):
                continue
        packages = final_packages

    # --- NEW AND CORRECTED: Fix image paths on the FINAL list ---
    # This loop now runs on the 'packages' list that will actually be displayed.
    for pkg in packages:
        # Check if the key exists and the value is a string before trying to replace
        if isinstance(pkg.get('destination_img'), str) and pkg['destination_img'].startswith("static/"):
            pkg['destination_img'] = pkg['destination_img'].replace("static/", "", 1)
    
    # --- 4. Render the page ---
    return render_template(
        "browse.html",
        packages=packages, # This list now has the corrected image paths
        destinations=destinations,
        durations=durations,
        agencies=agencies,
        themes=themes,
        min_cost=min_cost,
        max_cost=max_cost,
        selected_filters=request.args 
    )

@app.route('/package/<int:package_id>')
def package_detail(package_id):
    # --- 1. Fetch the package details ---
    pkg_response = supabase.table('packages').select('*').eq('package_id', package_id).single().execute()
    
    if not pkg_response.data:
        return "Package not found", 404
    package = pkg_response.data

    # --- 2. Fetch the related itinerary ---
    itinerary_response = supabase.table('itinerary').select('*').eq('package_id', package_id).order('day_number', desc=False).execute()
    itinerary = itinerary_response.data if itinerary_response.data else []

    # --- 3. Fetch and process the corresponding agency's analytics data ---
    agency_id = package.get('agency_id')
    agency_data = {}
    if agency_id:
        agency_response = supabase.table('agency').select('*').eq('agency_id', agency_id).single().execute()
        if agency_response.data:
            agency_data = agency_response.data

            # --- Rating Percentages ---
            total_reviews = agency_data.get('total_review_count', 0)
            if total_reviews > 0:
                agency_data['five_star_percent'] = round((agency_data.get('5_star_count', 0) / total_reviews) * 100)
                agency_data['four_star_percent'] = round((agency_data.get('4_star_count', 0) / total_reviews) * 100)
                agency_data['three_star_percent'] = round((agency_data.get('3_star_count', 0) / total_reviews) * 100)
                agency_data['two_star_percent'] = round((agency_data.get('2_star_count', 0) / total_reviews) * 100)
                agency_data['one_star_percent'] = round((agency_data.get('1_star_count', 0) / total_reviews) * 100)
            else:
                agency_data['five_star_percent'] = agency_data['four_star_percent'] = agency_data['three_star_percent'] = agency_data['two_star_percent'] = agency_data['one_star_percent'] = 0

            # --- Keyword Parsing ---
            try:
                agency_data['top_positive_keywords'] = ast.literal_eval(agency_data.get('top_positive_keywords', '[]'))[:5]
                agency_data['top_negative_keywords'] = ast.literal_eval(agency_data.get('top_negative_keywords', '[]'))[:5]
            except (ValueError, SyntaxError):
                agency_data['top_positive_keywords'] = []
                agency_data['top_negative_keywords'] = []

            # --- Trust Score Calculation ---
            pos_percent = agency_data.get('positive_reviews_percentage', 0)
            neu_percent = agency_data.get('neutral_reviews_percentage', 0)
            neg_percent = agency_data.get('negative_reviews_percentage', 0)

            trust_score = (pos_percent * 1.0) + (neu_percent * 0.5) - (neg_percent * 1.5)
            agency_data['trust_score'] = max(0, min(100, trust_score))

            # --- Review Quality Score Calculation ---
            total_keywords = len(agency_data['top_positive_keywords']) + len(agency_data['top_negative_keywords'])
            total_keywords = min(total_keywords, 10)  # Cap at 10

            review_quality_score = (pos_percent * 0.4) + (neu_percent * 0.2) + ((total_keywords / 10) * 40)
            agency_data['review_quality_score'] = round(max(0, min(100, review_quality_score)))

    # --- 4. Pass all three data objects to the template ---
    return render_template(
        "package_detail.html", 
        package=package,
        itinerary=itinerary,
        agency=agency_data
    )

# --- NEW ROUTE TO MANUALLY SERVE IMAGES ---
@app.route('/static/images/<filename>')
def serve_image(filename):
    # This route will find the 'static/images' directory relative to the project root
    # and send the requested file from it.
    image_dir = os.path.join(project_root, 'static', 'images')
    return send_from_directory(image_dir, filename)


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


# --- NEW UNIFIED LOGIN ROUTE ---
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email_or_username = request.form.get('email_username')
        password = request.form.get('password')

        # --- Step 1: Check if the user is an Admin ---
        admin_username = os.getenv("ADMIN_USERNAME")
        admin_password = os.getenv("ADMIN_PASSWORD")

        if email_or_username == admin_username and password == admin_password:
            session['admin_logged_in'] = True
            flash('Admin login successful!', 'success')
            return redirect(url_for('admin_dashboard')) # Redirect to your admin dashboard

        # --- Step 2: If not an admin, check if they are an Agency ---
        response = supabase.table('agency_submissions').select('*').eq('email', email_or_username).single().execute()
        
        if response.data and check_password_hash(response.data['password'], password):
            session['agency_logged_in'] = True
            session['agency_email'] = response.data['email']
            session['agency_name'] = response.data['agency_name']
            flash('Agency login successful!', 'success')
            return redirect(url_for('agency_dashboard')) # Redirect to the agency dashboard

        # --- Step 3: If neither, the login fails ---
        flash('Invalid credentials. Please try again.', 'danger')
        return redirect(url_for('login'))

    # This runs when the page is first loaded (GET request)
    return render_template('login.html')

@app.route('/agency/signup', methods=['GET', 'POST'])
def agency_signup():
    # This block runs when the agency submits the registration form
    if request.method == 'POST':
        agency_name = request.form.get('agency_name')
        email = request.form.get('email')
        password = request.form.get('password')
        url = request.form.get('url')

        # First, check if an agency with this email already exists
        response = supabase.table('agency_submissions').select('email').eq('email', email).execute()
        if response.data:
            flash('An account with this email address already exists.', 'danger')
            return redirect(url_for('agency_signup'))

        # Hash the password for security before storing it
        hashed_password = generate_password_hash(password)

        # Prepare the data to be inserted into the database
        insert_data = {
            "agency_name": agency_name,
            "email": email,
            "password": hashed_password,
            "url": url,
            "approved": False, # Default to not approved
            "status": "not processed" # Default status
        }
        
        # Insert the new agency's data into the submissions table
        response = supabase.table('agency_submissions').insert(insert_data).execute()
        
        if response.data:
            flash('Registration successful! Please log in to continue.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Registration failed due to a server error. Please try again.', 'danger')
            return redirect(url_for('agency_signup'))

    # This runs when the page is first loaded
    return render_template('agency_signup.html')

# --- NEW: Agency Dashboard and Related Routes --
# --- Admin Routes ---
# @app.route('/admin/dashboard')
# def admin_dashboard():
#     if not session.get('admin_logged_in'):
#         return redirect(url_for('login'))

#     # Fetch data for both tabs
#     agency_submissions = supabase.table('agency_submissions').select('*').execute().data or []
#     package_submissions = supabase.table('package_submissions').select('*').execute().data or []
    
#     return render_template(
#         'admin_dashboard.html',
#         agency_submissions=agency_submissions,
#         package_submissions=package_submissions
#     )
# --- Admin Routes ---
@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('login'))

    # Fetch all agency submissions, ordered by most recent
    agency_submissions = supabase.table('agency_submissions').select('*').order('created_at', desc=True).execute().data or []
    
    # Fetch all package submissions, ordered by most recent
    package_submissions_raw = supabase.table('package_submissions').select('*').order('created_at', desc=True).execute().data or []
    
    # --- THIS IS THE CORRECTED LOGIC ---
    # Create a new list to store the processed packages
    package_submissions = []
    # Loop over the raw data you fetched from the database
    for pkg in package_submissions_raw:
        try:
            # Attempt to convert the cost to an integer
            pkg['cost_per_package'] = int(pkg['cost_per_package'])
        except (ValueError, TypeError):
            # If conversion fails, default to 0
            pkg['cost_per_package'] = 0
        package_submissions.append(pkg)

    return render_template(
        'admin_dashboard.html',
        agency_submissions=agency_submissions,
        package_submissions=package_submissions
    )
# @app.route('/agency/dashboard')
# def agency_dashboard():
#     # Protect the route
#     if not session.get('agency_logged_in'):
#         return redirect(url_for('login')) # Or your unified login route

#     # Fetch the agency's current submission status
#     email = session.get('agency_email')
#     response = supabase.table('agency_submissions').select('*').eq('email', email).single().execute()

#     if not response.data:
#         # Log them out if their record was deleted by an admin
#         session.clear()
#         return redirect(url_for('login'))

#     # Render the dashboard with their status
#     return render_template('agency_dashboard.html', submission=response.data)
@app.route('/agency/dashboard')
def agency_dashboard():
    # Step 1: Protect the route. If no one is logged in, redirect to the login page.
    if not session.get('agency_logged_in'):
        flash('Please log in to access the dashboard.', 'warning')
        return redirect(url_for('login'))
    
    # Check for parameters passed after a package submission
    package_submitted = request.args.get('package_submitted', default=False, type=bool)
    new_pkg_name = request.args.get('new_pkg_name', default='')
    
    days_for_itinerary = 0
    if package_submitted and new_pkg_name:
        # Fetch the number of days for the newly submitted package
        pkg_days_response = supabase.table('package_submissions').select('days').eq('package_name', new_pkg_name).order('created_at', desc=True).limit(1).single().execute()
        if pkg_days_response.data:
            days_for_itinerary = pkg_days_response.data.get('days', 0)

    # Step 2: Fetch the agency's current submission status from the database
    email = session.get('agency_email')
    response = supabase.table('agency_submissions').select('*').eq('email', email).single().execute()
    
    # Step 3: Handle the case where the agency might have been deleted by an admin
    if not response.data:
        session.clear() # Log them out if their record is gone
        flash('Your agency profile could not be found.', 'danger')
        return redirect(url_for('login'))

    # Step 4: Fetch the agency's submitted packages for the itinerary dropdown
    agency_name = session.get('agency_name')
    pkg_submission_response = supabase.table('package_submissions').select('package_name').eq('agency_name', agency_name).execute()
    submitted_packages = pkg_submission_response.data if pkg_submission_response.data else []

    # Step 5: Render the dashboard template with all the necessary data
    return render_template(
        'agency_dashboard.html', 
        submission=response.data,
        submitted_packages=submitted_packages,
        package_submitted=package_submitted,
        new_pkg_name=new_pkg_name,
        days_for_itinerary=days_for_itinerary
    )


@app.route('/admin/logout')
def admin_logout():
    # Clear the admin-specific session variable
    session.pop('admin_logged_in', None)
    flash('You have been successfully logged out.', 'success')
    return redirect(url_for('home'))

@app.route('/admin/verify_agencies', methods=['POST'])
def verify_agencies():
    if not session.get('admin_logged_in'):
        return redirect(url_for('login'))
    
    selected_ids = request.form.getlist('selected_agencies')
    if not selected_ids:
        flash('No agencies selected for verification.', 'warning')
        return redirect(url_for('admin_dashboard'))

    # Update the 'approved' status for each selected agency
    for agency_id in selected_ids:
        supabase.table('agency_submissions').update({'approved': True}).eq('id', agency_id).execute()
    
    flash(f'Successfully verified {len(selected_ids)} agencies.', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/run_summarizer/<int:submission_id>')
def run_inclusion_summarizer(submission_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('login'))

    # Fetch the package submission
    pkg_res = supabase.table('package_submissions').select('inclusions_detailed').eq('id', submission_id).single().execute()
    if not pkg_res.data:
        flash('Package submission not found.', 'danger')
        return redirect(url_for('admin_dashboard'))

    inclusions_text = pkg_res.data.get('inclusions_detailed', '')
    if not inclusions_text:
        flash('No detailed inclusions to summarize.', 'warning')
        return redirect(url_for('admin_dashboard'))

    # Call OpenAI API
    prompt = f"Summarize the following travel package inclusions into exactly 3 concise bullet points: {inclusions_text}. Return as a Python list of 3 strings."
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    summary = response.choices[0].message.content

    # Update the database
    supabase.table('package_submissions').update({'inclusions': summary}).eq('id', submission_id).execute()
    flash('Inclusions summarized successfully!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/run_classifier/<int:submission_id>')
def run_theme_classifier(submission_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('login'))

    # Fetch package and itinerary data
    pkg_res = supabase.table('package_submissions').select('package_name, description').eq('id', submission_id).single().execute()
    if not pkg_res.data:
        flash('Package submission not found.', 'danger')
        return redirect(url_for('admin_dashboard'))
    
    package_name = pkg_res.data['package_name']
    itinerary_res = supabase.table('itinerary_submissions').select('description').eq('package_name', package_name).execute()
    
    # Combine text
    full_text = pkg_res.data.get('description', '')
    if itinerary_res.data:
        itinerary_text = " ".join([i['description'] for i in itinerary_res.data])
        full_text += " " + itinerary_text

    if not full_text.strip():
        flash('No text available to classify themes.', 'warning')
        return redirect(url_for('admin_dashboard'))

    # Run classifier
    result = theme_classifier(full_text, CANDIDATE_LABELS, multi_label=True)
    themes = result['labels'][:3]

    # Update database
    supabase.table('package_submissions').update({'themes': ", ".join(themes)}).eq('id', submission_id).execute()
    flash('Themes classified successfully!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/agency/add_package', methods=['POST'])
def add_package():
    # Protect the route
    if not session.get('agency_logged_in'):
        return redirect(url_for('login'))

    # --- Handle File Upload ---
    if 'destination_img' not in request.files:
        flash('Image file is missing.', 'danger')
        return redirect(url_for('agency_dashboard'))
    file = request.files['destination_img']
    if file.filename == '':
        flash('No image selected for upload.', 'danger')
        return redirect(url_for('agency_dashboard'))
    
    if file:
        # Secure the filename and save it to your uploads folder
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        agency_name = session.get('agency_name')

        # --- Prepare data for the package_submissions table ---
        package_data = {
            "package_name": request.form.get('package_name'),
            "agency_name": agency_name,
            "destination": request.form.get('destination'),
            "cost_per_package": request.form.get('cost_per_package'),
            "days": request.form.get('days'),
            "nights": request.form.get('nights'),
            "group_size": request.form.get('group_size'),
            "description": request.form.get('description'),
            "highlights": request.form.get('highlights'),
            "inclusions_detailed": request.form.get('inclusions_detailed'),
            "exclusions_detailed": request.form.get('exclusions_detailed'),
            "destination_img": filepath # Save the path to the image
        }

        # --- Insert into package_submissions table ---
        supabase.table('package_submissions').insert(package_data).execute()

        # --- Update the agency's status to show they've added a package ---
        supabase.table('agency_submissions').update({"status": "package details added"}).eq('agency_name', agency_name).execute()

        flash('Package submitted successfully for admin review!', 'success')
        return redirect(url_for('agency_dashboard', package_submitted=True, new_pkg_name=package_data['package_name']))


# @app.route('/agency/add_package', methods=['POST'])
# def add_package():
#     if not session.get('agency_logged_in'):
#         return redirect(url_for('login'))

#     # --- Handle File Upload ---
#     if 'destination_img' not in request.files:
#         flash('Image file is missing.', 'danger')
#         return redirect(url_for('agency_dashboard'))
#     file = request.files['destination_img']
#     if file.filename == '':
#         flash('No image selected for upload.', 'danger')
#         return redirect(url_for('agency_dashboard'))
    
#     if file:
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)
        
#         agency_name = session.get('agency_name')

#         package_data = {
#             "package_name": request.form.get('package_name'),
#             "agency_name": agency_name,
#             "destination": request.form.get('destination'),
#             "cost_per_package": request.form.get('cost_per_package'),
#             "days": request.form.get('days'),
#             "nights": request.form.get('nights'),
#             "group_size": request.form.get('group_size'),
#             "description": request.form.get('description'),
#             "highlights": request.form.get('highlights'),
#             "inclusions_detailed": request.form.get('inclusions_detailed'),
#             "exclusions_detailed": request.form.get('exclusions_detailed'),
#             "destination_img": filepath
#         }

#         supabase.table('package_submissions').insert(package_data).execute()
#         supabase.table('agency_submissions').update({"status": "pending"}).eq('agency_name', agency_name).execute()

#         flash('Package submitted successfully! You can now add itinerary details below.', 'success')
        
#         return redirect(url_for('agency_dashboard', package_submitted=True, new_pkg_name=package_data['package_name']))

@app.route('/agency/add_itinerary', methods=['POST'])
def add_itinerary():
    if not session.get('agency_logged_in'):
        return redirect(url_for('login'))
    
    package_name = request.form.get('package_name')
    num_days = int(request.form.get('num_days', 0))
    agency_name = session.get('agency_name') # Get agency name from session
    
    itinerary_entries = []
    for i in range(1, num_days + 1):
        title = request.form.get(f'title_{i}')
        description = request.form.get(f'description_{i}')
        
        if title and description:
            # --- THIS DATA STRUCTURE IS CORRECTED ---
            # It now includes agency_name to match your new table schema.
            itinerary_entries.append({
                "package_name": package_name, # Corrected column name
                "agency_name": agency_name,
                "day_no": i,
                "title": title,
                "description": description
            })

    if itinerary_entries:
        supabase.table('itinerary_submissions').insert(itinerary_entries).execute()
        flash(f"Successfully added {len(itinerary_entries)} itinerary days for '{package_name}'!", 'success')
    else:
        flash("No itinerary details were provided.", "warning")

    return redirect(url_for('agency_dashboard'))


@app.route('/agency/logout')
def agency_logout():
    session.clear()
    flash('You have been successfully logged out.', 'success')
    return redirect(url_for('home'))

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