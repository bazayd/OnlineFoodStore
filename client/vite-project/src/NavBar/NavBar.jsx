import React, { useEffect, useState } from 'react';
import './NavBar.css';
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'
import Search_Icon from '../assets/WhiteSearchIcon.png'

const NavBar = () => {

    const [accountHref , accountHrefState] = useState("/login/")

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
            // Make account button link to the account page
            accountHrefState("/AccountPage/")
            // Resolve promise and return username
            return response.json().then(data => data.user);
            
  
          } else {
            // No session ;(
            // Make account button link to login page
            accountHrefState("/login/")
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

  return(
    <div>
      <nav className='navbar'>                                          
        <a href="/MainPage/">
          <img src={OFS_Logo} className='logo'/>
        </a>
        <div className='searchbox'>
          <img type="submit" src={Search_Icon} className='Search_Icon' />
          <form method="get">
            <input type="text" id="search" name="s" placeholder="Search" />
          </form>
        </div>
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
            <a id="accountButtonRedirect" href={accountHref} onLoad={loadAccount}>
                <img src={Profile_Icon} className='Profile_Icon'/>
                <span id="accountButton" className='text'>Account</span>
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
      </nav>
      <div className='spacer'></div>
    </div>
  );
};

export default NavBar;