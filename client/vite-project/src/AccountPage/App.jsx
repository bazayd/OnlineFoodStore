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


    const openModal = (buttonType) => {
        setIsModalOpen(true);
        setSelectedButton(buttonType)
    }
    
    const closeModal = () => {
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


    function selectLocation(location, event) {


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


    
    return (
        <div className='page-div'>
            <a href='/MainPage/'> {/* Clickin on logo will redirect to main page */}
                <img src={OFSLogo} alt="" id='logoIcon'/>
            </a>
            <div className='parentContainer'>
                <div className='myProfile' onLoad={loadUserData}>
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
                                    <p>Name</p>
                                    <p>Street</p>
                                    <p>City, State</p>
                                    <p>Zip Code</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-one', event)}}>Select</button>
                                    <button onClick={ () => {openModal('editButton')}} className='editBtn'>Edit</button>
                                </div>
                                {/* Opens pop up for editing location */}
                                {isModalOpen && (
                                    
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                {/* Display content based on the button clicked */}
                                                {selectedButton === 'editButton' && (
                                                    <form className='location-form'>
                                                            {/* <label htmlFor="street"></label> */}
                                                            <input type="text" name="street" id="street" placeholder='Street'/>
                                                            {/* <label htmlFor="city"></label> */}
                                                            <input type="text" name="city" id="city" placeholder='City'/>
                                                            {/* <label htmlFor="state"></label> */}
                                                            <input type="text" name="state" id="state" placeholder='State'/>
                                                            {/* <label htmlFor="zip"></label> */}
                                                            <input type="text" name="zip" id="zip" placeholder='Zip Code'/>
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
                                    <p>Name</p>
                                    <p>Street</p>
                                    <p>City, State</p>
                                    <p>Zip Code</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-two', event)}}>Select</button>
                                    <button onClick={ () => {openModal('editButton')}} className='editBtn'>Edit</button>
                                </div>
                            </div>
                            <div className='location-three'>
                                <div className='location-info'>
                                    <p>Name</p>
                                    <p>Street</p>
                                    <p>City, State</p>
                                    <p>Zip Code</p>
                                </div>
                                <div className='locationBtns'>
                                    <button className='selectBtn' onClick={(event) => {selectLocation('location-three', event)}}>Select</button>
                                    <button onClick={ () => {openModal('editButton')}} className='editBtn'>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='orderHistory'>
                        <header>
                            <h1>Order History</h1>
                        </header>
                        <div className='orders'>
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <th>Order</th>
                                    <th>Price</th>
                                </tr>
                                <tr>
                                    <td>1/1/2024</td>
                                    <td>Apples 5x, Pears 10x
                                    </td>
                                    <td>$10.99</td>
                                </tr>
                                <tr>
                                    <td>1/9/2024</td>
                                    <td>Apples 10x, Mango 10x
                                    </td>
                                    <td>$17.99</td>
                                </tr>
                                <tr>
                                    <td>1/22/2024</td>
                                    <td>Rice Bag 2x, Peppers 12x
                                    </td>
                                    <td>$17.99</td>
                                </tr>
                            </table>
                            {/* <div className='date'>
                                <h3>Date</h3>
                                <div className='item'>
                                    
                                </div>
                            </div>
                            <div className='order-info'>
                                <h3>Order</h3>
                                <div className='item'>

                                </div>
                            </div>
                            <div className='price'>
                                <h3>Price</h3>
                                <div className='item'>

                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage