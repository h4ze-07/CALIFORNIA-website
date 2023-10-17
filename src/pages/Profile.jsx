import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import LogIn from '../components/Auth/LogIn'
import SignUp from '../components/Auth/SignUp'
import Orders from "../components/Orders.jsx";
import Wishes from "../components/Wishes.jsx";
import '../scss/profile.scss';

const Profile = ({setUser, user, handleSignOut, scrollToTop}) => {
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

    useEffect(() => {
        scrollToTop()
    }, [])

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
                                <Link onClick={handleEnter}>Log In / Sign Up</Link>
                            </li>
                            <li>
                                <Link onClick={handleOrders}>My orders</Link>
                            </li>
                            <li>
                                <Link onClick={handleWishes}>My wishes</Link>
                            </li>
                            <li>
                                <Link onClick={() => handleSignOut()} >Exit</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='account_content'>
                    {user ? (
                        <div className='welcome'>
                            <p>Welcome, {user.name}</p>
                        </div>
                    ) : (
                        <div className='entrance'>
                            <nav>
                                <ul className='d-flex'>
                                    <li>
                                        <Link onClick={() => {
                                            setIsLogin(true);
                                            handleLogin();
                                        }} className={isLogIn ? 'active' : ''}>Log In</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => {
                                            setIsLogin(false);
                                            handleSign();
                                        }} className={!isLogIn ? 'active' : ''}>Sign Up</Link>
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
                        <Wishes user={user} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile