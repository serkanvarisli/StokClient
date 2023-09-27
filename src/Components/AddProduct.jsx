import React, { useState, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

const AddProduct = (props) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        categoryId: '', // Assuming categoryId is a number, change to: categoryId: 0,
        tagNames: [], // Initialize tagNames as an empty array
        stock: '' // Assuming stock is a number, change to: stock: 0,
    });
    const formRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tagNames') {
            // If the input name is 'tagNames', split the input value by comma to create an array
            const tagNamesArray = value.split(',').map(tag => tag.trim());
            setProduct({ ...product, [name]: tagNamesArray });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a POST request to your API to create the product
        axios
            .post("https://localhost:7031/api/Products", product)
            .then((response) => {
                console.log('Ürün Eklendi: ', response.data);
                // Optionally, you can reset the form fields after successful insertion
                setProduct({
                    name: '',
                    description: '',
                    categoryId: '', // Change to the initial value for categoryId
                    tagNames: [], // Change to the initial value for tagNames
                    stock: '', // Change to the initial value for stock
                });
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
        console.log(product);
    };

    return (
        <div className='add-product'>
            <MDBContainer>
                <h1 className="mt-5">Ürün Ekle</h1>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Ürün Adı"
                                name="name"
                                onChange={handleChange}
                                value={product.name}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="5"
                                    name="description"
                                    onChange={handleChange}
                                    placeholder="Ürün Açıklaması"
                                    value={product.description}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput
                                type="number"
                                label="Kategori"
                                name="categoryId"
                                onChange={handleChange}
                                value={product.categoryId}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput
                                type="number"
                                label="Ürün Stok Sayısı"
                                name="stock"
                                onChange={handleChange}
                                value={product.stock}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Etiket"
                                name="tagNames"
                                onChange={handleChange}
                                value={product.tagNames.join(', ')} // Display tagNames as a comma-separated string
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="success" type="submit">
                        Ekle
                    </MDBBtn>
                </form>
            </MDBContainer>
            <br />
        </div>
    );
}

export default AddProduct;
