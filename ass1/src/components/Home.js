import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Home = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetch('https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement')
      .then(response => response.json())
      .then(data => setStaffs(data.sort((a, b) => b.age - a.age)))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {staffs.map(staff => (
        <Grid item xs={12} sm={6} md={3} key={staff.id}> {/* 4 items per row on large screens */}
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
            <CardMedia 
              component="img" 
              height="180" 
              image={staff.avatar} 
              alt={staff.name} 
              style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} 
            />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography variant="h6" component={Link} to={`/detail/${staff.id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                {staff.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">Address: {staff.address}</Typography>
              <Typography variant="body2" color="textSecondary">Age: {staff.age}</Typography>
            </CardContent>
            <Button 
              component={Link} 
              to={`/detail/${staff.id}`} 
              variant="contained" 
              color="primary" 
              style={{ margin: '10px', borderRadius: '5px' }}
            >
              View Details
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
