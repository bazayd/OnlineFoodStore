import { useEffect, useState } from 'react'
import OFSLogo from '../assets/OFS Logo.png'
import './App.css'



function App() {

  

  const getAccount = (inputusername, inputpassword) => {
    // create account request
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputusername , password: inputpassword})
    }
    fetch('/users/username', requestOptions).then(
      response => response.json,
    )
  }

  return (
    <>
      <div>
        <img src={OFSLogo} alt="OFS Logos" id="OFSLogo"/>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          getAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
        }}>
          <input type="text" name="user" placeholder='Username'/>
          <br></br>
            <input type="password" name="pass" placeholder='Password'/>
          <br></br>
          <input type="submit" value="Login" id="loginBtn"/>
          <br />
          <div id="newUserCont">
            <p><strong>New User? &#8594; </strong></p>
            <button type="button" onClick={() => window.location.href="/register/"}>Register</button>
          </div>
        </form>
      </div>
    </>
  )

  
}

export default App
