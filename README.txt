Server Folder holds Node.js server running with Express.js.  Connects to MySQL database that currently functions to store Notes in database notes_app in table notes.  Node.js server has API to return the notes in the table, add new notes, and get note with ID. This database will be changed later to hold the information for our food delivery site.

Client folder holds a Vite React invironment in Javascript.  This connects to the backend Node.js server via a proxy on the local host as of 3/5/25 on port 8080 (no idea how we make this work in production).
