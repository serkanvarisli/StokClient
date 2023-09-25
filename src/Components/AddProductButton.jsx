import '../Style/App.scss';
import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { FaPlus } from 'react-icons/fa';


class App extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: false, // Gizli başlangıçta false
        };
    }

    toggleHidden = () => {
        this.setState({ isHidden: !this.state.isHidden });
    };

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.toggleHidden}>Ürün Ekle <FaPlus /></button>
                {this.state.isHidden && <AddProduct />}
                <p></p>
            </div>
        );
    }
}

export default App;