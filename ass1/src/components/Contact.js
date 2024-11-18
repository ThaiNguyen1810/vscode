import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    // Xử lý gửi dữ liệu hoặc hành động khác ở đây
    setFormData({ name: '', email: '', message: '' }); // Xóa form sau khi gửi
  };

  return (
    <Grid container justifyContent="center" style={{ padding: 20 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              style={{ marginBottom: 16 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              style={{ marginBottom: 16 }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              style={{ marginBottom: 16 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Contact;
