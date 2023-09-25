import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            productName: '',
            productDescription: '',
            productCategory: '',
            productStock: '',
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // Form verilerini işleme veya gönderme işlemini burada gerçekleştirin
        console.log('Ürün Eklendi: ', this.state);
    };
    render() {
        return (
            <div className='add-product'>
                <MDBContainer>
                    <h1 className="mt-5">Ürün Ekle</h1>
                    <form onSubmit={this.handleSubmit}>
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <MDBInput
                                    type="text"
                                    label="Ürün Adı"
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
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
                                        value={this.state.productDescription}
                                        onChange={this.handleChange}
                                        placeholder="Ürün Açıklaması"
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <Form.Select aria-label="Default select example">
                                    <option value={this.state.productCategory}>Kategori</option>
                                </Form.Select>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <MDBInput
                                    type="number"
                                    label="Ürün Stok Sayısı"
                                    name="productStock"
                                    value={this.state.productStock}
                                    onChange={this.handleChange}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBBtn color="secondary" type="submit">
                            Ürünü Ekle
                        </MDBBtn>
                    </form>
                </MDBContainer>
                <br></br>
            </div>
        );
    }
}

export default ProductForm;
