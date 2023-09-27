import '../Style/App.scss';
import React from 'react';
import AddProduct from './AddProduct';
import { FaPlus } from 'react-icons/fa';

const AddProductButton = () => {
    const [isHidden, setIsHidden] = React.useState(false);

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div>
            <button className="btn btn-secondary" onClick={toggleHidden}>
                Ürün Ekle <FaPlus />
            </button>
            {isHidden && <AddProduct />}
        </div>
    );
};

export default AddProductButton;