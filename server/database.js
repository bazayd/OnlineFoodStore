import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

export async function getUserInformation(username){
    // use accounts database
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'accounts'
    }).promise()

    console.log("User retrieving information for username: "+username)

    try{
        const [rows] = await pool.query(`
        SELECT * FROM users WHERE user=?
        `, [username])
        return rows[0] // always returns array, we just grab first item
    } catch (error){
        console.log("Error finding user data: "+error)
    }

}

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
            
            return{status: 401, message: "Account with that username already exists!"} 
        }

    } catch(error) {
        // some error occured checking for username in database
        console.log("Error Checking for Username, "+error)

        return{error: 500, message: "Encountered database error, sorry ;("}
    }



    // Username avaible! Enter user into database
    try {
        const [result] = await pool.query(`
        INSERT INTO users (email, user, pass, addr, city, stte, zipc, usertype)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [email, username, password, address, city, state, zipcode, 1])

        console.log("User was created! Username: " + username +" Password: "+password)

        // tell user their account was generated
        return {status: 200, message: "Hello "+username+", your account has been created!"}

    } catch (error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Adding To Database, "+error)

        // tell user that some database error happened
        return{error: 500, message: "Encountered database error, sorry ;("}
    }
}


export async function login(username, password, authed) {

    // use accounts database
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'accounts'
    }).promise()

    // check if username exists
    try {
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]==null){
            console.log("Acount with username "+username+" does not exist in database.")
            
            return{status: 401, message: "Username or password is incorrect", authed: false} 
        }

    } catch(error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Checking for Username, "+error)

        return{error: 500, message: "Encountered database error, sorry ;(", authed: false}
    }

    // Username in database, attempt login
    try {
        const [tryLogin] = await pool.query(`
        SELECT id FROM users WHERE user=(?) AND pass=(?)
        `, [username, password])

        console.log("User logging in with Username: "+username+" Password: "+password)

        // check if user and password was found
        if(tryLogin[0]==null){
            console.log("Acount with Username: "+username+" and Password: "+password+" does not exist in database")
            
            return{status: 401, message: "Username or password is incorrect", authed: false} 
        } else {
            // LOGIN SUCCESS  <--------------------------------------------------------------------------------------------------------------- provide user some form of login session
            return {status: 200, message: "Hello "+username+", you have been successfully logged in!", authed: true}
        }

    } catch (error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error checking credentials on database, "+error)

        // tell user that some database error happened
        return{error: 500, message: 'Encountered database error, sorry ;(', authed: false}
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

