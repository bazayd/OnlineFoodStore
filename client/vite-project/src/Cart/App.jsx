import { useEffect, useState } from 'react'
import OFS_Logo from '../assets/OFS Logo.png'
import Visa from '../assets/visa.svg'
import Mastercard from '../assets/mastercard.svg'

import "bootstrap/dist/css/bootstrap.min.css"

//import viteLogo from '/vite.svg'

import './App.css'

const assetPath = '../assets/'
const loadImage = (name) => {
  return assetPath+name+'.png'
}



function App() {

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const [cart, setCart] = useState([{"id":49,"category":"Protein","name":"Chicken Breast","image":"Apple","description":"Lean and versatile","price":"6.50","weight":400,"stock":28,"quantity":15},
  {"id":49,"category":"Protein","name":"Goat Meat","image":"Orange","description":"Lean and versatile","price":"6.50","weight":400,"stock":28,"quantity":52},
  {"id":49,"category":"Protein","name":"Beef","image":"Chicken Breast","description":"Lean and versatile","price":"6.50","weight":400,"stock":28,"quantity":23},])

  // Grab Inventory From Database
  const fetchCart = async () => {

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
        console.log("Error retrieving data from backend server!")
        return []; // Return an empty object in case of error
      }
    }).then((data) => {
      console.log(data)
      setCart(data)

      // Find total price weight and item count
      let tP = 0
      let tW = 0
      let tC = 0
      for(let i = 0; i < data.length; i++){
        tP += (data[i].price) * (data[i].quantity)
        tW += (data[i].weight) * (data[i].quantity)
        tC += (data[i].quantity)
      }
      setTotalPrice(tP)
      setTotalWeight(tW)
      setTotalCount(tC)
    })
        
  }

  useEffect (() => {

    fetchCart()

  }, [])
  
  return (
    <>
      <div className="top">
        <a href="MainPage.jsx"><img src={OFS_Logo} className="logo" alt="OFS Logo"/></a>
      </div>

      <div className="body">

        <form className="credit-card">
          <div className="front">
            <div className="card-data-row">
              <div className="brand-name">Credit Card</div>
              <img src={Visa} className="Visa" alt="Visa Logo"/>
            </div>
            <fieldset className="form-group">
              <legend>Card Number</legend>
              <label htmlFor="cc-1">Card Number</label>
              <div className="cc-inputs">
                <input type="tel" maxLength="4" aria-label='Credit Card First 4 Digits' name="cc-1" id="cc-1" required pattern="[0-9]{4}"/>
                <input type="tel" maxLength="4" aria-label='Credit Card Second 4 Digits' name="cc-2" required pattern="[0-9]{4}"/>
                <input type="tel" maxLength="4" aria-label='Credit Card Third 4 Digits' name="cc-3" required pattern="[0-9]{4}"/>
                <input type="tel" maxLength="4" aria-label='Credit Card Fourth 4 Digits' name="cc-4" required pattern="[0-9]{4}"/>
              </div>
            </fieldset>
            <div className="input-row">
              <div className="form-group name-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required/>
              </div>
              <fieldset class="form-group">
          <legend>Expiration</legend>
          <label for="expiration-month">Expiration</label>
          <div class="horizontal-input-stack">
            <select id="expiration-month" aria-label="Expiration Month" required>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <select id="expiration-year" aria-label="Expiration Year" required data-expiration-year>
              <option>2025</option>
              <option>2026</option>
              <option>2028</option>
              <option>2029</option>
              <option>2030</option>
              
            </select>
          </div>
        </fieldset>
            </div>
          </div>
          <div className="back">
            <div className="stripe"></div>
            <div className="form-group cvc-group">
              <label htmlFor="cvc">CVC</label>
              <input className="cvc-input" type="tel" maxLength="3" id="cvc" required/>
            </div>
          </div>
        </form>

        <div className="container">
          <div className="shopping-cart">
            <h2>Your Shopping Cart</h2>
            <b><p id="orderTotals">Total Order:</p></b>
            <p id="totalPrice">Price: ${totalPrice.toFixed(2)}</p>
            <p id="totalWeight">Wight: {totalWeight}g</p>
            <p id="totalCount">Items: #{totalCount}</p>
            <button id="checkout-btn">Checkout</button>
            <b><p id="orderTotals">Cart Items:</p></b>
            <ul id="cart-items">
              {cart.map((item) => {

                return (
                  <li key={item.name}>
                    <div className='categoryscroll-sections'>
                      <ul className='categoryscroll-content'>
                        <li className='categoryscroll-name'>
                          <span className='categoryscroll-text'>{item.name} x {item.quantity}</span>
                        </li>
                        <li className='categoryscroll-price'>
                          <span className='categoryscroll-text'>${(item.price*item.quantity).toFixed(2)}</span>
                        </li>
                        <li className='categoryscroll-weight'>
                          <span className='categoryscroll-text'>{(item.weight*item.quantity)}g</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                )

              })}
            </ul>
            
          </div>
        </div>
      
      </div>
    </>
  )


  
}

export default App
