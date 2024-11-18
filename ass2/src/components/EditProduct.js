import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        currentPrice: ''
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        
        if (storedProducts) {
            const selectedProduct = storedProducts.find((prod) => prod.id === id);
            setProduct(selectedProduct);
        } else {
            fetch('/products.json')
                .then((response) => response.json())
                .then((data) => {
                    const selectedProduct = data.products.find((prod) => prod.id === id);
                    setProduct(selectedProduct);
                    localStorage.setItem('products', JSON.stringify(data.products));
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSave = () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = products.map((prod) =>
            prod.id === id ? product : prod
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        navigate(`/product/${id}`);
    };

    return (
        <Container style={{ backgroundColor: '#2c2f33', padding: '20px', color: 'white', maxWidth: '600px', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px' }}>
                Edit Product
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <Box display="flex" flexDirection="column" gap="20px">
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: 'white' } }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        name="description"
                        multiline
                        rows={4}
                        value={product.description}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: 'white' } }}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: 'white' } }}
                    />
                    <TextField
                        label="Current Price"
                        variant="outlined"
                        fullWidth
                        name="currentPrice"
                        value={product.currentPrice}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: 'white' } }}
                    />
                    <Box display="flex" justifyContent="center" gap={2} mt={3}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                            Back Home
                        </Button>
                        <Button variant="contained" color="secondary" onClick={(handleSave) } >
                            Save Product
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EditProduct;
