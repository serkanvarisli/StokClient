import React, { useState, useRef, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Select from 'react-select';

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
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);

    const formRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get("https://localhost:7031/api/Categories", config)
            .then((response) => {
                console.log("API Response:", response.data);
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get("https://localhost:7031/api/Tags", config)
            .then((response) => {
                console.log("Tags API Response:", response.data);
                setTags(response.data);
            })
            .catch((error) => {
                console.error("Tags API Error:", error);
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

    const handleTagSelection = (selectedOptions) => {
        const selectedTagIds = selectedOptions.map((option) => option.value);
        setSelectedTags(selectedTagIds);
        const selectedTagNames = selectedOptions.map((option) => option.label);
        setProduct({ ...product, tagNames: selectedTagNames });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryId = mapCategoryNameToId(selectedCategoryName).toString();
        const updatedProduct = { ...product, categoryId };

        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post("https://localhost:7031/api/Products", updatedProduct, config)
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
                setSelectedTags([]);
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
                                required
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
                                    <option value="">Kategori seç ..</option>
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
                                required
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <div className="form-group">
                                <label htmlFor="tagNames" className="form-label d-flex justify-content-start">Etiketler</label>
                                <Select
                                    options={tags.map((tag) => ({
                                        value: tag.id,
                                        label: tag.name,
                                    }))}
                                    isMulti
                                    placeholder="Etiket seç"
                                    onChange={handleTagSelection}
                                    value={selectedTags.map((tagId) => ({
                                        value: tagId,
                                        label: tags.find((tag) => tag.id === tagId).name,
                                    }))}
                                />
                            </div>
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
