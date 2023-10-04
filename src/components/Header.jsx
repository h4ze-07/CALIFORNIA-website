import '../scss/header.scss'
import headerLogo from '../images/header_logo.svg';
import headerSearch from '../images/header_search.svg';
import headerCart from '../images/header_cart.svg';
import { NavLink } from 'react-router-dom';


const Header = () => {

  return (
    <header>
        <div className="container">
            <div className="header_body">
                <NavLink to="/" className="header_logo">
                    <img src={headerLogo} alt="logo" />
                </NavLink>
                <div className="header_burger">
                    <span></span>
                </div>
                <nav className="header_menu">
                    <ul className="header_list">
                        <li>
                            <NavLink to='/catalog' className="header_link">all products</NavLink>
                        </li>
                        <li>
                            <a href="#" className="header_link">Solutions</a>
                        </li>
                        <li>
                            <a href="#" className="header_link">ABOUT</a>
                        </li>
                        <li>
                            <a href="#" className="header_link">Support</a>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <ul className="header_icons">
                        <li>
                            <a href="#search_else">
                                <img src={headerSearch} alt="search" />
                            </a>
                        </li>
                        <li>
                            <NavLink to="/cart">
                                <img src={headerCart} alt="search" />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header