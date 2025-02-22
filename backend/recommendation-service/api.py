from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/recommend', methods=['GET'])
def recommend():
    return jsonify({"message": "Video recommendations go here"})

if __name__ == '__main__':
    app.run(port=5004, debug=True)


# python api.py
