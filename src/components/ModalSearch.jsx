import '../scss/modal_search.scss';
import headerSearch from '../images/header_search.svg';
import  { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ModalSearch = ({ isOpen, onRequestClose, onSearch, searchProductsByName }) => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()

    const clearSearchText = () => {
        setSearchText('');
    };
    const handleSearch = () => {
        onSearch(searchText);
        searchProductsByName(searchText)
        clearSearchText();
        onRequestClose();
        navigate('/search')
    };


    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-close" onClick={onRequestClose}>
                    <FaTimes />
                </div>
                <div className='modal-form'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search..."
                    />
                    <button onClick={handleSearch}>
                        <img src={headerSearch} alt="search" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalSearch;


