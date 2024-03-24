import { useEffect, useState } from 'react'
import OFSLogo from '/assets/OFS Logo.png'
import './App.css'



function App() {

  const [showBackToLogin, setShowBackToLogin] = useState(false);

  const createAccount = (inputemail, inputusername, inputpassword, inputaddress, inputcity, inputstate, inputzipcode) => {

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inputemail, username: inputusername, password: inputpassword, address: inputaddress, city: inputcity, state: inputstate, zipcode: inputzipcode})
    }

    fetch('/users', requestOptions).then(
      response => {
        if (response.status==200){
          console.log("status code 200: "+response.status)
          setShowBackToLogin(true);
          return response.json()
        } else {
          console.log("status code not 200: "+response.status)
          setShowBackToLogin(false);
          return response.json()
        }
      }
    ).then(
      data => {

        // display the message returned by backend
        document.getElementById("registerBackendResponse").textContent = data.message
        
      }
    )
  }

  return ( 
    <>
      <div>
        <img src={OFSLogo} alt="OFS Logos" className="logo" id="OFSLogo"/>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          //(email, username, password, address, city, state, zipcode)
          createAccount(e.target.email.value, e.target.username.value, e.target.password.value, e.target.address.value, e.target.city.value, e.target.state.value, e.target.zipcode.value); // Call postNote function with form values
        }}>
          <div className='parentContainer'>
            <div className='childContainer1'>
              <input type="email" name="email" placeholder='Email' required/>
              <br></br>
              <input type="text" name="username" placeholder='Username' required/>
              <br />
              <input type="password" name="password" placeholder='Password' required/>
              <br />
              <input type="password" name="pass" placeholder='Confirm Password' required/>
              <br />
            </div>
            <div className='childContainer2'>
              <input type="text" name="address" placeholder='Address' required/>
              <br />
              <input type="text" name="city" placeholder='City' required/>
              <br></br>
              <input type="text" name="state" placeholder='State' required/>
              <br />
              <input type="text" name="zipcode" placeholder='Zip Code' required/>
              <br />
            </div>
          </div>
          <input id="registerBtn" type="submit" value="Register" /> 
        </form>
        <div id="registerBackendResponse"></div>
        
        { // In react you have to use this method to dynamically show objects
        showBackToLogin && (
        <div id="backToLogin">
          <br></br>
          <button type="button" onClick={() => window.location.href="/login/"}>Login</button>
        </div>
        ) }

      </div>
    </>
  )

  
}

export default App
