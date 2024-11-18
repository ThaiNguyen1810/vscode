import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        currentPrice: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const newProduct = {
            ...product,
            id: (storedProducts.length + 1).toString()
        };
        const updatedProducts = [...storedProducts, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        navigate('/dashboard');
    };

    return (
        <Container style={{ backgroundColor: '#2c2f33', padding: '20px', color: 'white', maxWidth: '600px', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px' }}>
                Add Product
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
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button variant="contained" color="primary" onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default AddProduct;
