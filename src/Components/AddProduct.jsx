import React, { useState, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

export default function ProductForm(props) {
    const [product, setProduct] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
        productStock: '',
    });
    const formRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form verilerini işleme veya gönderme işlemini burada gerçekleştirin
        console.log('Ürün Eklendi: ', product);
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
                                name="productName"
                                value={product.productName}
                                onChange={handleChange}
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
                                    name="productDescription"
                                    value={product.productDescription}
                                    onChange={handleChange}
                                    placeholder="Ürün Açıklaması"
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <Form.Select aria-label="Default select example">
                                <option value={product.productCategory}>Kategori</option>
                            </Form.Select>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput
                                type="number"
                                label="Ürün Stok Sayısı"
                                name="productStock"
                                value={product.productStock}
                                onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <Form.Select aria-label="Default select example">
                                <option value={product.productCategory}>Etiket</option>
                            </Form.Select>
                        </MDBCol>

                        <MDBCol>
                            <Form.Select aria-label="Default select example">
                                <option value={product.productCategory}>Etiket</option>
                            </Form.Select>
                        </MDBCol>

                        <MDBCol>
                            <Form.Select aria-label="Default select example">
                                <option value={product.productCategory}>Etiket</option>
                            </Form.Select>
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="success" type="submit">
                        Ekle
                    </MDBBtn>
                </form>
            </MDBContainer>
            <br></br>
        </div>
    );
}