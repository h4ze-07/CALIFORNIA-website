import '../scss/header.scss'
import headerLogo from '../images/header_logo.svg';
import headerSearch from '../images/header_search.svg';
import headerCart from '../images/header_cart.svg';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'


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
                                <NavLink to='/' className="header_link">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/catalog' className="header_link">all products</NavLink>
                            </li>
                            <Popover className="dropdown_products">
                                <Popover.Button className="parents_item">
                                    <span>Solutions</span>
                                    <ChevronDownIcon className="dropdown_icon" aria-hidden="true"/>
                                </Popover.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="child_item">
                                        <div className="child_box">
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
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
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