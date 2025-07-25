from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    features = [
        "Instagram Integration",
        "Smart Filtering",
        "Data Analytics",
        "AI-Powered Matching",
        "Verified Packages",
        "Real-time Updates"
    ]
    steps = [
        "Search & Filter",
        "Compare & Analyze",
        "Book & Enjoy"
    ]
    return render_template("home.html", title="Discover Your Perfect Travel Package", features=features, steps=steps)

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
