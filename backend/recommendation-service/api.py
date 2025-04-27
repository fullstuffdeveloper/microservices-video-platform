from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Recommendation Service Running!"})

@app.route("/recommend", methods=["GET"])
def recommend():
    # Simulated recommendations
    sample_recommendations = [
        {"title": "Learn Python Basics", "url": "https://example.com/python"},
        {"title": "Master Microservices", "url": "https://example.com/microservices"},
        {"title": "Best Video Editing Tricks", "url": "https://example.com/editing"},
    ]
    return jsonify(sample_recommendations)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004, debug=True)

