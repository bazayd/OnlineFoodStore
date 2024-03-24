import express from 'express'
import path from 'path';
import { getNotes, getNote, createNote, createUser } from './database.js'

// working directory
const dir = process.cwd();

const app = express()

app.use(express.json())

// Serve static files from the dist folder
app.use(express.static(path.join(dir, 'dist')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(dir, 'dist', 'index.html'));
});


// create a database entry from a post request to /notes
app.post("/users", async (req, res) => {
    const { email, username, password, address, city, state, zipcode } = req.body    // sets details to parameters from post request body
    const resp = await createUser(email, username, password, address, city, state, zipcode)  // uses our database function to create an sql entry
    
    res.status(201).type('text').send({ resp })  // returns to our user what our database function returned to us. status 201 indicates item created
})




// --------------------------------------Notes app methods -----------------------------------

// use database.js file
app.get("/notes",  async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

// use database.js file to return a user defined note in directory
app.get("/notes/:id",  async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})



// create a database entry from a post request to /notes
app.post("/notes", async (req, res) => {
    const { title, contents } = req.body    // sets title and contents to parameters from post request body
    const note = await createNote(title, contents)  // uses our database function to create an sql entry
    
    console.log("Note was posted! Title: " + title +" Contents: "+contents)
    
    res.status(201).send(note)  // returns to our user what our database function returned to us. status 201 indicates item created
})



// -------------------------------------- -----------------------------------

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// server start
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})