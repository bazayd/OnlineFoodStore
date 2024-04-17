import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar.jsx'
import './App.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'

const assetPath = '../assets/'
const loadImage = (name) => {
  return assetPath+name+'.png'
}

const MainPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect (() => {
    // Grab Inventory From Database
    const fetchCategory = async (catg) => {
      
      // create request
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: catg })
      }

      // Fetch Fruit
      return fetch('/inventory/getCategory', requestOptions).then((response) => {
        if (response.status === 200) {
          // We got data
          return response.json();
        } else {
          console.log("Error retrieving data from backend server!")
          return []; // Return an empty object in case of error
        }
      }).then((data) => {
        return data
      })
          
    }

    // Function to fetch all categories
    const fetchAllCategories = async () => {

      // get url parameters

      try {
        // (fruit 1, vegetable 2, dairy 3, protein 4, canned 5, beverages 6, deserts 7)
        const fruits = await fetchCategory(1);
        const vegetables = await fetchCategory(2);
        const dairy = await fetchCategory(3);
        const protein = await fetchCategory(4);
        const canned = await fetchCategory(5);
        const beverages = await fetchCategory(6);
        const deserts = await fetchCategory(7);

        // Update the categories state with the fetched data
        setCategories([
          { name: 'Fruits', items: fruits },
          { name: 'Vegtables', items: vegetables },
          { name: 'Dairy', items: dairy },
          { name: 'Protein', items: protein },
          { name: 'Canned', items: canned },
          { name: 'Beverages', items: beverages },
          { name: 'Deserts', items: deserts },
          
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the function to fetch all categories when the component mounts
    fetchAllCategories()
  }, [])

  


 

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
                <img src={loadImage(item.image)} className='categoryscroll-images'></img>
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
  </div>
  )
}


export default MainPage