# Frontend retail portal
### Description
Mock product details page that dynamically updates with selected product and style. This is my frontend capstone for the Software Engineering Immersive program at Galvanize/Hack Reactor. While this repo contains the entire portal built by my team, this Readme applies only to my part of the project, the product overview module (top most part of page and highlighted in Fig. 1). The overview module guides the user through selecting a style and size for a given product to add to cart. See Credits sections for other modules. The backend/database were pre-built by Galvanize/Hack Reactor.

screenshot of app highlighting my portion

### Installing
To get a development env running, fork and clone to local machine. From within the root directory, 'npm install' dependencies, then 'npm run react-dev' to get a development build, and 'npm start' to launch the app.

### Usage

screenshots
  style vs product
  how to render new style
  how to render new product (explain how search bar queries database)
  image gallery expanded view
  image gallery zoom view

### Deployment
Can be deployed on an AWS EC2 T2.micro instance as shown http://18.220.37.180:8000/ by cloning onto the instance, installing nvm, installing dependencies ('npm install'), running 'npm run build' on the instance and then starting the Express server with 'node app.js' (I pre-specified port 8000).

### Built With
- Webpack
- Babel
- React
- Bootstrap (for pre-defined media queries)
- Sass/SCSS, CSS
- Trello (for task ticketing)

### Credit
Alex and Josh built the Q & A and Reviews sections, respectively. Visit their repos for those details. Thanks to them for helping create a great team dynamic, workflow and resource for hashing out ideas. Thanks to Galvanize and Hack Reactor for providing learning resources, infrastructure, and creating the backend/database for this project. Thanks to Teddi Maull and the technical residents for mentorship and guidance.
