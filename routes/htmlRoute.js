const express = require('express')
const notesRouter = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'))

});

notesRouter.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/notes.html'))

});


module.exports = notesRouter;
