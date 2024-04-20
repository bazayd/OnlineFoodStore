import { useEffect, useState } from 'react'
import OFS_Logo from '../assets/OFS Logo.png'
import Visa from '../assets/visa.svg'
import Mastercard from '../assets/mastercard.svg'

import "bootstrap/dist/css/bootstrap.min.css"

//import viteLogo from '/vite.svg'

import './App.css'



function App() {
  
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
              <fieldset className="form-group">
                <legend>Expiration</legend>
                <label htmlFor="expiration-month">EXPIRATION</label>
                <div className="hori">
                  <select id="expiration-month" aria-label="Expiration Month" required>
                    {/* Options here */}
                  </select>
                  <select id="expiration-year" aria-label="Expiration Year" required>
                    {/* Options here */}
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
            <ul id="cart-items">
              {/* List items here */}
            </ul>
            <p id="total">Total: $45</p>
            <button id="checkout-btn">Checkout</button>
          </div>
        </div>

      </div>
    </>
  )


  
}

export default App
