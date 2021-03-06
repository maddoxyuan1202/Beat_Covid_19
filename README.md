# Beat_Covid_19
A full stack project starter code for NodeJS.

# Process Of the whole full_stack
<img alt="Diagram" src="Full_stack_process.PNG" width="400" text-align="center">

The frontend is a simple web page that takes to country name: country_name and sends it to the backend using HTTP GET request.
The backend is a simple NodeJS server that processes the HTTP GET request, reads the parameters country_name and search its statsitics in database(got from CSSE at Johns Hopkins University (https://github.com/CSSEGISandData)) and returns the result back to the frontend.
By default frontend listens on port 8000, and backend listens on port 9000.

# Tools
## Frontend
 Bootstrap4 + HTML + JQuery + CSS
## Backend  
 Node.js + express 
## Api URL
 https://github.com/CSSEGISandData

# Install NodeJS
You can install NodeJs from here.(https://nodejs.org/en/download/).

Running this package
To download and install:

```bash
git clone https://github.com/maddoxyuan1202/Beat_Covid_19.git
cd Beat_Covid_19
npm install
```
Running Backend:
```bash
cd backend
node app.js
```
You can test backend by installing and running Postman:

<img alt="postman_backend" src="backend/postman_backend.png" width="400">

Running Frontend:
```bash
cd frontend
node app.js
```
Then open your browser to http://localhost:8000:

# screenshots of the demo
<img alt="Frontend" src="frontend.png" width="400">

# Link to the video
https://drive.google.com/file/d/1VcigbS_b3ZRQ49HIUcUdK7Ka2RKXyDvT/view?usp=sharing

# future work
use GeoJson file to show the data on a map to help user to have a clearly understanding of the present situation. User a api database like mangondb to store the data in it, in this way, the update of data will be more effective. 