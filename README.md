# Collaborative Canvas Application

## Overview
The Collaborative Canvas Application is a web-based drawing tool that allows multiple users to draw on a shared canvas in real-time. Users can select colors, brush sizes, and see each other's drawings live. The application also includes features for saving the canvas as an image and resetting the canvas for new drawings.

## Features
- **2048x2048 Pixel Canvas**: A large canvas area for detailed drawings.
- **Live Drawing**: See real-time updates from other users as they draw.
- **Color Wheel and Palette**: Choose colors easily for drawing.
- **Brush Selection**: Select different brush types and adjust thickness.
- **Done Button**: Display the final canvas result below the drawing area.
- **Download Button**: Save the canvas as a .png file.
- **Reset Option**: Clear the canvas for a fresh start.
- **User Name Input**: Clients must enter their names before accessing the canvas, with names displayed live above the canvas while drawing.

## Project Structure
```
collaborative-canvas
├── public
│   ├── index.html
│   ├── styles
│   │   └── main.css
│   └── scripts
│       └── app.js
├── server
│   └── server.js
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd collaborative-canvas
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express
- Socket.io

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes. 

## License
This project is licensed under the MIT License.