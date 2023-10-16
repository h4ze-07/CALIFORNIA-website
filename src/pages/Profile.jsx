import React, {useState, useEffect} from 'react'
import LogIn from '../components/Auth/LogIn'
import SignUp from '../components/Auth/SignUp'
import {auth, DB_URL} from '../firebase';
import {Link} from 'react-router-dom';


const Profile = ({setUser, user, wishes}) => {
    const [isLogIn, setIsLogin] = useState(false);


    const getUserFromDB = async (userId) => {
        const sendRequest = async () => {
            const response = await fetch(DB_URL + '/users/' + userId + '.json');

            if (!response.ok) {
                throw new Error('Cant get user from DB');
            }

            const data = await response.json();
            return data;
        }

        try {
            const userFromDB = await sendRequest();
            console.log(userFromDB);
            setUser({
                name: userFromDB.name,
                email: userFromDB.email,
                userId: userFromDB.uid,
                wishes: userFromDB.wishes || [],
                cart: userFromDB.cart || [],
                orders: userFromDB.orders || []
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                getUserFromDB(authUser.uid); // Передача userId
                console.log(authUser.uid)
            } else {
                console.log('no user');
            }
        });
    }, []);


    const userLogIn = () => {
        setIsLogin(true)
    }
    console.log(isLogIn);
    console.log(user);


    const updateUser = () => {
        setUser()
    }

    return (


        <div style={{
            marginTop: '100px'
        }

        }>
            <div>
                <h2>Personal account</h2>
                <Link to='/orders'>my orders</Link>
                <Link to='/wishes'>my wishes</Link>

            </div>

            {user ? (
                <div>
                    <p>Welcome, {user.name}</p>
                </div>
            ) : (
                <div>
                    <div>
                        <LogIn updateUser={updateUser} userLogIn={userLogIn}/>
                    </div>
                    <div>
                        <SignUp updateUser={updateUser} userLogIn={userLogIn}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile