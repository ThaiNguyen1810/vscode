import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Toolbar, IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = () => {
    fetch('https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement')
      .then(response => response.json())
      .then(data => setStaffs(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      fetch(`https://671a2be7acf9aa94f6a97086.mockapi.io/staffManagement/${id}`, { method: 'DELETE' })
        .then(() => {
          toast.success('Staff deleted successfully');
          fetchStaffs(); // Tải lại danh sách sau khi xóa
        })
        .catch(error => {
          console.error('Error deleting staff:', error);
          toast.error('Error deleting staff');
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper} style={{ marginTop: 20, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
          <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
            Staff Management Dashboard
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/add">
            Add Staff
          </Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map(staff => (
              <TableRow key={staff.id} hover>
                <TableCell>
                  <Avatar src={staff.avatar} alt={staff.name} />
                </TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.address}</TableCell>
                <TableCell>{staff.age}</TableCell>
                <TableCell>{new Date(staff.createdAt).toLocaleDateString()}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <IconButton component={Link} to={`/detail/${staff.id}`} color="primary" style={{ marginRight: 8 }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton component={Link} to={`/edit/${staff.id}`} color="secondary" style={{ marginRight: 8 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(staff.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
