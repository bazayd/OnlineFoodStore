import React, { useState } from 'react';
import './App.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'

import Vegetable_Icon from '../assets/Vegetable Icon.png'
import Fruit_Icon from '../assets/Fruit Icon.png'
import Apple from '../assets/Apple.jpg'

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Define items here
  const categories = [
    {
      name: 'Fruits',
      items: [
        {
          name: 'Vegetables',
          image: Vegetable_Icon,
          description: 'These are the freshest vegetables ever.',
          price: '$9.99'
        },
        {
          name: 'Fruits',
          image: Fruit_Icon,
          description: 'This is a very sweet fruit.',
          price: '$8.99'
        }
      ]
    },
    {
      name: 'Vegetables',
      items: [
        {
          name: 'Vegetables',
          image: Vegetable_Icon,
          description: 'These are the freshest vegetables ever.',
          price: '$9.99'
        },
        {
          name: 'Fruits',
          image: Fruit_Icon,
          description: 'This is a very sweet fruit.',
          price: '$8.99'
        }
      ]
    }
  ];
  

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

  return (
    <div>
      {/*Top NavBar*/}
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

      {/*Category side scroll bars for items in each category*/}
      <div className='categorybar'>
        {categories.map((category) => (
          <div key={category.name}>
            <h1 className='categoryBarHeaders'>{category.name}</h1>
            <ul>
              {category.items.map((item) => (
                <li key={item.name}>
                  <div className='category-icon' onClick={() => {
                    setIsModalOpen(true);
                    setSelectedItem(item);
                    }}>
                    <a href='#'>
                      <img src={item.image} className='Category-Images'></img>
                      <span className='category-text'>{item.name}</span>
                      <span className='category-text'>{item.price}</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
          <button className="close-button" onClick={() => {
            setIsModalOpen(false);
            setQuantity(1); // Reset the counter
          }}>Close</button>
              <div className="modal-body">
                <img src={selectedItem.image} className="modal-image" />
                <div className="modal-details">
                  <h2>{selectedItem.name}</h2>
                  <span>{selectedItem.price}</span>
                  <p>{selectedItem.description}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="add-to-cart-button" onClick={() => {/* Add to cart logic */}}>Add to cart</button>
              </div>
            </div>
        </div>
      )}


      {/*Left side menu bar*/}
      <div className='menu'>
        <h1 className='menuText'>Categories</h1>
        <ul>
          <li>Fruits</li>
          <li>Vegetables</li>
          <li>Apples</li>
        </ul>
      </div>
      
      {/* Vertical scroll through items (Currently not used)
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
      */}
  </div>
  )
}


export default MainPage