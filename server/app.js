import express from 'express'
import path from 'path';
import session from 'express-session';
import { getNotes, getNote, createNote, createUser, login } from './database.js'

// working directory
const dir = process.cwd();

const app = express()

// Set up session cookies
app.use(session({
    secret: 'blah blah blah',
    cookie: { maxAge: 10800000},
    resave: true,
    saveUninitialized: false
}))

app.use(express.json())

// Serve static files from the dist folder
app.use(express.static(path.join(dir, 'dist')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(dir, 'dist', 'index.html'));
});

// -------------------------------------- Misc Api Handlers -----------------------------------

// Return Username of Session Cookie
app.post("/users/getUser", async (req, res) => {
    if (req.session.authenticated) {
        const userData = req.session.user;
        res.status(200).send(userData);
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Account Api Handlers -----------------------------------

// User registration backend api handler
app.post("/users/register", async (req, res) => {
    const { email, username, password, password2, address, city, state, zipcode } = req.body    // sets details to parameters from post request body
    console.log(password + "  " + password2)

    if(password===password2){
        const { message, status } = await createUser(email, username, password, address, city, state, zipcode)  // uses our database function to create an sql entry
        
        res.status(status).type('text').send({ message })  // returns to our user what our database function returned to us. status 201 indicates item created
    } else {
        const doNotMatch = {
            message: "Passwords do not match!"
        }
        res.status(401).type('text').send(doNotMatch)
    }
})

// user login backend api handler
app.post("/users/login", async (req, res) => {
    const { username, password } = req.body    // sets details to parameters from post request body
    const { message, status, authed } = await login(username, password)  // uses our database function to create an sql entry
    
    // Give user session if login is valid
    if(authed){
        // Store the session in the backend
        req.session.authenticated = true;
        // Store the username tied to the session
        req.session.user = {
            username: username
        }
    } else {
        // If authentication is not successful des
        req.session.destroy(); // Destroy the current session
        res.clearCookie('session-id'); // Clear the session cookie
    }

    res.status(status).type('text').send({ message })  // returns to our user what our database function returned to us. status 201 indicates item created
})




// -------------------------------------- Notes app methods -----------------------------------

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