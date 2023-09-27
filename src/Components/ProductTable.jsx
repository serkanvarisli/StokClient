import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddProductButton from './AddProductButton';
import '../Style/Product.scss';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // react-confirm-alert kütüphanesini ekleyin
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS dosyasını ekleyin

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

  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Ürünü Sil',
      message: 'Ürünü silmek istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet',
          onClick: () => confirmDelete(id),
        },
        {
          label: 'Hayır',
        },
      ],
    });
  };

  const confirmDelete = (id) => {
    axios.delete(`https://localhost:7031/api/Products/${id}`)
      .then((response) => {
        console.log('Ürün silindi.');
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error('API Hatası:', error);
      });
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
                    handleUpdate(p.id);
                    openComponent();
                  }}>
                    <FaEdit />
                  </button>
                  <button style={{ backgroundColor: 'red' }} className="delete-button" onClick={() => handleDelete(p.id)}><FaTrash /></button>
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