import {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../firebase';
import '../../scss/login.scss'


const LogIn = ({updateUser, userLogIn}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleLogin(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
                userLogIn()
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const clearForm = () => {
    }

    return (
        <div onSubmit={handleLogin}>
            <div className='login_box'>
                <form>
                    <div>
                        <label>Email address</label>
                        <div>
                            <input name="email" type="email" autoComplete="email" required
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Password</label>
                        </div>
                        <div>
                            <input name="password" type="password" autoComplete="current-password" required
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LogIn