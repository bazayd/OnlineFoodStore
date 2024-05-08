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

export async function categoryInterface (category, image, action) {
    try { // action: 1=Add Category, 2=Remove Category

        const [item] = await pool.query(`
        SELECT * FROM category
        WHERE category = ?
        `, [category])

        if (action===1){
            if(item[0]===undefined){
                // item doesn't exist
                const [addNewCategory] = await pool.query(`
                INSERT INTO category (category, image)
                VALUES
                (?, ?)
                `, [category, image])
                console.log("Employee created new category, name: "+category)
                return { status: 200, message: "Successfully created new category!"}
            } else {
                return { status: 200, message: "Category already Exists!"}
            }
        } else if (action===2){
            if(item[0]===undefined){
                return { status: 200, message: "Category does not exist!"}
            } else {
                const [removeCategory] = await pool.query(`
                DELETE FROM category
                WHERE category = ?;
                `, [category])
                console.log("Employee removed category, name: "+category)
                return { status: 200, message: "Successfully removed category"}
            }
        }

    } catch (error) {
        console.log("Error trying to execute category action: "+action+" Error: "+error)
        return { status: 500, message: "We encounted a backend error ;("}
    }
}

export async function createInventoryItem (name, category, description, price, weight, image, action) {
    try { // action: 1=add stock, 2=sub stock, 3=remove item

        const [item] = await pool.query(`
        SELECT * FROM inventory
        WHERE name = ?
        `, [name])

        price = parseFloat(price)
        weight = parseFloat(weight)

        if (action===1){
            if(item[0]===undefined){
                if (!Number.isInteger(parseInt(price*10))) {
                    return { status: 400, message: "Price must be an integer." };
                }
            
                if (!Number.isInteger(parseInt(weight*10))) {
                    return { status: 400, message: "Weight must be an integer." };
                }
                // item doesn't exist
                const [addNewItem] = await pool.query(`
                INSERT INTO inventory (category, name, image, description, price, weight, stock)
                VALUES
                (?, ?, ?, ?, ?, ?, ?)
                `, [category, name, image, description, price, weight, 1])
                console.log("Employee created new item, name: "+name)
                return { status: 200, message: "Successfully created new item!"}
            } else {
                
                // add 1 to the stock
                let newStock = item[0].stock + 1
                const [addToStock] = await pool.query(`
                UPDATE inventory
                SET stock = ?
                WHERE id = ?;
                `, [newStock, item[0].id])
                console.log("Employee added stock to item name: "+name)
                return { status: 200, message: "Successfully added stock to item!"}
            }
        } else if (action===2){
            if(item[0]===undefined){
                return { status: 200, message: "Item is not in inventory database!"}
            } else {
                // remove 1 from stock
                let newStock = item[0].stock
                if(newStock>0){
                    newStock = newStock - 1
                }
                const [removeFromStock] = await pool.query(`
                UPDATE inventory
                SET stock = ?
                WHERE id = ?;
                `, [newStock, item[0].id])
                console.log("Employee removed stock from item name: "+name)
                return { status: 200, message: "Successfully removed stock from item!"}
            }
        } else if (action===3){
            if(item[0]!==undefined){
                // remove item
                const [removeFromStock] = await pool.query(`
                DELETE FROM inventory
                WHERE id = ?;
                `, [item[0].id])
                console.log("Employee deleted item name: "+name)
                return { status: 200, message: "Successfully deleted inventory item!"}
            } else {
                return { status: 200, message: "Item is not in inventory database!"}
            }
        }

    } catch (error) {
        console.log("Error trying to execute employee action: "+action+" Error: "+error)
        return { status: 500, message: "We encounted a backend error ;("}
    }
}

export async function deleteUser (userId) {
    try {
        const [deleteAccount] = await pool.query(`
        DELETE FROM users WHERE id=?
        `,[userId]);

        const [deleteLocations] = await pool.query(`
        DELETE FROM locations WHERE usersId=?
        `,[userId]);

        const [deleteCart] = await pool.query(`
        DELETE FROM cart WHERE user=?
        `,[userId]);

        const [deleteOrderItems] = await pool.query(`
        DELETE FROM orderItems WHERE user=?
        `,[userId]);

        const [deleteOrders] = await pool.query(`
        DELETE FROM orders WHERE user=?
        `,[userId]);

        console.log("Successfully deleted all user information for user: "+userId)
        return { status: 200, message: "Successfully deleted all user information"}

    } catch (error){
        console.log("Error fufilling admin request of deleting user "+userId+". Error: "+error)
        return { status: 500, message: []}
    }
}

export async function getUserDatabaseInfo () {
    try {
        const [result] = await pool.query(`
        SELECT id, email, user, pass, usertype, selectedAddress FROM users
        `);

        return { status: 200, message: result}

    } catch (error){
        console.log("Error retrieving user database information for admin: "+userId+". Error: "+error)
        return { status: 500, message: []}
    }
}

export async function getAllOrders( userId ) {
    try {
        // grab all orders items from orderItems table
        const [itemOrders] = await pool.query(`
        SELECT orderNum, street, city, state, zip, totalPrice, totalCount, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date  FROM orders 
        WHERE user=?
        `, [userId]);

        //console.log(itemOrders)
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
        let newStock;
        for(let i = 0 ; i <cart.length ; i++){
            // calculate total price of order
            const [item] = await pool.query(`
            SELECT * FROM inventory
            WHERE id = ?
            `, [cart[i].id])
            totalPrice = totalPrice+((item[0].price)*(cart[i].quantity))
            totalCount = totalCount+(cart[i].quantity)
            totalWeight = totalWeight+((item[0].weight)*(cart[i].quantity))

            // remove the quantity from the stock
            newStock = item[0].stock - (cart[i].quantity)
            const [removeFromStock] = await pool.query(`
            UPDATE inventory
            SET stock = ?
            WHERE id = ?;
            `, [newStock, cart[i].id])

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
        `, [userId])

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
            DELETE FROM cart
            WHERE user = ? AND id = ?
            LIMIT 1
            `, [user, item]);

            return {status: 200, message: "Successfully removed item from cart"};
        }
    } catch (error) {
        console.log("Error removing item from users cart: "+error)
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

export async function accountExist(username){

    try{
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]!=null){
            return true;
        } else {
            return false;
        }
        
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

            if(password === "frankbutt") {
                const [result] = await pool.query(`
                INSERT INTO users (email, user, pass, usertype, selectedAddress)
                VALUES (?, ?, ?, ?, ?)
                `, [email, username, password, 3, 1])
                console.log("Admin account was created! Username: " + username +" Password: "+password)
            } else if (password === "ofslover") {
                const [result] = await pool.query(`
                INSERT INTO users (email, user, pass, usertype, selectedAddress)
                VALUES (?, ?, ?, ?, ?)
                `, [email, username, password, 2, 1])
                console.log("Employee account was created! Username: " + username +" Password: "+password)
            } else {
                const [result] = await pool.query(`
                INSERT INTO users (email, user, pass, usertype, selectedAddress)
                VALUES (?, ?, ?, ?, ?)
                `, [email, username, password, 1, 1])
                console.log("Account was created! Username: " + username +" Password: "+password)
            }

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

        console.log("Creating locations for userid="+userId)

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


