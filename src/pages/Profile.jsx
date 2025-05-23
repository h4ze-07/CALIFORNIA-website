import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import LogIn from '../components/Auth/LogIn';
import SignUp from '../components/Auth/SignUp';
import Orders from "../components/Orders.jsx";
import Wishes from "../components/Wishes.jsx";
import '../scss/profile.scss';

const Profile = ({ setUser, user, handleSignOut, scrollToTop, isLogIn, userLogIn }) => {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [displaySignup, setDisplaySignup] = useState(false);
    const [displayEnter, setDisplayEnter] = useState(false);
    const [displayOrders, setDisplayOrders] = useState(false);
    const [displayWishes, setDisplayWishes] = useState(false);
    const [toggleActiv, setTogglesctive] = useState(true)

    const handleLogin = () => {
        // userLogIn(true);
        setDisplayLogin(true);
        setDisplaySignup(false);
        setDisplayOrders(false);
        setDisplayWishes(false);
    }
    const handleSign = () => {
        // userLogIn(false);
        setDisplayLogin(false);
        setDisplaySignup(true);
        setDisplayOrders(false);
        setDisplayWishes(false);
    }

    const handleEnter = () => {
        userLogIn(true);
        setDisplayLogin(true);
        setDisplaySignup(false);
        setDisplayEnter(true);
        setDisplayOrders(false);
        setDisplayWishes(false);
    }

    const handleOrders = () => {
        userLogIn(false);
        setDisplayLogin(false);
        setDisplaySignup(false);
        setDisplayEnter(false);
        setDisplayOrders(true);
        setDisplayWishes(false);
    }

    const handleWishes = () => {
        userLogIn(false);
        setDisplayLogin(false);
        setDisplaySignup(false);
        setDisplayEnter(false);
        setDisplayOrders(false);
        setDisplayWishes(true);
    }




    const updateUser = () => {
        setUser()
    }

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <section className='account'>
            <div className='container'>
                <div className="account__inner">
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
                                                setTogglesctive(true);
                                                handleLogin();
                                            }} className={toggleActiv ? 'active' : ''}>Log In</Link>
                                        </li>
                                        <li>
                                            <Link onClick={() => {
                                                setTogglesctive(false);
                                                handleSign();
                                            }} className={!toggleActiv ? 'active' : ''}>Sign Up</Link>
                                        </li>
                                    </ul>
                                </nav>
                                <div className='entrance_login' style={{ display: displayLogin ? 'block' : 'none' }}>
                                    <LogIn updateUser={updateUser} userLogIn={userLogIn} />
                                </div>
                                <div className='entrance_signup' style={{ display: displaySignup ? 'block' : 'none' }}>
                                    <SignUp updateUser={updateUser} userLogIn={userLogIn} />
                                </div>
                            </div>
                        )}
                        <div className='account_orders' style={{ display: displayOrders ? 'block' : 'none' }}>
                            {user ? <Orders user={user} /> : <h4>You are not logged in or registered!</h4>}
                        </div>
                        <div className='account_wishes' style={{ display: displayWishes ? 'block' : 'none' }}>
                            {user ? <Wishes user={user} /> : <h4>You are not logged in or registered!</h4>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile