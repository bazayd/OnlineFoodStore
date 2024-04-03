import React from 'react'
import { useState } from 'react'
import './App.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'
import Vegetable_Icon from '../assets/Vegetable Icon.png'
import Fruit_Icon from '../assets/Fruit Icon.png'
import Apple from '../assets/Apple.jpg'

const MainPage = () => {

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
          return response.json().then(data => data.username);
          

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

  return (
    <div>
      <div className='navbar'>                                          
        <a href="/MainPage/">
          <img src={OFS_Logo} className='logo'/>
        </a>
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
      <div className='categorybar'>
        <ul>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Vegetables</span>
                <img src={Vegetable_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
          <li>
            <div className='category-icon'>
              <a href='#'>
                <span className='category-text'>Fruits</span>
                <img src={Fruit_Icon} className='Category-Images'></img>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className='categoryscroll'>
        <ul>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
          <li>
            <div className='categoryscroll-sections'>
              <img src={Apple} className='categoryscroll-images'></img>
              <span className='categoryscroll-text'>Apple</span>
            </div>
          </li>
        </ul>
      </div>
  </div>
  )
}


export default MainPage