import React, {useState, useEffect} from 'react'
import LogIn from '../components/Auth/LogIn'
import SignUp from '../components/Auth/SignUp'
import {auth, DB_URL} from '../firebase';
import {Link} from 'react-router-dom';


const Profile = ({setUser, user, wishes}) => {
    const [isLogIn, setIsLogin] = useState(false);



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
               {user ? (
            <div>
                <p>Welcome, {user.name}</p>
            <div>
            <h2>Personal account</h2>
            <button>my orders</button>
            <Link to='/wishes'>my wishes</Link>
            
            </div>

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