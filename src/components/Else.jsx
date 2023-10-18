import elseImg from '../images/else.png'
import '../scss/else.scss'
import {db} from '../firebase';
import { useRef, useState } from 'react';
import { ref, set } from 'firebase/database';
import EmailModal from './EmailModal';

const Else = () => {
  const [email, setEmail] = useState(null);
  const [modalEmail, setModalEmail] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
        const newEmail = {
            date: new Date().toLocaleString(),
            email: email.toLowerCase()
        };
        setEmail(null);
        emailRef.current.value = '';
        set(ref(db, 'emails/' + email.replace(/\./gi, '_').toLowerCase()), newEmail)
        .then(() => {
            setModalEmail(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
  }

  const handleCloseEmailModal = () => {
    setModalEmail(false);
  }

  return (
    <section id="search_else" className="else">
        {modalEmail && <EmailModal handleCloseEmailModal={handleCloseEmailModal} />}
        <div className="container text_centre">
            <h3>Never miss a thing</h3>
            <div className="else_box text_centre">
                <p>Sign up for texts to be notified about our best offers on the perfect gifts.</p>
                <div className="box_img">
                    <img src={elseImg} alt="else" />
                </div>
                <form className="form_email d-flex" onSubmit={(e) => handleSubmit(e)}>
                    <div className="email_box">
                        <label htmlFor="email"></label>
                        <input id="email" type="email" name="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                    </div>
                    <div className="button_box text_centre">
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Else