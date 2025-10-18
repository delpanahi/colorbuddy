from flask import Flask
from flask import request, jsonify
from PIL import Image
import numpy as np
from colorspacious import cspace_convert
import io, base64

app = Flask(__name__, static_folder='.', static_url_path='')

# ----- Color Simulation -----
def simulate_colorblindness(rgb, deficiency_type):
    """Simulate protanopia, deuteranopia, or tritanopia"""
    rgb = np.array(rgb) / 255.0  # 0-1
    lms = cspace_convert(rgb, "sRGB1", "LMS")

    if deficiency_type == "protanopia":
        lms_sim = np.array([0, lms[1], lms[2]])
    elif deficiency_type == "deuteranopia":
        lms_sim = np.array([lms[0], 0, lms[2]])
    elif deficiency_type == "tritanopia":
        lms_sim = np.array([lms[0], lms[1], 0])
    else:
        lms_sim = lms

    rgb_sim = cspace_convert(lms_sim, "LMS", "sRGB1")
    rgb_sim = np.clip(rgb_sim, 0, 1)
    return (rgb_sim * 255).astype(int).tolist()

# ----- Generate image from RGB -----
def rgb_to_image(rgb_tuple):
    img = Image.new("RGB", (100, 100), tuple(rgb_tuple))
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


