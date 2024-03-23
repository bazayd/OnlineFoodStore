import { useEffect, useState } from 'react'
import logo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import testLogo from './assets/Tsrpj1ULCwemwDaJEHXcGh3rG9nOrs6P.png'
import './App.css'



function App() {

  const postNote = (notetitle, notecontents) => {
    // make post request to backend server with json body
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: notetitle , contents: notecontents})
    }
    fetch('/notes', requestOptions).then(
      response => response.json
    )
  }

  

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={testLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>OFS</h1>
      <div className="card">
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          postNote(e.target.title.value, e.target.contents.value); // Call postNote function with form values
        }}>
          <label>
            Note Title:
            <input type="text" name="title" />
          </label>
          <br></br>
          <label>
            Note Contents:
            <input type="text" name="contents" />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
          
        </form>
        
        <p>
          Test Sending Post Request to Backend Server & Database
        </p>
      </div>
    </>
  )

  
}

export default App
