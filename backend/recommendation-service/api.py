from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Recommendation Service Running"})

@app.route("/recommend", methods=["GET"])
def recommend():
    return jsonify({"message": "Video recommendations here"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004, debug=True)
