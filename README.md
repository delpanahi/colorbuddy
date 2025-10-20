## Color Buddy 
### for the "Inclusive Digital Solutions" track of the EmpowHER '25 Hackathon
<img width="200" height="200" alt="COLORBUDDY" src="https://github.com/user-attachments/assets/f0f9e70e-a29b-45dd-b2d9-150118c4822c" />

### Dependencies:
Please ensure that you have Python installed before running the program.
<br><br>
*You can install Python onto a **Windows** computer by running the line:*
<br>```winget install Python.Python.3``` 

*To install Python onto a **Mac** computer, run the following lines:*
<br>```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```
<br>```brew install python3```

*You can check if you have Python installed by running:*
<br>```python --version``` for **Windows**
<br>```python3 --version``` for **Mac**
<br><br>

If you have Python installed, running one of the above commands (like ```python3 --version```) should result in output like:
<br> ```Python 3.12.7```

*Once Python is installed, please run the line:* 
<br>```pip install -r .\requirements.txt``` for **Windows**
<br> ```python3 -m pip install -r requirements.txt``` for **Mac**
<br> ...in order to install the proper packages. 

*Finally, to start the Flask server, please run:*
<br> ```python app.py``` for **Windows** or
<br> ```python3 app.py``` for **Mac**

### Contributors:
- Delara Panahi
- Catie Austin
- Elena Goldman
- Natalie Wesseldine

## About Color Buddy:
**Color Buddy** is a tool that allows designers to understand what their designs may look like to people with various types of colorblindness. Through **Color Buddy**, we specifically show designers what their chosen colors look like to people with color vision deficiencies like protanopia, deuteranopia, and tritanopia. 

Once designers input an RGB value, **Color Buddy** will provide a visual of how their inputted color would look to those with protanopia (inablility to see red), deuteranopia (inability to see green), and tritanopia (inability to see blue). 

Our **Color Buddy** tool also includes an *About **Color Buddy*** tab, giving users more information about protanopia, deuteranopia, and tritanopia.
This *About **Color Buddy*** tab aims to bring awareness to colorblindness, encouraging inclusivity.

The last tab, *Credits*, showcases the contributors of this project to add a more personal touch to the tool. 

## How Color Buddy Works:
### Frontend:
```colorBuddy.html```
  - Where the tabs, buttons, text input, and images are created.
    
```colorBuddy.css```
  - Styles the different tabs and various components of the html file.
    
```colorBuddy.js```
  - Adds effects and animations to the components of the html file.
  - Renders the results from the Flask server. 

### Backend:
```colorBuddy.py```
  - Where colors are simulated based on the RGB input and the type of color vision deficiency (using Machado et al. matrices).
  - Also creates images of the colors to be displayed.
    
```app.py```
  - Where the Flask server is created.

## Details About Machado et. al Matrices:
The Machado et. al matrices translates a color that a color-normal person perceives into the color that a colorblind person may see. 
This model simulates missing/shifted cone responses in visual systems. It is a critical function in the ```colorspacious``` Python library.
Each 3x3 matrix transforms an RGB value into a strong approximation of the color that a colorblind person would see depending on their color vision deficiency.

### How This Method Works In Our Code:
1. The input RGB color (0–255 range) is normalized to 0–1 floating-point values.<br>
2. A transformation matrix corresponding to the selected color vision deficiency (protanopia, deuteranopia, or tritanopia) is chosen from the Machado model.<br>
3. The normalized RGB vector is multiplied by this 3×3 matrix to simulate altered cone responses in the visual system.<br>
4. The resulting RGB values are clipped to the valid range [0, 1], converted back to 0–255, and returned.


## Sources:
- “A Physiologically-based Model for Simulation of Color Vision Deficiency” — Machado, Oliveira & Fernandes (IEEE Transactions on Visualization & Computer Graphics, Vol. 15(6), Nov/Dec 2009)
- Colour Blind Awareness, www.colourblindawareness.org/. Accessed 20 Oct. 2025. 



