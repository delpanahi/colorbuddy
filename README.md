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
<br>```python3 --version``` for **Macs**
<br><br>

If you have Python installed, running one of the above commands (like ```python3 --version```) should result in output like:
<br> ```Python 3.12.7```

*Once Python is installed, please run the line:* 
<br>```pip install -r .\requirements.txt```
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
This model simulates missing/shifted cone responses in visual systems.

### How This Method Works:
- First, an **RGB value is converted into an LMS space.**
  - LMS represents three types of cone cells in the human retina (**L**ong-wavelength aka red, **M**edium-wavelength aka green, and **S**hort-wavelength aka blue).
  - This transformation is performed by multiplying the RGB vector by a transformation matrix that is determined by the type of colorblindness.
    <br><br>
- The LMS values are then **converted back into a new RGB value** that represents what a person which a specific color vision deficiency would see.
  - This involves multiplying the LMS vector by the inverse of the initial matrix.
