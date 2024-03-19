import { useEffect, useState } from 'react'
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
        <p>
          test seperate login page
        </p>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          createAccount(e.target.user.value, e.target.pass.value); // Call postNote function with form values
        }}>
          <label>
            Username:
            <input type="text" name="user" />
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" name="pass" />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )

  
}

export default App
