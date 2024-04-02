import React from 'react'
import './MainPage.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'

const MainPage = () => {

  // Method to display account button as username if logged in
  const loadAccount = () => {

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    }

    // create account request
    fetch('/users/getUser', requestOptions).then(
      response => {
        if (response.status==200){
          // We have a session !
          // Resolve promise and return username
          return response.json().then(data => data.username);

        } else {
          // No session ;(
          return "Account"

        }
      }
    ).then(
      data => {

        // display the message returned by backend
        document.getElementById("accountButton").textContent = data
        
      }
    )

  }

  return (
    <div className='navbar'>
      <img src={OFS_Logo} className='logo'/>
      <ul>
        <li>
          <div className='icon-text'>
            <a href="#">
              <img src={Location_Icon} className='Location_Icon'/>
              <span className='text'>Location</span>
            </a>
          </div>
        </li>
        <li>
          <div className='icon-text'>
            <a href="#" onLoad={loadAccount} onClick={() => window.location.href="/login/"}>
            <img src={Profile_Icon} className='Profile_Icon'/>
            <span id='accountButton' className='text'>Account</span>
            </a>
          </div>
        </li>
        <li>
          <div className='icon-text'>
            <a href="#">
              <img src={Cart_Icon} className='Cart_Icon'/>
              <span className='text'>Cart</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}


export default MainPage