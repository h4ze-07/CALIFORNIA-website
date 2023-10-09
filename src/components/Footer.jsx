import '../scss/footer.scss'

import footerLogo from '../images/header_logo.svg'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className="container d-flex">
            <div className="logo">
                <NavLink to="/">
                    <img src={footerLogo} alt="logo" />
                </NavLink>
                <p>Sign up for texts to be notified about<br /> our best offers on the perfect gifts.</p>
            </div>
            <div className="footer_box">
                <h4>All products</h4>
                <ul>
                    <li>
                        <a href="#">Phones</a>
                    </li>
                    <li>
                        <a href="#">Watch</a>
                    </li>
                    <li>
                        <a href="#">Tablet</a>
                    </li>
                    <li>
                        <a href="#">Laptops</a>
                    </li>
                </ul>
            </div>
            <div className="footer_box">
                <h4>Company</h4>
                <ul>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                </ul>
            </div>
            <div className="footer_box">
                <h4>Support</h4>
                <ul>
                    <li>
                        <a href="#">Style Guide</a>
                    </li>
                    <li>
                        <a href="#">Licensing</a>
                    </li>
                    <li>
                        <a href="#">Change Log</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="footer_box">
                <h4>Follow Us</h4>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">Instagram</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/" target="_blank">Facebook</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/" target="_blank">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" target="_blank">Youtube</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="visit_card">
            <div className="container d-flex between">
                <div className="card d-flex">
                    <p>Made By:</p>
                    <a href="#">Azwedo</a>
                </div>
                <div className="card d-flex">
                    <p>Powered by:</p>
                    <a href="#">Webflow</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer