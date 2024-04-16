import React, { useState } from 'react';
import './App.css'
import Navbar from '../NavBar/NavBar.jsx'
import Vegetable_Icon from '../assets/Vegetable Icon.png'
import Fruit_Icon from '../assets/Fruit Icon.png'
import Apple from '../assets/Apple.jpg'

const MainPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Define items here
  const categories = [
    {
      name: 'Vegetables',
      image: Vegetable_Icon,
      items: [
        {
          image: Apple,
          name: 'NotApple',
          description: 'This is not an apple',
          price: '$9.99',
          weight: 123
        }
      ]
    },
    {
      name: 'Fruits',
      image: Fruit_Icon,
      items: [
        {
          image: Apple,
          name: 'Apple',
          description: 'This is not an apple',
          price: '$1.99',
          weight: 12
        },
        {
          image: Apple,
          name: 'MoreApples',
          description: 'This is not an apple',
          price: '$2.99',
          weight: 1234
        }
      ]
    }
  ];
  
  return (
    <div>
      <Navbar></Navbar>
      <div className='categorybar'>
        <h1 className='categoryBarHeaders'>Categories</h1>
        <ul>
          {categories.map((category) => (
              <li key={category.name}>
                <div 
                  className={`category-icon ${selectedCategory === category ? 'selected' : 'unselected'}`} 
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedItems(category.items);
                  }}
                >
                  <a href='#'>
                    <img src={category.image} className='Category-Images'></img>
                    <span className='category-text'>{category.name}</span>
                  </a>
                </div>
              </li>
            )
          )}
        </ul>
      </div>

      {/*Left side menu bar*/}
      <div className='menu'>
        <h1 className='menuText'>Categories</h1>
        <ul>
          <li>Fruits</li>
          <li>Vegetables</li>
          <li>Apples</li>
        </ul>
      </div>
      
      {/* Vertical scroll through items */}
      <div className='categoryscroll'>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.name}>
              <div className='categoryscroll-sections'>
                <img src={item.image} className='categoryscroll-images'></img>
                <span className='categoryscroll-text'>Name: {item.name}</span>
                <span className='categoryscroll-text'>Description: {item.description}</span>
                <span className='categoryscroll-text'>Price: {item.price}</span>
                <span className='categoryscroll-text'>Weight: {item.weight}</span>

                <div className="quantity-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="add-to-cart-button" onClick={() => {/* Add to cart logic*/}}>Add to cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/*(UNUSED) Category side scroll bars for items in each category (was used for items not categories*/}
      <div>
        {/*
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
        
        POPUP for items (NOT USED)
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
                  <button className="add-to-cart-button" onClick={() => {// Add to cart logic}}>Add to cart</button>
               </div>
              </div>
            </div>
         )}
        */}
      </div>

    </div>
  )
}


export default MainPage