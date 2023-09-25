import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddProductButton from './AddProductButton'

class ProductTable extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          id: 1,
          name: 'Ürün 1',
          category: 'Kategori 1',
          description: 'Ürün 1 Açıklaması',
          stock: 10,
        },
        {
          id: 2,
          name: 'Ürün 2',
          category: 'Kategori 2',
          description: 'Ürün 2 Açıklaması',
          stock: 5,
        },
      ],
    };
  }

  handleUpdate(id) {
    console.log('Güncelleme: ', id);
  }

  handleDelete(id) {
    console.log('Silme: ', id);
  }
  render() {
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
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    {/* Güncelleme düğmesi ve FaEdit ikonu */}
                    <button style={{ backgroundColor: 'orange' }} className="update-button" onClick={() => this.handleUpdate(product.id)}>
                      <FaEdit />
                    </button>
                    <button style={{ backgroundColor: 'red' }} className="delete-button" onClick={() => this.handleDelete(product.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductTable;