import elseImg from '../images/else.png'

const Else = () => {
  return (
    <section id="search_else" className="else">
        <div className="container text_centre">
            <h3>Looking for anything else?</h3>
            <form action="#" method="post" className="form_search">
                <div className="search">
                    <label htmlFor="search_keyword"></label>
                    <input id="search_keyword" type="text" name="search_keyword" placeholder="Search keyword" />
                    <button type="submit"></button>
                </div>
            </form>
            <div className="search_box">
                <ul className="d-flex">
                    <li>
                        <a href="#">iPhone</a>
                    </li>
                    <li>
                        <a href="#">Charger</a>
                    </li>
                    <li>
                        <a href="#">Gift</a>
                    </li>
                    <li>
                        <a href="#">Google Pixel 3</a>
                    </li>
                    <li>
                        <a href="#">Keyboard</a>
                    </li>
                </ul>
                <ul className="d-flex">
                    <li>
                        <a href="#">13 Pro Max</a>
                    </li>
                    <li>
                        <a href="#">iPhone 12</a>
                    </li>
                    <li>
                        <a href="#">Laptop</a>
                    </li>
                    <li>
                        <a href="#">Mobile</a>
                    </li>
                </ul>
            </div>
            <div className="else_box text_centre">
                <h3>Never miss a thing</h3>
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