import express from 'express'
import path from 'path';
import session from 'express-session';
import { createUser, login, getUserInformation, getItems, listCategory, getCart, addToCart, handleOrder, removeFromCart, updateAddress, getAddress, getAllAddress, updateSelected, getAllOrders, accountExist, getUserDatabaseInfo, deleteUser, createInventoryItem, categoryInterface } from './database.js'

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


// -------------------------------------- Admin Requests -----------------------------------

app.post("/inventory/categoryInterface", async (req, res) => {
    if (req.session.authenticated) {
        try {
            const { name, image, action } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 2){
                //console.log("Employee: "+selectInfo.user+" is adding item: "+name)

                const { status, message } = await categoryInterface (name, image, action)

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/inventory/stockInterface", async (req, res) => {
    if (req.session.authenticated) {

        try {
            const { name, category, description, price, weight, image, action } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 2){
                //console.log("Employee: "+selectInfo.user+" is adding item: "+name)

                const { status, message } = await createInventoryItem( name, category, description, price, weight, image, action )

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/deleteUser", async (req, res) =>{
    if (req.session.authenticated) {

        try {
            const { id } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 3){
                console.log("Admin: "+selectInfo.user+" is deleting user with id="+id)

                const { status, message } = await deleteUser( id )

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/adminInfo", async (req, res) =>{
    if (req.session.authenticated) {

        try {
            const {  } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 3){
                console.log("Admin: "+selectInfo.user+" is requesting user information")

                const { status, message } = await getUserDatabaseInfo(  )

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Orders Api Handlers -----------------------------------

app.post("/users/orders", async (req, res) =>{
    if (req.session.authenticated) {
        try {
            const { card, name, experation, cvc } = req.body    // sets details to parameters from post request body

            if(card.length>10, name.length>1, experation.length>1, cvc.length>1) {
                const userData = req.session.user;
                const userName = userData.username;

                const userExists = await accountExist(userName)
                if(!userExists){
                    req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                    return null;
                }
                const fullInfo = await getUserInformation(userName)
                
                const selectInfo = {
                    user: fullInfo.user,
                    id: fullInfo.id
                }
                
                console.log("User "+selectInfo.user+" is processing an order!")

                const { status, message } = await handleOrder( selectInfo.id, card, name, experation, cvc )

                res.status(status).send(message )
            } else {
                res.status(500).send("Please Enter Correct Card Details!");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/orders/getAll", async (req, res) =>{
    if (req.session.authenticated) {
        try {
            const {  } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            console.log("User "+selectInfo.user+" retrieving thier order history!")

            const { status, message } = await getAllOrders( selectInfo.id )

            res.status(status).send(message)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Location Api Handlers -----------------------------------

app.post("/users/location/setSelected", async (req, res) => {
    
    if (req.session.authenticated) {
        try{
            const { buttonNumber } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await updateSelected(buttonNumber, selectInfo.id)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/location/set", async (req, res) => {

    if (req.session.authenticated) {
        try {
            const { buttonNumber, street, city, state, zip } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await updateAddress(buttonNumber, street, city, state, zip, selectInfo.id)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/location/getSingle", async (req, res) => {

    if (req.session.authenticated) {
        try {
            const { } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await getAddress(selectInfo.id)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/location/getAll", async (req, res) => {

    if (req.session.authenticated) {
        try{
            const { } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await getAllAddress(selectInfo.id)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Cart Api Handlers -----------------------------------

app.post("/users/removeFromCart", async (req, res) => {

    if (req.session.authenticated) {
        try{
            const { item } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await removeFromCart(selectInfo.id, item )

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/addToCart", async (req, res) => {

    if (req.session.authenticated) {
        try {
            const { item, quantity } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const response = await addToCart(selectInfo.id, item, quantity)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/getCart", async (req, res) => {
    if (req.session.authenticated) {
        try{
            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id
            }
            
            const cartItems = await getCart(selectInfo.id)

            res.status(200).send(cartItems)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Inventory Info Retrival Api Handlers -----------------------------------

app.post("/inventory/getItems", async (req, res) => {
    
    const { category, search } = req.body    // sets details to parameters from post request body

    const fullInfo = await getItems(category, search)
    
    // catg, label, imag, descr, price, weit, stock
    res.status(200).send(fullInfo)
        
})

app.post("/inventory/listCategory", async (req, res) => {

    const fullInfo = await listCategory()
    
    // catg, label, imag, descr, price, weit, stock
    res.status(200).send(fullInfo)
        
})

// -------------------------------------- User Info Retrival Api Handlers -----------------------------------

// Return Username of Session Cookie
app.post("/users/getUser", async (req, res) => {
    if (req.session.authenticated) {
        try{
            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user
            }
            res.status(200).send(selectInfo)
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/getUserInfo", async (req, res) => {
    if (req.session.authenticated) {
        try {
            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                email: fullInfo.email,
                user: fullInfo.user,
                usertype: fullInfo.usertype
            }
            res.status(200).send(selectInfo)
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Account Creation Api Handlers -----------------------------------

// User registration backend api handler
app.post("/users/register", async (req, res) => {
    const { email, username, password, password2, address, city, state, zipcode } = req.body    // sets details to parameters from post request body

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
        try{
            req.session.user = {
                username: username
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        // If authentication is not successful des
        req.session.destroy(); // Destroy the current session
        res.clearCookie('session-id'); // Clear the session cookie
    }

    res.status(status).type('text').send({ message })  // returns to our user what our database function returned to us. status 201 indicates item created
})

app.post("/users/signout", async (req, res) => {
    if(req.session.authenticated){
        try {
            // If authentication is successful 
            req.session.destroy(); // Destroy the current session
            res.clearCookie('session-id'); // Clear the session cookie
            res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).type('text').send("You are not logged in!");  // returns to our user what our database function returned to us. status 201 indicates item created
    }

})


// -------------------------------------- Configure and Start -----------------------------------

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// server start
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})