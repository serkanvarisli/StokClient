import React, { useState, useRef, useEffect } from 'react';
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
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        axios
            .get("https://localhost:7031/api/Categories")
            .then((response) => {
                console.log("API Response:", response.data);
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tagNames') {
            const tagNamesArray = value.split(',').map(tag => tag.trim());
            setProduct({ ...product, [name]: tagNamesArray });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const mapCategoryNameToId = (name) => {
        const selectedCategory = categories.find(category => category.name === name);
        return selectedCategory ? selectedCategory.id : '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryId = mapCategoryNameToId(selectedCategoryName).toString();
        const updatedProduct = { ...product, categoryId };

        axios
            .post("https://localhost:7031/api/Products", updatedProduct)
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
                setSelectedCategoryName('');
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
        console.log(updatedProduct);
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
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name="categoryId"
                                    onChange={(e) => setSelectedCategoryName(e.target.value)}
                                    value={selectedCategoryName}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
