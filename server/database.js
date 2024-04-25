import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

// use accounts database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function addToCart(user, item, quantity){

    if(user!=null && item!=null && quantity!=null && quantity>0){
        console.log("User ID: "+user+" added "+quantity+" Item ID: "+item+"'s to their cart!")

        const [result] = await pool.query(`
        INSERT INTO cart ( user, id, quantity)
        VALUES (?, ?, ?)
        `, [user, item, quantity]);

        return result;
    }

}

export async function getCart(user){

    console.log("User ID: "+user+" is retrieving their cart!")

    // rows is every item with its int indentifier
    const [rows] = await pool.query(`
    SELECT * FROM cart WHERE user=?
    `, [user])

    // for every int item return its actual data and save that in the place of the previous int identifier
    for (let i=0; i <rows.length; i++) {
        const [item] = await pool.query(`
        SELECT * FROM inventory WHERE id=?
        `, [rows[i].id])

        const itemData = item[0]
        itemData["quantity"] = rows[i].quantity

        rows[i] = itemData
    }

    return rows

}

export async function getItems(category, search){

    if(category.length<2){
        //console.log("Searching only matching: "+search)
        try{
            const [rows] = await pool.query(`
            SELECT * FROM inventory WHERE name LIKE ?
            `, [`${search}%`])
            return rows
        }catch (error){
            console.log("Error retriving category: "+error)
        }
    } else {
        console.log("Searching matching: "+search+" and category: "+category)
        try{
            const [rows] = await pool.query(`
            SELECT * FROM inventory WHERE category=? AND name LIKE ?
            `, [category, `${search}%`])
            return rows
        }catch (error){
            console.log("Error retriving category: "+error)
        }
    }
}

export async function listCategory(){

    try{
        const [rows] = await pool.query(`
        SELECT * FROM category
        `)
        return rows
    }catch (error){
        console.log("Error retriving category: "+error)
    }
}

export async function getUserInformation(username){

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


