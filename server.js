const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

// allow handling of json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// access files in public folder
app.use(express.static('public'));

/* ---------------------------- */
/* ----- handle api calls ----- */
/* ---------------------------- */

// delete an existing note from DB
app.delete('/api/notes/:id', (req,res) => {
  console.log('API REQUEST: Trying to delete note \#', req.param.id);
  res.end();
});
// show an existing note from DB
app.get('/api/notes/:id', (req,res) => {
  console.log('API REQUEST: Trying to show note \#', req.param.id);
  res.send('test');
});
// add new note to DB
app.post('/api/notes', (req,res) => {
  console.log('API REQUEST: Trying to save a new note', req.body);
  res.end();
});
// fetch existing DB
app.get('/api/notes', (req,res) => {
  console.log('API REQUEST: Trying to fetch existing notes data');
  const dbData = fs.readFileSync('./db/db.json', {encoding:'utf8'});
  res.send(dbData);
});

/* ---------------------------- */
/* --- handle html requests --- */
/* ---------------------------- */

// handle html page requests
app.get('/:page', (req, res) => {
  console.log('PAGE REQUEST: Trying to access page', req.params.page);
  if (req.params.page === 'notes') res.sendFile(__dirname + '/public/notes.html');
  else res.send(
  `<div style="text-align:center">
    <h1>404 ERROR</h1><p>Could not find page \"${req.params.page}\"</p>
  </div>`);
});

// open server
app.listen(PORT, () => {
  console.log('Opened server at localhost:8080');
});