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
<div class="top">
<a href="MainPage.jsx"><img src={OFS_Logo} class ="logo"/></a>
    </div>
    
    <link rel="stylesheet" href="App.css" />
<body class="body">

  <form class="credit-card">
    <div class="front">
      <div class="card-data-row">
        <div class="brand-name">Credit Card</div>
        <img src={Visa}  class="Visa" />
      </div>
      <fieldset class="form-group">
        <legend>Card Number</legend>
        <label htmlFor="cc-1">Card Number</label>
        <div class="cc-inputs">
        <input type="tel" maxLength="4" aria-label='Credit Card First 4 Digits' name = "cc-1" id="cc-1" required patterns = "[0-9]{4}"/>
        <input type="tel" maxLength="4" aria-label='Credit Card Second 4 Digits' name = "cc-1" required patterns = "[0-9]{4}"/>
        <input type="tel" maxLength="4" aria-label='Credit Card Third 4 Digits' name = "cc-1" required patterns = "[0-9]{4}"/>

          <input type="tel" maxLength="4" aria-label='Credit Card Fourth 4 Digits' name = "cc-1"  required patterns = "[0-9]{4}"/>
        </div>
      </fieldset>
      <div class="input-row">
        <div class="form-group name-group">
          <label for="name">Name</label>
          <input type="text" id = "name" required/>
        </div>
        <fieldset class="form-group">
          <legend>Expiration</legend>
          <lebel htmlFor="expiration-month">EXPIRATION</lebel>
          <div class="hori">
            <select  id="expiration-month"
          aria-label="Expiration Month" required>
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
            <select  id="expiration-year"
          aria-label="Expiration Year" required>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>

            </select>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="back">
      <div class="stripe"></div>
      <div class="form-group cvc-group">
        <label htmlFor="cvc">CVC</label>
        <input class = "cvc-input" type="tel" maxLength="3" id="cvc" required/>
      </div>
    </div>
  </form>

  <div class="container">
        <div class="shopping-cart">
            <h2>Your Shopping Cart</h2>
            <ul id="cart-items">
                <li data-price="10">Product 1 - $10 <button class="delete-item">Delete</button> <button class="increase-quantity">+</button></li>
                <li data-price="20">Product 2 - $20 <button class="delete-item">Delete</button> <button class="increase-quantity">+</button></li>
                <li data-price="15">Product 3 - $15 <button class="delete-item">Delete</button> <button class="increase-quantity">+</button></li>
            </ul>
            <p id="total">Total: $45</p>
            <button id="checkout-btn">Checkout</button>
        </div>
    </div>
</body>
      
      
    </>
  )


  
}

export default App
