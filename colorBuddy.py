from flask import Flask
from PIL import Image
import numpy as np
import io, base64

app = Flask(__name__, static_folder='.', static_url_path='')

# COLOR SIMULATION:
# rgb = list/tuple of three values [R, G, B] (each can be between 0-255)
# deficiency_type = string specifying which colorblindness type to simulate
def simulate_colorblindness(rgb, deficiency_type):

    """ The math in the following models works on normalized color values between 0-1
        Need to convert 0-255 integers into 0-1 values """
    
    rgb = np.array(rgb, dtype=float) / 255.0

    """ Using Machado et al. (2009) matrices
        --> analysis of how people with different color vision deficiencies (CVDs) perceive colors
        --> they built 3x3 transformation matrices that can be applied to RGB values
        --> depending on the deficiency, each matrix changes the ways that colors mix, representing how people with that deficiency see colors
        !! When you multiply an RGB value by one of these matrices, you receive an approximation of what a person with that CVD sees """
    

    """ First row of the matrices determine the new Red channel in (R, G, B)
        Second row of the matrices determine the new Green channel in (R, G, B)
        Third row of the matrices determines the new Blue channel in (R, G, B) """
    
    matrices = {
        "protanopia": np.array([
            [0.152286, 1.052583, -0.204868],
            [0.114503, 0.786281,  0.099216],
            [-0.003882, -0.048116, 1.051998]
        ]),
        "deuteranopia": np.array([
            [0.367322, 0.860646, -0.227968],
            [0.280085, 0.672501,  0.047413],
            [-0.011820, 0.042940, 0.968881]
        ]),
        "tritanopia": np.array([
            [1.255528, -0.076749, -0.178779],
            [-0.078411, 0.930809, 0.147602],
            [0.004733, 0.691367, 0.303900]
        ])
    }

    if deficiency_type == "none":
        rgb_sim = rgb
        
    # @ for matrix multiplication in NumPy
    # .T for transpose
    # Multiply the inputted RGB vector by the chosen transformation matrix (depending on CVD) to get the simulated RGB
    elif deficiency_type in matrices:
        rgb_sim = rgb @ matrices[deficiency_type].T
    else:
        rgb_sim = rgb

    # Some colors could end up negative or greater than 1
    # Ensure they are within the valid color range 0-1
    rgb_sim = np.clip(rgb_sim, 0, 1)

    # Convert back to 0-255 integers and return the simulated color, ready for frontend
    return (rgb_sim * 255).astype(int).tolist()



# GENERATE IMAGE FROM RGB VALUE:
# rgb_tuple = tuple of three ints, each between 0-255, representing red, green, and blue intensities
def rgb_to_image(rgb_tuple):

    # Creates a new 100x100 solid-color square image of the given RGB color
    img = Image.new("RGB", (100, 100), tuple(rgb_tuple))

    # Creates kind of like a "fake file" --> acts like a file object, never touches the disk
    buffer = io.BytesIO()

    # Saves the image data into buffer, image is encoded as a PNG file
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


