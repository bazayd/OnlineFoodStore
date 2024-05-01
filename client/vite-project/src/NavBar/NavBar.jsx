import React, { useEffect, useState } from 'react';
import './NavBar.css';
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'
import Search_Icon from '../assets/WhiteSearchIcon.png'
import CartRotateIcon from '../assets/CartRotateIcon.png'

const NavBar = ({totalItems}) => {

    console.log("Nav bar has: "+totalItems+" total items")

    const [accountHref , accountHrefState] = useState("/login/")
    const [cartPage , cartPageState] = useState("/login/")
    const [location , setLocation] = useState("Location")


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
            cartPageState("/Cart/")
            // Resolve promise and return username
            return response.json().then(data => data.user);
            
  
          } else {
            // No session ;(
            // Make account button link to login page
            accountHrefState("/login/")
            cartPageState("/login/")
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

      // Grab selected address

  const getSelectedAddress = async (catg, sear) => {

    // create request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ })
    }
    // Fetch selected address
    return fetch('/users/location/getSingle', requestOptions).then((response) => {
      if (response.status === 200) {
        // We got data
        return response.json();
      } else {
        console.log("Error retrieving data from backend server!")
        return null; // Return an empty object in case of error
      }
    }).then((data) => {
      console.log(data)
      if(data!=null){
        setLocation(data.street+", "+data.city+", "+data.stte+", "+data.zipc)
      }
    })

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
            <div className='icon-text-location'>
              <a href={accountHref} onLoad={getSelectedAddress}>
                <img src={Location_Icon} className='Location_Icon'/>
                <span className='text'>{location}</span>
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
              <a href={cartPage}>
                { // In react you have to use this method to dynamically show objects
                (totalItems>0) ? (
                  <span>
                    <div className = "head-text inCartImageAndText">
                      <div className = "head-image">
                        <img src={Cart_Icon} className='Cart_Icon'/>
                      </div>
                      <div className='inCart'>
                        {totalItems}
                      </div>
                    </div>
                  </span>
                ) : (
                  <img src={Cart_Icon} className='Cart_Icon'/>
                ) }
                <span className='text'>Cart</span>
              </a>
              {/* Create some type of counter that shows the number of items in the cart, use classname="Cart_Counter" for rotation */}
            </div>
          </li>
        </ul>
      </nav>
      <div className='spacer'></div>
    </div>
  );
};

export default NavBar;