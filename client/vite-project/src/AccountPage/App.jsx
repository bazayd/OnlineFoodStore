import React from 'react'
import './AccountPage.css'
import ProfilePicture from '../assets/ProfilePic.jpg'
import OFSLogo from '../assets/OFS Logo.png'
import myProfile from '../assets/myProfile.png'
import walletLogo from '../assets/walletLogov2.png'
import bellLogo from '../assets/bellIcon.webp'
import cardbackground  from '../assets/cardBackground.png'


const AccountPage = () => {
    return (
        <div className='page-div'>
            <a href='#'> {/* Clickin on logo will redirect to main page */}
                <img src={OFSLogo} alt="" id='logoIcon'/>
            </a>
            <div className='parentContainer'>
                <div className='myProfile'>
                    <header>
                        <img src={ProfilePicture} alt="Default profile picture image" />
                        <h1>My Profile</h1>
                    </header>

                    <form action="" method='POST'>
                        <div id='firstInput'>
                            <input type="text" id='usernameInput' placeholder='Will Display Username'/>
                            <br />
                            <input type="text" id='phoneInput' placeholder='Display Phone Number'/>
                            <br />
                        </div>
                        <div id='secondInput'>
                            <input type="text" id='emailInput' placeholder='Display Email'/>
                            <br />
                            <input type="submit" id='save' value="Save"/>
                        </div>
                    </form>
                </div>
                <div className='otherSettings'> 
                    <div className='payments'>
                        <header>
                            <h1>Payment Methods</h1>
                        </header>
                        <div className='cards'>
                            <div className='card-one'>
                                <div className='card-info'>
                                    <p>CardHolder Name</p>
                                </div>
                                <button className='editBtn'>Edit</button>
                            </div>
                            <div className='card-two'>
                                <div className='card-info'>
                                    <p>CardHolder Name</p>
                                </div>
                                <button className='editBtn'>Edit</button>
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