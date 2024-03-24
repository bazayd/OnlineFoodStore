import { useEffect, useState } from 'react'
import OFSLogo from '/assets/OFS Logo.png'
import './App.css'



function App() {

  const createAccount = (inputemail, inputusername, inputpassword, inputaddress, inputcity, inputstate, inputzipcode) => {
    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inputemail, username: inputusername, password: inputpassword, address: inputaddress, city: inputcity, state: inputstate, zipcode: inputzipcode})
    }
    fetch('/users', requestOptions).then(
      response => response.json()
    ).then(
      data => { console.log(data)
        document.getElementById("registerBackendResponse").textContent = data.resp
      }
    )
  }

  return ( 
    <>
      <div>
        <img src={OFSLogo} alt="OFS Logos" id="OFSLogo"/>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          //(email, username, password, address, city, state, zipcode)
          createAccount(e.target.email.value, e.target.username.value, e.target.password.value, e.target.address.value, e.target.city.value, e.target.state.value, e.target.zipcode.value); // Call postNote function with form values
        }}>
          <div className='parentContainer'>
            <div className='childContainer1'>
              <input type="email" name="email" placeholder='Email'/>
              <br></br>
              <input type="text" name="username" placeholder='Username'/>
              <br />
              <input type="password" name="password" placeholder='Password'/>
              <br />
              <input type="password" name="pass" placeholder='Confirm Password'/>
              <br />
            </div>
            <div className='childContainer2'>
              <input type="text" name="address" placeholder='Address'/>
              <br />
              <input type="text" name="city" placeholder='City'/>
              <br></br>
              <input type="text" name="state" placeholder='State'/>
              <br />
              <input type="text" name="zipcode" placeholder='Zip Code'/>
              <br />
            </div>
          </div>
          <input id="registerBtn" type="submit" value="Register" /> 
        </form>
        <div id="registerBackendResponse"></div>
      </div>
    </>
  )

  
}

export default App
