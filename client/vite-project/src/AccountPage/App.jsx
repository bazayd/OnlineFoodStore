import React from 'react'
import { useEffect, useState } from 'react'
import './AccountPage.css'
import ProfilePicture from '../assets/ProfilePic.jpg'
import OFSLogo from '../assets/OFS Logo.png'
import myProfile from '../assets/myProfile.png'
import walletLogo from '../assets/walletLogov2.png'
import bellLogo from '../assets/bellIcon.webp'
import cardbackground  from '../assets/cardBackground.png'


const AccountPage = () => {
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);
    const [accountName, setAccountName] = useState("User");
    const [accountEmail, setAccountEmail] = useState("Email");
    const [orders, setOrders] = useState([])

    const [address, setAddress] = useState([[],[],[]]);

    const [cart, setCart] = useState([]);

    const openModal = (buttonType) => {
        setIsModalOpen(true);
        setSelectedButton(buttonType)
    }
    
    const closeModal = () => {
        
        if(selectedButton===1){
            updateAddress(selectedButton, document.getElementById("street1").value, document.getElementById("city1").value, document.getElementById("state1").value, document.getElementById("zip1").value);
        } else if(selectedButton===2){
            updateAddress(selectedButton, document.getElementById("street2").value, document.getElementById("city2").value, document.getElementById("state2").value, document.getElementById("zip2").value);
        } else if(selectedButton===3){
            updateAddress(selectedButton, document.getElementById("street3").value, document.getElementById("city3").value, document.getElementById("state3").value, document.getElementById("zip3").value);
        }
        

        setIsModalOpen(false);
        setSelectedButton(null);

    }
    
    window.addEventListener('load', () => {
        const selectedLocation = localStorage.getItem('selectedLocation');
        if (selectedLocation) {
            const element = document.querySelector(`.${selectedLocation}`);
            const selectBtn = element.querySelector('.selectBtn');
            if (element) {
                element.style.border = "3px solid #ccc";
                element.style.borderRadius = "10px";
                selectBtn.style.display = "none";
            }
        }
    });


    let previouslySelectedLocation = null;


    function selectLocation(location, event, num) {

        selectedAddress(num);

        console.log("Selected button clicked, location selected.")
        const specifiedLocation = document.getElementsByClassName(location);
        

        const allLocations = document.querySelectorAll('.locationBtns');
        allLocations.forEach(locationBtn => {
            locationBtn.parentNode.style.border = "none";
            locationBtn.querySelector('.selectBtn').style.display = "block";
        });



        // if (previouslySelectedLocation) {
        //     previouslySelectedLocation.querySelector('.selectBtn').style.display = "block";
        // }
            

        for (var i = 0; i < specifiedLocation.length; i++) {
            console.log(specifiedLocation[i]);
            specifiedLocation[i].style.border = "3px solid #ccc";
            specifiedLocation[i].style.borderRadius = "10px";
        }

        const clickedElement = event.target.closest('.locationBtns').parentNode;
        clickedElement.style.border = "3px solid #ccc";
        clickedElement.style.borderRadius = "10px";
        clickedElement.querySelector('.selectBtn').style.display = "none";


        previouslySelectedLocation = clickedElement;



        localStorage.setItem('selectedLocation', location);
    }



    // ------------------- LOAD ALL USER INFORMATION TO THE CLIENT FROM SESSION COOKIE ------------------------------

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
                    return response.json();

                } else {
                    // No session ;(
                    // Make account button link to login page
                    window.location.href="/login/"
                
                }
            }
        ).then( 
            data => {
                // Input User Data Into Site
                setAccountName(data.user)
                setAccountEmail(data.email)
            }
        )

    }

    //--------------------- Address Requests ----------------------

    const getAllAddresses= async (catg, sear) => {

        // create request
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ })
        }
        // Fetch selected address
        return fetch('/users/location/getAll', requestOptions).then((response) => {
          if (response.status === 200) {
            // We got data
            return response.json();
          } else {
            console.log("Error retrieving data from backend server!")
            return null; // Return an empty object in case of error
          }
        }).then((data) => {
            setSelectedButton(data.id)
            setAddress(data)
            console.log(data)
          
        })
    
    }

    const selectedAddress = (input_buttonNumber) => {

        // create account request
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ buttonNumber: input_buttonNumber})
        }
    
        fetch('/users/location/setSelected', requestOptions).then(
          response => {
            if (response.status==200){
              
            } else {

            }
          }
        ).then(
          data => {

          }
        )
      }

    const updateAddress = (input_buttonNumber, input_street, input_city, input_state, input_zip) => {

        // create account request
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ buttonNumber: input_buttonNumber, street: input_street, city: input_city, state: input_state, zip:input_zip})
        }
    
        fetch('/users/location/set', requestOptions).then(
          response => {
            if (response.status==200){
              
            } else {

            }
          }
        ).then(
          data => {
            getAllAddresses();
          }
        )
      }

    // -------------------- Signout Functionality ----------------------

    const signOut = () => {

        // create account request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }
    
        // create account request
        fetch('/users/signout', requestOptions).then(
            response => {
                if (response.status==200){
                    
                    window.location.href="/MainPage/"
        
                } else {
        
                    alert("Looks like you are trying to signout without being logged in?")
        
                }
            }
        )

    }

    useEffect(() => {
        loadUserData()
        getAllAddresses()
    }, [])
    
    return (
        <div className='page-div'>
            <a href='/MainPage/'> {/* Clickin on logo will redirect to main page */}
                <img src={OFSLogo} alt="" id='logoIcon'/>
            </a>
            <div className='parentContainer'>
                <div className='myProfile'>
                    <header>
                        <img src={ProfilePicture} alt="Default profile picture image" />
                        <h1 id="user">{accountName}</h1>
                    </header>
                    <form action="" method='POST'>
                        <div id='secondInput'>
                            <input type="text" id="usernameInput" placeholder={accountName}/>
                            <br />
                        </div>
                        <div id='secondInput'>
                            <input type="text" id='emailInput' placeholder={accountEmail}/>
                            <br />
                            <input type="submit" id='save' value="Save"/>
                        </div>
                    </form>
                    <input type="submit" id='save' onClick={ () => {signOut()} } value="Sign Out"/>
                </div>
                <div className='otherSettings'> 
                    <div className='locations'>
                        <header>
                            <h1>Location</h1>
                        </header>
                        <div className='cards'>
                            <div className='location-one'>
                                <div className='location-info'>
                                    <p>Address 1:</p>
                                    <p>{address[0].street}</p>
                                    <p>{address[0].city}, {address[0].stte}</p>
                                    <p>{address[0].zipc}</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-one', event, 1)}}>Select</button>
                                    <button onClick={ () => {openModal(1)}} className='editBtn'>Edit</button>
                                </div>
                                {/* Opens pop up for editing location */}
                                {isModalOpen && (
                                    
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                {/* Display content based on the button clicked */}
                                                {selectedButton === 1 && (
                                                    <form className='location-form'>
                                                            {/* <label htmlFor="street"></label> */}
                                                            <input type="text" name="street" id="street1" defaultValue={address[0].street}/>
                                                            {/* <label htmlFor="city"></label> */}
                                                            <input type="text" name="city" id="city1" defaultValue={address[0].city}/>
                                                            {/* <label htmlFor="state"></label> */}
                                                            <input type="text" name="state" id="state1" defaultValue={address[0].stte}/>
                                                            {/* <label htmlFor="zip"></label> */}
                                                            <input type="text" name="zip" id="zip1" defaultValue={address[0].zipc}/>
                                                    </form>
                                                )}
                                                {selectedButton === 2 && (
                                                    <form className='location-form'>
                                                            {/* <label htmlFor="street"></label> */}
                                                            <input type="text" name="street" id="street2" defaultValue={address[1].street}/>
                                                            {/* <label htmlFor="city"></label> */}
                                                            <input type="text" name="city" id="city2" defaultValue={address[1].city}/>
                                                            {/* <label htmlFor="state"></label> */}
                                                            <input type="text" name="state" id="state2" defaultValue={address[1].stte}/>
                                                            {/* <label htmlFor="zip"></label> */}
                                                            <input type="text" name="zip" id="zip2" defaultValue={address[1].zipc}/>
                                                    </form>
                                                )}
                                                {selectedButton === 3 && (
                                                    <form className='location-form'>
                                                            {/* <label htmlFor="street"></label> */}
                                                            <input type="text" name="street" id="street3" defaultValue={address[2].street}/>
                                                            {/* <label htmlFor="city"></label> */}
                                                            <input type="text" name="city" id="city3" defaultValue={address[2].city}/>
                                                            {/* <label htmlFor="state"></label> */}
                                                            <input type="text" name="state" id="state3" defaultValue={address[2].stte}/>
                                                            {/* <label htmlFor="zip"></label> */}
                                                            <input type="text" name="zip" id="zip3" defaultValue={address[2].zipc}/>
                                                    </form>
                                                )}
                                            </div>
                                            <button className='save-location-btn' onClick={() => {closeModal()}}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='location-two'>
                                <div className='location-info'>
                                    <p>Address 2:</p>
                                    <p>{address[1].street}</p>
                                    <p>{address[1].city}, {address[1].stte}</p>
                                    <p>{address[1].zipc}</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-two', event, 2)}}>Select</button>
                                    <button onClick={ () => {openModal(2)}} className='editBtn'>Edit</button>
                                </div>
                            </div>
                            <div className='location-three'>
                                <div className='location-info'>
                                    <p>Address 3:</p>
                                    <p>{address[2].street}</p>
                                    <p>{address[2].city}, {address[2].stte}</p>
                                    <p>{address[2].zipc}</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-three', event, 3)}}>Select</button>
                                    <button onClick={ () => {openModal(3)}} className='editBtn'>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='orderHistory'>
                        <header>
                            <h1>Order History</h1>
                        </header>
                        <div className='orders'>
                            <table id="cart-items">
                                <thead>
                                    <tr>
                                    <th>Order Number</th>
                                    <th>Order Location</th>
                                    <th>Total Price</th>
                                    <th>Item Count</th>
                                    <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                    <tr key={order.name}>
                                        <td>{order.number}</td>
                                        <td>{order.location}</td>
                                        <td>{order.price}g</td>
                                        <td>{order.count}</td>
                                        <td>{order.datePurchased}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage