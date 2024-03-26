import React from 'react'
import './MainPage.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'

const MainPage = () => {
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
            <a href="#">
            <img src={Profile_Icon} className='Profile_Icon'/>
            <span className='text'>Account</span>
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