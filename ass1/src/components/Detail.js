import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const Detail = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    fetch(`https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement/${id}`)
      .then(response => response.json())
      .then(data => setStaff(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!staff) return <Typography>Loading...</Typography>;

  return (
    <Grid container justifyContent="center" style={{ padding: 20 }}>
      <Card>
        <CardMedia component="img" height="300" image={staff.avatar} alt={staff.name} />
        <CardContent>
          <Typography variant="h4">{staff.name}</Typography>
          <Typography>Address: {staff.address}</Typography>
          <Typography>Age: {staff.age}</Typography>
          <Typography>Created At: {new Date(staff.createdAt).toLocaleDateString()}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Detail;
