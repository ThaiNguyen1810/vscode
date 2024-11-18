import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditStaff = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    avatar: '',
  });
  const [ageError, setAgeError] = useState(false); // Trạng thái cho lỗi tuổi
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching staff details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'age') {
      // Kiểm tra nếu `age` chứa ký tự không phải số
      if (!/^\d*$/.test(value)) {
        setAgeError(true);
      } else {
        setAgeError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.split(' ').length < 2) {
      alert('Name must have more than 2 words');
      return;
    }

    fetch(`https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(() => {
        alert('Staff updated successfully');
        navigate('/dashboard'); // Điều hướng về Dashboard sau khi cập nhật
      })
      .catch(error => console.error('Error updating staff:', error));
  };

  return (
    <Grid container justifyContent="center" style={{ padding: 20 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom>Edit Staff</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required />
            <TextField 
              label="Age" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              fullWidth 
              required 
              error={ageError}
              helperText={ageError ? "Age must be a number" : ""}
            />
            <TextField label="Avatar URL" name="avatar" value={formData.avatar} onChange={handleChange} fullWidth required />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }} disabled={ageError}>
              Update Staff
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditStaff;
