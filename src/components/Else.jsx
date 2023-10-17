import elseImg from '../images/else.png'
import '../scss/else.scss'

const Else = () => {
  return (
    <section id="search_else" className="else">
        <div className="container text_centre">
            <h3>Never miss a thing</h3>
            <div className="else_box text_centre">
                <p>Sign up for texts to be notified about our best offers on the perfect gifts.</p>
                <div className="box_img">
                    <img src={elseImg} alt="else" />
                </div>
                <form action="#" method="post" className="form_email d-flex">
                    <div className="email_box">
                        <label htmlFor="email"></label>
                        <input id="email" type="email" name="email" placeholder="Your email" />
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