import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box
} from '@mui/material';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        
        if (storedProducts) {
            setProducts(storedProducts);
        } else {
            fetch('/products.json')
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data.products);
                    localStorage.setItem('products', JSON.stringify(data.products));
                });
        }
    }, []);

    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return (
        <Container style={{ backgroundColor: '#2c2f33', padding: '20px', minHeight: '100vh', color: 'white', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px', color: 'white', fontWeight: 'bold' }}>
                Product List
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={() => navigate('/add-product')}>
                    Add Product
                </Button>
            </Box>
            <TableContainer component={Paper} style={{ backgroundColor: '#3c3f41', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>#</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>Name</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>Description</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>Price</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>Current Price</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', padding: '10px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#4b4f52' : '#3c3f41' }}>
                                <TableCell style={{ color: 'white', padding: '10px' }}>{index + 1}</TableCell>
                                <TableCell style={{ color: 'white', padding: '10px' }}>{product.name}</TableCell>
                                <TableCell style={{ color: 'white', padding: '10px' }}>{product.description}</TableCell>
                                <TableCell style={{ color: 'white', padding: '10px', textDecoration: 'line-through' }}>{product.price} đ</TableCell>
                                <TableCell style={{ color: 'white', padding: '10px' }}>{product.currentPrice} đ</TableCell>
                                <TableCell style={{ padding: '10px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginRight: '10px', backgroundColor: '#ff5252' }}
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/product/${product.id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Dashboard;
