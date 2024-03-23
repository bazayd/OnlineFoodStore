import { useEffect, useState } from 'react'
import OFSLogo from '/assets/OFS Logo.png'
import './App.css'



function App() {

  const createAccount = (inputusername, inputpassword) => {
    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputusername , password: inputpassword})
    }
    fetch('/users', requestOptions).then(
      response => response.json,
    )
  }

  return ( 
    <>
      <div>
        <img src={OFSLogo} alt="OFS Logos" id="OFSLogo"/>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          createAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
        }}>
          <div className='parentContainer'>
            <div className='childContainer1'>
              <input type="text" name="user" placeholder='Email'/>
              <br></br>
              <input type="text" name="user" placeholder='Username'/>
              <br />
              <input type="password" name="user" placeholder='Password'/>
              <br />
              <input type="password" name="pass" placeholder='Confirm Password'/>
              <br />
            </div>
            <div className='childContainer2'>
              <input type="text" name="pass" placeholder='Address'/>
              <br />
              <input type="text" name="user" placeholder='City'/>
              <br></br>
              <input type="text" name="user" placeholder='State'/>
              <br />
              <input type="text" name="user" placeholder='Zip Code'/>
              <br />
            </div>
          </div>
            <input id="registerBtn" type="submit" value="Register" /> 
        </form>
      </div>
    </>
  )

  
}

export default App
