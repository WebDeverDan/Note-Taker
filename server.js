// library to make the routing server
const express = require('express');
const app = express();

const PORT = process.env.port || 3000;


const htmlRoute = require('./routes/htmlRoute.js');
const apiRoute = require('./routes/apiRoute');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// extended false = faster de-encryption but lower quality
app.use(express.urlencoded({ extended: true }));



// the two routes are here
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.use(express.static('public'));

// GET Route for homepage
// this is for getting information from the server and sending to the index
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
// this is for getting information from the server (app) that the user has created and putting it on the feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// port activation - this allows the port to work
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);