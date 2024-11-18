import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

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
                });
        }
    }, [id]);

    if (!product) return <Typography>Loading...</Typography>;

    const discount = Math.round(((product.price - product.currentPrice) / product.price) * 100);

    return (
        <Container style={{ backgroundColor: '#2c2f33', padding: '20px', color: 'white', textAlign: 'center', maxWidth: '600px', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom>
                {product.name}
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
                <img src={`/images/${product.image}`} alt={product.name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Box>
            <Typography variant="body1" gutterBottom>
                {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Price: <span style={{ textDecoration: 'line-through' }}>{product.price} đ</span>
            </Typography>
            <Typography variant="h6" gutterBottom>
                Current Price: {product.currentPrice} đ
            </Typography>
            <Typography variant="h6" gutterBottom>
                Discount: {isNaN(discount) ? '0' : discount} %
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Back Home
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate(`/product/${id}/edit`)}>
                    Edit
                </Button>
            </Box>
        </Container>
    );
};

export default ProductDetail;
