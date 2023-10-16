import React, {useState, useEffect} from 'react'
import LogIn from '../components/Auth/LogIn'
import SignUp from '../components/Auth/SignUp'
import Orders from "../components/Orders.jsx";
import Wishes from "../components/Wishes.jsx";
import '../scss/profile.scss';

const Profile = ({setUser, user, wishes}) => {
    const [isLogIn, setIsLogin] = useState(false);
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displaySignup, setDisplaySignup] = useState(false);
    const [displayEnter, setDisplayEnter] = useState(false);
    const [displayOrders, setDisplayOrders] = useState(false);
    const [displayWishes, setDisplayWishes] = useState(false);

    const handleLogin = () => {
        setDisplayLogin(true);
        setDisplaySignup(false);
    }

    const handleSign = () => {
        setDisplayLogin(false);
        setDisplaySignup(true);
    }

    const handleEnter = () => {
        setDisplayEnter(true);
        setDisplayOrders(false);
        setDisplayWishes(false);
    }

    const handleOrders = () => {
        setDisplayEnter(false);
        setDisplayOrders(true);
        setDisplayWishes(false);
    }

    const handleWishes = () => {
        setDisplayEnter(false);
        setDisplayOrders(false);
        setDisplayWishes(true);
    }

    const userLogIn = () => {
        setIsLogin(true)
    }
    console.log(isLogIn);
    console.log(user);

    const updateUser = () => {
        setUser()
    }

    return (
        <section className='account'>
            <div className='container d-flex'>
                <div className='account_menu'>
                    <div>
                        <h3>Personal account</h3>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="#" onClick={handleEnter}>Log In / Sign Up</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleOrders}>My orders</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleWishes}>My wishes</a>
                            </li>
                            <li>
                                <a href="#" >Exit</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='account_content'>
                    {user ? (
                        <div>
                            <p>Welcome, {user.name}</p>
                        </div>
                    ) : (
                        <div className='entrance'>
                            <nav>
                                <ul className='d-flex'>
                                    <li>
                                        <a href="#" onClick={() => {
                                            setIsLogin(true);
                                            handleLogin();
                                        }} className={isLogIn ? 'active' : ''}>Log In</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => {
                                            setIsLogin(false);
                                            handleSign();
                                        }} className={!isLogIn ? 'active' : ''}>Sign Up</a>
                                    </li>
                                </ul>
                            </nav>
                            <div className='entrance_login' style={{ display: displayLogin ? 'inline-block' : 'none' }}>
                                <LogIn updateUser={updateUser} userLogIn={userLogIn} />
                            </div>
                            <div className='entrance_signup' style={{ display: displaySignup ? 'inline-block' : 'none' }}>
                                <SignUp updateUser={updateUser} userLogIn={userLogIn} />
                            </div>
                        </div>
                    )}
                    <div className='account_orders' style={{ display: displayOrders ? 'inline-block' : 'none' }}>
                        <Orders user={user} />
                    </div>
                    <div className='account_wishes' style={{ display: displayWishes ? 'inline-block' : 'none' }}>
                        <Wishes user={user} wishes={wishes} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile