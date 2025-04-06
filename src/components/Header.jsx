import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerCart from '../images/header_cart.svg';
import headerLogo from '../images/header_logo.svg';
import headerUser from '../images/header_user.svg';
import '../scss/header.scss';
import ModalSearch from "./ModalSearch.jsx";

const Header = ({ cartCounter, searchProductsByName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResult, setSearchResult] = useState('');

    const handleClose = () => {
        const element = document.querySelector('.child_item');
        if (element) {
            element.style.display = 'none';
        }
    }

    const handleSearch = (searchText) => {
        setIsModalOpen(true);
        setSearchResult(`${searchText}`);
    };

    useEffect(() => {
        const headerBurger = document.querySelector('.header_burger');
        const headerMenu = document.querySelector('.header_menu');
        const body = document.querySelector('body');

        const toggleClasses = () => {
            headerBurger.classList.toggle('active');
            headerMenu.classList.toggle('active');
            body.classList.toggle('lock');
        };

        if (headerBurger) {
            headerBurger.addEventListener('click', toggleClasses);
        }

        return () => {
            if (headerBurger) {
                headerBurger.removeEventListener('click', toggleClasses);
            }
        };
    }, []);

    useEffect(() => {
        const headerLinks = document.querySelectorAll('.header_link');

        const closeMenu = () => {
            const headerBurger = document.querySelector('.header_burger');
            const headerMenu = document.querySelector('.header_menu');
            const body = document.querySelector('body');

            headerBurger.classList.remove('active');
            headerMenu.classList.remove('active');
            body.classList.remove('lock');
        };

        headerLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        return () => {
            headerLinks.forEach((link) => {
                link.removeEventListener('click', closeMenu);
            });
        };
    }, []);

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
                                <Popover.Button className="parents_item" >
                                    <span>Solutions</span>
                                    <ChevronDownIcon className="dropdown_icon" aria-hidden="true" />
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
                                                    <Link to="catalog/smartphones" onClick={handleClose}>Phones</Link>
                                                </li>
                                                <li>
                                                    <Link to="catalog/watch" onClick={handleClose}>Watches</Link>
                                                </li>
                                                <li>
                                                    <Link to="catalog/tablet" onClick={handleClose}>Tablet</Link>
                                                </li>
                                                <li>
                                                    <Link to="/catalog/laptop" onClick={handleClose}>Laptops</Link>
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
                                <Link to='/login'>
                                    <img src={headerUser} alt="user" />
                                </Link>
                            </li>
                            {/* <li>
                                <a href="#" onClick={() => handleSearch()}>
                                    <img src={headerSearch} alt="search"/>
                                </a>
                            </li> */}
                            <li className="header__cart-link">
                                <NavLink to="/cart">
                                    <img src={headerCart} alt="search" />
                                </NavLink>
                                {cartCounter >= 1 && <div className='header_cart_count'>{cartCounter}</div>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <ModalSearch
                searchProductsByName={searchProductsByName}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onSearch={handleSearch}
            />
        </header>
    )
}

export default Header