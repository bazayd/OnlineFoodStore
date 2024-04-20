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
  
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  //sort stuff
  // use selectedItems and method setSelectedItems to sort by that
  const handleSort = (type) => {

    let toSort = [...selectedItems]

    //sort this selection sort
    if (type === 1) {
      // Sort by price
      toSort.sort((foodItem1,foodItem2)=>{
        return foodItem1.price - foodItem2.price; //swap to go descending
      })
    } else if (type === 2) {
      //sort by weight
      toSort.sort((foodItem1,foodItem2)=>{
        return foodItem1.weight - foodItem2.weight; //swap to go descending
      })
    } else if (type === 3) {
      //sort A-Z
      toSort.sort((foodItem1,foodItem2)=>{
        return foodItem1.name.localeCompare(foodItem2.name); //swap to go descending
      })
    } else if (type === 4) {
      //sort Z-A
      toSort.sort((foodItem1,foodItem2)=>{
        return foodItem2.name.localeCompare(foodItem1.name); //swap to go descending
      })
    } 

    // Change the current selected Items
    setSelectedItems(toSort);
    
  };

  useEffect (() => {

    // Grab Inventory From Database
    const fetchItems = async (catg, sear) => {
      
      // create request
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: catg, search: sear })
      }

      // Fetch Fruit
      return fetch('/inventory/getItems', requestOptions).then((response) => {
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

    const fetchCurrentItems = async () => {
      // get url parameters if they exist
      let params = new URLSearchParams(document.location.search);
      let catg = ""
      let sear = ""
      if(params.get("c")!=null) {
        catg = params.get("c")
      }
      if(params.get("s")!=null) {
        sear = params.get("s")
      }

      const currentItems = await fetchItems(catg, sear)
      //console.log(currentItems)
      
      setSelectedItems(currentItems)
      
    }


    const listCategory = async () => {
      // create request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      }

      // Fetch Fruit
      return fetch('/inventory/listCategory', requestOptions).then((response) => {
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

      // get all categories
      try {
        const databaseCategories = await listCategory();
        //console.log(databaseCategories)

        const categoryArray = []

        for (let i = 0; i < databaseCategories.length; i++) {

          categoryArray.push({ name: databaseCategories[i].category, image: databaseCategories[i].image})
          
        }
        
        setCategories(
          categoryArray
        )

      } catch (error) {
        console.error("Error listing categories: ", error)
      }
    };
    

    fetchCurrentItems()
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
                    //setSelectedCategory(category);
                  }}
                >
                  <form method="get">
                    <label>
                      <div style={{ textAlign: 'center' }}>
                        <img src={loadImage(category.image)} id="submitButton" style={{ cursor: 'pointer' }} />
                        <input type="submit" id="submitButton" name="c" value={category.name} style={{ display: 'none' }}/>
                        
                      </div>
                      <div style={{ textAlign: 'center' }} className='category-text'>{category.name} </div>
                    </label>
                    
                  </form>
                
                </div>
              </li>
            )
          )}
        </ul>
      </div>

      {/*Left side menu bar*/}
      <div className='menu'>
        <h1 className='menuText'>Sort By:</h1>
        <ul>
          <li onClick={() => handleSort(1)}>Price</li>
          <li onClick={() => handleSort(2)}>Weight</li>
          <li onClick={() => handleSort(3)}>A-Z</li>
          <li onClick={() => handleSort(4)}>Z-A</li>
        </ul>
      </div>
      {/* Vertical scroll through items */}
      <div className='categoryscroll'>
        <ul>
          { selectedItems.map((item) => (
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