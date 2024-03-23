import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()


export async function createUser(email, username, password, address, city, state, zipcode){ // prepared statement using input for query

    // use accounts database
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }).promise()

    const [result] = await pool.query(`
    INSERT INTO users (email, user, pass, addr, city, stte, zipc, usertype)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [email, username, password, address, city, state, zipcode, 1])
    // the rest of function just displays added user
    const id = result.insertId
    return getNote(id)
}

// ------------Notes app methods-----------

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'notes_app'
}).promise()

export async function getNotes() { // the const[rows] method just grabs the first item in returned array
    const [rows] = await pool.query("SELECT * FROM notes")  
    return rows
}

export async function getNote(id){ // prepared statement using input for query
    const [rows] = await pool.query(`
    SELECT *
    FROM notes
    WHERE id = ?
    `, [id])
    return rows[0] // always returns array, we just grab first item
}

export async function createNote(title, content){ // prepared statement using input for query
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, content])
    // the rest of function just displays added note
    const id = result.insertId
    return getNote(id)
}
// -------------------------------------------

