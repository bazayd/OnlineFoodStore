import { useEffect, useState } from 'react'
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
        <h1>Login</h1>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          getAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
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
          <input type="submit" value="Login" />
          <br />
          <div id="newUserCont">
            <p><strong>New User? &#8594; </strong></p>
            <button type="button">Register</button> 
          </div>
        </form>
      </div>
    </>
  )

  
}

export default App
