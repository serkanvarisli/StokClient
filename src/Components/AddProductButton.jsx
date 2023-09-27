import '../Style/App.scss';
import React from 'react';
import AddProduct from './AddProduct';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AddProductButton = () => {
    const [isHidden, setIsHidden] = React.useState(false);

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div>
            <button className="btn btn-secondary" onClick={toggleHidden}>
                {isHidden ? 'Ürün Ekle' : 'Ürün Ekle'} {isHidden ? <FaMinus /> : <FaPlus />}
            </button>
            {isHidden && <AddProduct />}
            <p></p>
        </div>
    );
};

export default AddProductButton;