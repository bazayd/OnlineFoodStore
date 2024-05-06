import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/NavBar.jsx'
import './App.css'
import OFS_Logo from '../assets/OFS Logo.png'
import Location_Icon from '../assets/Location Icon.png'
import Profile_Icon from '../assets/Profile Icon.png'
import Cart_Icon from '../assets/Cart Icon.png'
import NavBar from '../NavBar/NavBar.jsx';

const assetPath = '../assets/'
const loadImage = (name) => {
  if(name.includes("http")){
    return name
  } else {
    return assetPath+name+'.png'
  }
}

const MainPage = () => {
  const [quantity, setQuantity] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false)

  const [totalItems, setTotalItems] = useState(0)

  const [isEmployee, setIsEmployee] = useState(false)

  const categoryInterface = async (employeeAction) => {

    let categoryName = document.getElementById("category-name").value
    let categoryImage = document.getElementById("category-image").value

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName, image: categoryImage, action: employeeAction})
    }

    // create account request
    fetch('/inventory/categoryInterface', requestOptions).then(
        response => {
            if (response.status==200){
              // Deleted Item
              // Refresh Inventoy
              fetchAllCategories()
              return response.text().then((data) =>{
                document.getElementById("categoryInterfaceResponse").textContent = data
              })
            } else {
              return response.text().then((data) =>{
                document.getElementById("categoryInterfaceResponse").textContent = data
              })
            }
        }
    )

  }

  const stockInterface = async (employeeAction) => {

    let itemName = document.getElementById("item-name").value
    let itemCategory = document.getElementById("item-category").value
    let itemDescription = document.getElementById("item-desc").value
    let itemPrice = document.getElementById("item-price").value
    let itemWeight = document.getElementById("item-weight").value
    let itemImage = document.getElementById("item-image").value

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName, category: itemCategory, description: itemDescription, price: itemPrice, weight: itemWeight, image: itemImage, action: employeeAction })
    }
    
    // create account request
    fetch('/inventory/stockInterface', requestOptions).then(
        response => {
            if (response.status==200){
              // Deleted Item
              // Refresh Inventoy
              fetchCurrentItems()
              return response.text().then((data) =>{
                document.getElementById("stockInterfaceResponse").textContent = data
              })
            } else {
              return response.text().then((data) =>{
                document.getElementById("stockInterfaceResponse").textContent = data
              })
            }
        }
    )

  }

  const loadUserData = () => {
    // create account request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    }

    // create account request
    fetch('/users/getUserInfo', requestOptions).then(
        response => {
            if (response.status==200){
                // We have a session !
                // Display user data on page
                return response.json().then(data => {
                    if(data.usertype === 2){
                      setIsEmployee(true)
                    }
                })
            }
        }
    )

}

  // Grab Inventory From Database
  const fetchCartNum = async () => {

    // create request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    }

    // Fetch Fruit
    return fetch('/users/getCart', requestOptions).then((response) => {
      if (response.status === 200) {
        // We got data
        return response.json();
      } else {
        
        return []; // Return an empty object in case of error
      }
    }).then((data) => {

      // set total order number
      setTotalItems(data.length)
      
    })
        
  }

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
          
          setLoggedIn(true)
          

        } else {
          // No session ;(
         
          setLoggedIn(false)
          
        }
      }
    ).then(
      data => {

        
        
      }
    )

  }

  
  const addToCart = (inputItem, inputQuantity) => {

    if(!loggedIn){
      window.location.href="/login/"
    }

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: inputItem, quantity: inputQuantity})
    }

    fetch('/users/addToCart', requestOptions).then(
      response => {
        if (response.status==200){
          
          // refresh navbar
          fetchCartNum()

        } else {
        
          //

        }
      }
    ).then(
      data => {

        // 
        
      }
    )
  }
  

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

  useEffect (() => {
    loadUserData()
    loadAccount()
    fetchCurrentItems()
    fetchAllCategories()
    fetchCartNum()
  }, [])

  


 
  
  return (
    <div>
      {/* NavBar Import */}
      <Navbar totalItems={totalItems} />
      {/* Horizontal category scroll bar */}
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

        { isEmployee && (
          <div className='adminContainer'>
            <div className='adminPanel'>
              <h3 className='menuText' id="stockInterfaceResponse"></h3>
              <form className='adminForm' action="">
                <input type="text" placeholder='Item Name' id='item-name' />
                <input type="text"  placeholder='Category' id='item-category' />
                <input type="text" placeholder='Description' id='item-desc' />
                <input type="text" placeholder='Price' id="item-price" />
                <input type="text" placeholder='Weight' id='item-weight' />
                <input type="text" placeholder='Image Url' id='item-image' />
                
              </form>
              <button className='addStock' onClick={() => stockInterface(1)}>Add Stock</button>
              <button className='subStock' onClick={() => stockInterface(2)}>Sub Stock</button>
              <button className='removeStock' onClick={() => stockInterface(3)}>Remove Item</button>
            </div>
            <div className='adminPanel2'>
              <h3 className='menuText' id="categoryInterfaceResponse"></h3>
              <form className='adminForm' action="">
                <input type="text" placeholder='Category Name' id='category-name' />
                <input type="text" placeholder='Image Url' id='category-image' />
                
              </form>
              <button className='addStock' onClick={() => categoryInterface(1)}>Add Category</button>
              <button className='subStock' onClick={() => categoryInterface(2)}>Remove Category</button>
            </div>
          </div>
        )}
        
      </div>
      {/* Vertical scroll through items */}
      <div className='categoryscroll'>
        <ul>
          {selectedItems.map((item, index) => {
            const totalPrice = item.price * (quantity[index] || 1);
            const totalWeight = item.weight * (quantity[index] || 1);
            
            let displayTotalPrice = totalPrice.toFixed(2);
            let displayTotalWeight = totalWeight;
          return (
            <li key={item.name}>
              <div className='categoryscroll-sections'>
                <ul className='categoryscroll-content'>
                  <li>
                    <img src={loadImage(item.image)} className='categoryscroll-images'></img>
                  </li>
                  <li className='categoryscroll-category'>
                    <span className='categoryscroll-title'>Category</span>
                    <span className='categoryscroll-text'>{item.category}</span>
                  </li>
                  <li className='categoryscroll-name'>
                    <span className='categoryscroll-title'>Name</span>
                    <span className='categoryscroll-text'>{item.name}</span>
                  </li>
                  <li className='categoryscroll-description'>
                    <span className='categoryscroll-title'>Description</span>
                    <span className='categoryscroll-text'>{item.description}</span>
                  </li>
                  <li className='categoryscroll-stock'>
                  <span className='categoryscroll-title'>Stock</span>
                    <span className='categoryscroll-text'>{item.stock}</span>
                  </li>
                  <li className='categoryscroll-price'>
                    <span className='categoryscroll-title'>Price</span>
                    <span className='categoryscroll-text'>${item.price}</span>
                  </li>
                  <li className='categoryscroll-weight'>
                    <span className='categoryscroll-title'>Weight</span>
                    <span className='categoryscroll-text'>{item.weight}g</span>
                  </li>
                  <li className='categoryscroll-totalprice'>
                    <span className='categoryscroll-title'>Total Price</span>
                    <span className='categoryscroll-text'>${displayTotalPrice}</span>
                  </li>
                  <li className='categoryscroll-totalweight'>
                    <span className='categoryscroll-title'>Total Weight</span>
                    <span className='categoryscroll-text'>{displayTotalWeight}g</span>
                  </li>
                </ul>

                <div className="quantity-control">
                  <button onClick={() => {
                    let newQuantity = [...quantity];
                    newQuantity[index] = Math.max(1, (quantity[index] || 1) - 1);
                    setQuantity(newQuantity);
                  }}>-</button>
                  <span>{quantity[index] || 1}</span>
                  <button onClick={() => {
                    let newQuantity = [...quantity];
                    newQuantity[index] = (quantity[index] || 1) + 1;
                    setQuantity(newQuantity);
                  }}>+</button>
                </div>
                <button className="add-to-cart-button" onClick={() => {addToCart(item.id, Math.max(1, (quantity[index] || 1)))}}>Add to cart</button>
              </div>
            </li>
          );
          })}
        </ul>
      </div>
    </div>
  )

}




export default MainPage