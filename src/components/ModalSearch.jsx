import '../scss/modal_search.scss';
import headerSearch from '../images/header_search.svg';
import  { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalSearch = ({ isOpen, onRequestClose, onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const clearSearchText = () => {
        setSearchText('');
    };
    const handleSearch = () => {
        onSearch(searchText);
        clearSearchText();
        onRequestClose();
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


