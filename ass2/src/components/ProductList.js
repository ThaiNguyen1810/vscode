import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        
        if (storedProducts) {
            setProducts(storedProducts);
        } else {
            fetchProducts();
        }
    }, []);

    const fetchProducts = () => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                localStorage.setItem('products', JSON.stringify(data.products));
            })
            .catch((error) => {
                console.error("Lỗi khi tải dữ liệu từ products.json:", error);
            });
    };

    return (
        <Container style={{ backgroundColor: '#2c2f33', padding: '20px', color: 'white', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: 'white', margin: '20px 0' }}>
                Product List
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card style={{ backgroundColor: '#444', color: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`images/${product.image}`}
                                alt={product.name}
                                style={{ objectFit: 'contain', padding: '10px' }}
                            />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{
                                        textDecoration: 'line-through',
                                        color: '#ccc',
                                        marginTop: '10px'
                                    }}
                                >
                                    {product.price} đ
                                </Typography>
                                <Typography variant="h6" style={{ color: '#ff5252', fontWeight: 'bold' }}>
                                    {product.currentPrice} đ
                                </Typography>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" color="error" component={Link} to={`/product/${product.id}`} style={{ backgroundColor: '#ff5252', color: 'white' }}>
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
