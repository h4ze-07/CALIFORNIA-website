import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import {  ref, set } from "firebase/database";
import { db } from "../../firebase";
import { useState } from "react";

const SignUp = ({userLogIn}) => {

const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [name, setName] = useState();


function handeleSignUp (e) {
   e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        set(ref(db, 'users/'+ user.uid), {
            name: name,
            email: email,
            uid : user.uid,
          });
          
          console.log(user)
          userLogIn()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       console.log(errorMessage)
      });
}

  return (
    <div>
    <div >
      
      <form onSubmit={handeleSignUp}>
        <div>
          <label>Name</label>
          <div>
            <input name="text" type="text" required onChange={(e) => setName(e.target.value)} />
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