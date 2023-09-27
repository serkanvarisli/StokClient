import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import AddProductButton from './AddProductButton';
import '../Style/Product.scss';
import UpdateProduct from './UpdateProduct';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [newStock, setNewStock] = useState('');

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

  const handleEdit = (id) => {
    setEditProductId(id);
    const existingProduct = products.find((product) => product.id === id);
    setNewStock(existingProduct.stock.toString());
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setNewStock('');
  };

  const handleUpdate = (id) => {
    const existingProduct = products.find((product) => product.id === id);
    axios
      .put(`https://localhost:7031/api/Products/${id}`, {
        Stock: parseInt(newStock),
        Name: existingProduct.name,
        Description: existingProduct.description,
      })
      .then((response) => {
        console.log('Ürün stok güncellendi.', response.data);
        setProducts(products.map((product) => {
          if (product.id === id) {
            return { ...product, stock: parseInt(newStock) };
          }
          return product;
        }));
      })
      .catch((error) => {
        console.error('API Hatası:', error);
      });
    window.location.reload();
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
    axios
      .delete(`https://localhost:7031/api/Products/${id}`)
      .then((response) => {
        console.log('Ürün silindi.');
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
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
                <td>
                  {editProductId === p.id ? (
                    <input
                      type="text"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      style={{ backgroundColor: 'whitesmoke', borderRadius: '5px', color: 'black' }}
                    />
                  ) : (
                    p.stock
                  )}
                </td>
                <td>{p.tagName.join(', ')}</td>
                <td>
                  {editProductId === p.id ? (
                    <>
                      <button
                        style={{ backgroundColor: 'green' }}
                        onClick={() => handleUpdate(p.id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        style={{ backgroundColor: 'red' }}
                        onClick={handleCancelEdit}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ backgroundColor: 'orange' }}
                        className="update-button"
                        onClick={() => handleEdit(p.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        style={{ backgroundColor: 'red' }}
                        className="delete-button"
                        onClick={() => handleDelete(p.id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
