from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
import numpy as np
from colorspacious import cspace_convert
import io, base64
from colorBuddy import simulate_colorblindness, rgb_to_image

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route("/")
def index():
    return render_template("colorBuddy.html")  # inside templates/


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    rgb = data.get("rgb")

    types = ["original", "protanopia", "deuteranopia", "tritanopia"]
    result = {}

    for t in types:
        sim_rgb = simulate_colorblindness(rgb, t if t != "original" else "none")
        result[t] = {
            "rgb": sim_rgb,
            "image": rgb_to_image(sim_rgb)
        }

    return jsonify(result)




if __name__ == "__main__":
    app.run(debug=True)
