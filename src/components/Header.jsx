import '../scss/header.scss'
import ModalSearch from "./ModalSearch.jsx";
import headerLogo from '../images/header_logo.svg';
import headerSearch from '../images/header_search.svg';
import headerCart from '../images/header_cart.svg';
import { NavLink, Link } from 'react-router-dom';
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'


const Header = ({cartCounter}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchResult, setSearchResult] = useState('');

    const handleSearch = (searchText) => {
        setIsModalOpen(true);
        setSearchResult(`${searchText}`);
    };

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
                                                <Link to="catalog/smartphones">Phones</Link>
                                                </li>
                                                <li>
                                                    <Link to="catalog/watch">Watches</Link>
                                                </li>
                                                <li>
                                                <Link to="catalog/tablet">Tablet</Link>
                                                </li>
                                                <li>
                                                <Link to="/catalog/laptop">Laptops</Link>
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
                                <a href="#" onClick={() => handleSearch()}>
                                    <img src={headerSearch} alt="search" />
                                </a>
                            </li>
                            <li>
                                <NavLink to="/cart">
                                    <img src={headerCart} alt="search" />
                                </NavLink>
                                {cartCounter >= 1 && <div>{cartCounter}</div>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <ModalSearch
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onSearch={handleSearch}
            />
        </header>
    )
}

export default Header