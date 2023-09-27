import React, { useState, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        categoryId: '',
        tagNames: [],
        stock: ''
    });
    const formRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tagNames') {
            const tagNamesArray = value.split(',').map(tag => tag.trim());
            setProduct({ ...product, [name]: tagNamesArray });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("https://localhost:7031/api/Products", product)
            .then((response) => {
                window.location.reload();
                console.log('Ürün Eklendi: ', response.data);
                setProduct({
                    name: '',
                    description: '',
                    categoryId: '',
                    tagNames: [],
                    stock: '',
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
                                value={product.tagNames.join(', ')}
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
