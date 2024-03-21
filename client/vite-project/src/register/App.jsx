import { useEffect, useState } from 'react'
import testLogo from '/assets/OFSLogo.png'
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
        <h3>Register</h3>
        <img src={testLogo}></img>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          createAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
        }}>
          <label>
            Username: <br />
            <input type="text" name="user" />
          </label>
          <br></br>
          <label>
            Password: <br />
            <input type="text" name="pass" />
          </label>
          <br></br>
          <input id="registerBtn" type="submit" value="Register" /> 
        </form>
      </div>
    </>
  )

  
}

export default App
