const express = require("express");
// const DbDetails = require("DbDetails");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
// const noteLog = require('./db/db.json')
const fs = require("fs");

app.get("/notes", (req, res) => {
  // turns the json to english
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log(notes);
  // turns the notes into json
  res.json(notes);
});

// this controlls the adding of the new file to the array and sidebar
app.post("/notes", (req, res) => {
  console.log(req.body);
  // this will read the file where the notes are stored (database file)
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const { title, text } = req.body;
    if (err) {
      console.error(err);
    } else {
      newNote = JSON.parse(data);
      newNote.push({
        title,
        text,
        id: uuidv4(),
      });

      // This writes information to the databse
      fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("New note successfully added");
          res.status(200).send(newNote);
        }
      });
    }
  });
});



app.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const noteId = req.params.id;
    
      const newNote = JSON.parse(data).filter(note => note.id !== noteId);

    
      fs.writeFile("./db/db.json/:id", JSON.stringify(newNote), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Note successfully deleted");
          res.status(200).send(newNote);
        }
      });
    }
  });
});

module.exports = app;
