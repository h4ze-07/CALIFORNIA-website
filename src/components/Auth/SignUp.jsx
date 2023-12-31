import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../firebase';
import {ref, set} from "firebase/database";
import {db} from "../../firebase";
import {useState} from "react";
import '../../scss/signup.scss'

const SignUp = ({userLogIn}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function handeleSignUp(e) {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    uid: user.uid,
                }).then(() => {
                    userLogIn(true)
                });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    return (
        <div>
            <div className='signup_box'>
                <form onSubmit={handeleSignUp}>
                    <div>
                        <label>Name</label>
                        <div>
                            <input name="text" type="text" required onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <label>Email address</label>
                        <div>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>Password</label>
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp