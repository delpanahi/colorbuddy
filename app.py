from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route("/")
def index():
    return render_template("colorBuddy.html")  # inside templates/

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    rgb = data.get("rgb")
    # Return the RGB value for display
    return jsonify({"rgb": rgb})


if __name__ == "__main__":
    app.run(debug=True)
