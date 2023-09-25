import './Style/App.scss';
import React, { Component } from 'react';
import Login from './Pages/Login';
import ProductTable from './Components/ProductTable';
import AddProductButton from './Components/AddProductButton';
import Header from './Components/Header';
import UpdateProduct from './Components/UpdateProduct';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AddProductButton />
        <ProductTable />
      </div>
    );
  }
}

export default App;