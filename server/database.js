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

export async function getAllOrders( userId ) {
    try {
        // grab all orders items from orderItems table
        const [itemOrders] = await pool.query(`
        SELECT orderNum, street, city, state, zip, totalPrice, totalCount, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date  FROM orders 
        WHERE user=?
        `, [userId]);

        console.log(itemOrders)
        return { status: 200, message: itemOrders}

    } catch (error) {
        console.log("Error retrieving user: "+userId+"'s order. Error: "+error)
        return { status: 500, message: []}

    }
} 

export async function handleOrder( userId, card, name, experation, cvc ){

    try{
        // Find the next largest orderNum

        const [findOrderNum] = await pool.query(`
        SELECT MAX(orderNum) AS greatest_number
        FROM orders;
        `);
        let prevOrderNum = findOrderNum[0].greatest_number
        let currentOrderNum = 1
        if(prevOrderNum!=null){
            currentOrderNum = prevOrderNum+1;
        }

        // Get selected location
        
        const [locationSelected] = await pool.query(`
        SELECT selectedAddress FROM users WHERE id=?
        `, [userId]);
        let locationNum = locationSelected[0].selectedAddress

        const [locationInfoArray] = await pool.query(`
        SELECT * FROM locations WHERE usersID=? AND id=?
        `, [userId , locationNum]);

        let locationInfo = locationInfoArray[0]

        let street = locationInfo.street
        let city = locationInfo.city
        let state = locationInfo.stte
        let zip = locationInfo.zipc

        // Find totalPrice
        const [cart] = await pool.query(`
        SELECT * FROM cart
        WHERE user = ?
        `, [userId])
        let totalPrice = 0.00;
        let totalCount = 0;
        let totalWeight = 0;
        for(let i = 0 ; i <cart.length ; i++){
            const [item] = await pool.query(`
            SELECT * FROM inventory
            WHERE id = ?
            `, [cart[i].id])
            totalPrice = totalPrice+((item[0].price)*(cart[i].quantity))
            totalCount = totalCount+(cart[i].quantity)
            totalWeight = totalWeight+((item[0].weight)*(cart[i].quantity))
        }

        // If no items selected dont complete order
        if (totalCount<1){
            return {status: 500, message: "You Must Have An Item In Your Cart To Complete An Order!"} 
        }

        if (totalWeight>9071){  // assignment says that if the item is less than 20 pounds (9071 grams) dont have to pay 5 dollar shipping
            totalPrice=totalPrice+5.00;
        }

        console.log("Creating Order: User: "+userId+" currentOrderNumber: "+currentOrderNum+" card: "+card+" name: "+name+" experation: "+experation+" cvc: "+cvc+" street: "+street+" city: "+city+" state: "+state+" zip: "+zip )

        // ADD to orders with currentOrderNum and 
        const [insertOrder] = await pool.query(`
        INSERT INTO orders ( orderNum, user, totalPrice, totalCount, card, name, experation, cvc, street, city, state, zip)
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        `, [ currentOrderNum, userId, totalPrice, totalCount, card, name, experation, cvc, street, city, state, zip ]);

        // ADD cart to orderItems
        const [insertItems] = await pool.query(`
        INSERT INTO orderItems ( orderNum, user, id, quantity)
        SELECT ?, user, id, quantity
        FROM cart
        WHERE user=?
        `, [ currentOrderNum, userId])

        // Delete current Cart
        const [deleteCart] = await pool.query(`
        DELETE FROM Cart WHERE user=?
        `, [ userId])

        console.log(totalWeight)
        if (totalWeight>9071){
            return {status: 200, message: "Successfully Completed Your Order!"} 
        } else {
            return {status: 200, message: "Successfully Completed Your Order! No Shipping Fee! Order Is Under 9071 Grams."} 
        }
        

    } catch (error) {
        console.log("Error processing order: "+error)
        return {status: 500, message: "Sorry we encountered a backend error ;("} 
    }

}

export async function removeFromCart(user, item){
    try {
        if(user!=null && item!=null){
            console.log("User ID: "+user+" removed Item ID: "+item+" from their cart!")

            const [result] = await pool.query(`
            REMOVE FROM cart
            WHERE user = ?, id = ?
            VALUES (?, ?)
            `, [user, item]);

            return {status: 200, message: "Successfully removed item from cart"};
        }
    } catch (error) {
        return {status: 500, message: "Sorry we encountered a backend error ;("};
    }
}


export async function getAddress(userId) {

    try {

        const [idArray] = await pool.query(`
        SELECT selectedAddress
        FROM users WHERE id = ?
        `, [userId])

        let id = idArray[0].selectedAddress

        const [rows] = await pool.query(`
        SELECT id, street, city, stte, zipc 
        FROM locations WHERE usersID = ? AND id = ?
        `, [userId, id])

        return rows[0]

    } catch (error){
        console.log("Error getting user's selected address. Error: "+error)
        return "Sorry we encounted a backend error ;("
    }

}

export async function getAllAddress(userId) {

    try {

        const [rows] = await pool.query(`
        SELECT id, street, city, stte, zipc 
        FROM locations WHERE usersID = ?
        `, [userId])

        return rows

    } catch (error){
        console.log("Error getting user's selected address. Error: "+error)
        return "Sorry we encounted a backend error ;("
    }

}

export async function addToCart(user, item, quantity){

    if(user!=null && item!=null && quantity!=null && quantity>0){
        console.log("User ID: "+user+" added "+quantity+" Item ID: "+item+"'s to their cart!")

        const [result] = await pool.query(`
        INSERT INTO cart ( user, id, quantity)
        VALUES (?, ?, ?)
        `, [user, item, quantity]);

        return[result];
    }

}

export async function updateAddress(buttonNumber, street, city, state, zip, usersID){

    try {
        console.log("User: "+usersID+" Updated Address "+buttonNumber+" the new street is: "+street)

        const [result] = await pool.query(`
        UPDATE locations 
        SET street = ?, city = ?, stte = ?, zipc = ?
        WHERE usersID = ? AND id = ?
        `, [street, city, state, zip, usersID, buttonNumber]);

        return result;
    } catch(error) {
        console.log("Error updating user address! Error: "+error)
    }

}

export async function updateSelected(buttonNumber, usersID){

    try {
        console.log("User: "+usersID+" Updated Selected Address To: "+buttonNumber)

        const [result] = await pool.query(`
        UPDATE users
        SET selectedAddress = ?
        WHERE id = ?
        `, [buttonNumber, usersID]);

        return "Successfuly updated selected Address";
    } catch(error) {
        console.log("Error updating user address! Error: "+error)
    }

}

export async function getCart(user){

    try {
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
    } catch(error) {
        console.log("Error getting user's cart: "+error)
        return "Error getting cart"
    }

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
        try {

            const [result] = await pool.query(`
            INSERT INTO users (email, user, pass, usertype, selectedAddress)
            VALUES (?, ?, ?, ?, ?)
            `, [email, username, password, 1, 1])

            console.log("User was created! Username: " + username +" Password: "+password)

        } catch (error) {
            // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
            console.log("Error Adding To Database, "+error)
    
            // tell user that some database error happened
            return{error: 500, message: "Encountered database error, sorry ;("}

        }

        const [userIdArray] = await pool.query(`
        SELECT id FROM users
        WHERE user=?
        `, [username])

        let userId = userIdArray[0].id

        console.log("creating locations for userid="+userId)

        // create 1 address with register information and create 2 with dummy data

        const [add1] = await pool.query(`
        INSERT INTO locations (usersID, id, street, city, stte, zipc)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, 1, address, city, state, zipcode])
        const [add2] = await pool.query(`
        INSERT INTO locations (usersID, id, street, city, stte, zipc)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, 2, "Street 2", "City 2", "State 2", "Zip 2"])
        const [add3] = await pool.query(`
        INSERT INTO locations (usersID, id, street, city, stte, zipc)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, 3, "Street 3", "City 3", "State 3", "Zip 3"])



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


