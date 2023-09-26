import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddProductButton from './AddProductButton';
import '../Style/Product.scss';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';

const ProductTable = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    axios
      .get("https://localhost:7031/api/Products/")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);
  const openComponent = () => {
    setIsOpen(true);
  };

  const closeComponent = () => {
    setIsOpen(false);
  };

  const handleUpdate = (id) => {
    // Update product with id
  };

  const handleDelete = (id) => {
    // Delete product with id
  };

  return (
    <div>
      <h1>Ürün Listesi</h1>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Kategori</th>
              <th>Açıklama</th>
              <th>Stok</th>
              <th>Etiketler</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.categoryName}</td>
                <td>{p.description}</td>
                <td>{p.stock}</td>
                <td>{p.tagName.join(', ')}</td>
                <td>
                  <button style={{ backgroundColor: 'orange' }} className="update-button" onClick={() => {
                    handleUpdate(p.Id);
                    openComponent();
                  }}>
                    <FaEdit />
                  </button>
                  <button style={{ backgroundColor: 'red' }} className="delete-button" onClick={() => handleDelete(p.Id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && <UpdateProduct onClose={closeComponent} />}
    </div>
  );
};
export default ProductTable;