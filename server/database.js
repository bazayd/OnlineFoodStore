import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()


export async function createUser(email, username, password, address, city, state, zipcode){ // prepared statement using input for query

    // use accounts database
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'accounts'
    }).promise()

    // we need to check if username already exists
    try {
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]!=null){
            console.log("Acount with username "+username+" already exists in database.")
            return("Account with that username already exists!")  
        }
        

    } catch(error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Checking for Username, "+error)

        return("We have encountered database error, sorry ;(")
    }

    // insert new user
    try {
        const [result] = await pool.query(`
        INSERT INTO users (email, user, pass, addr, city, stte, zipc, usertype)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [email, username, password, address, city, state, zipcode, 1])


        // the rest of function just displays added user
        const id = result.insertId

        console.log("User was created! Username: " + username +" Password: "+password)

        // tell user their account was generated
        return "Hello "+username+", your account has been created!"

    } catch (error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Adding To Database, "+error)

        // tell user that some database error happened
        return("We have encountered database error, sorry ;(")
    }
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

