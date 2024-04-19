import { useEffect, useState } from 'react'
import OFSLogo from '../assets/OFS Logo.png'
import './App.css'



function App() {

  const getAccount = (inputusername, inputpassword) => {

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputusername, password: inputpassword})
    }

    // create account request
    fetch('/users/login', requestOptions).then(
      response => {
        if (response.status==200){
          
          return response.json()

        } else {

          return response.json()

        }
      }
    ).then(
      data => {

        // display the message returned by backend
        document.getElementById("loginBackendResponse").textContent = data.message
        
      }
    )
  }

  return (
    <>
      <div className="body">
        <a href="/MainPage/">
          <img src={OFSLogo} alt="OFS Logos" id="OFSLogo"/>
        </a>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          getAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
        }}>
          <input type="text" name="user" placeholder='Username' required/>
          <br></br>
            <input type="password" name="pass" placeholder='Password' required/>
          <br></br>
          <input type="submit" value="Login" id="loginBtn"/>
          <br />

          <div id="loginBackendResponse"></div>

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
