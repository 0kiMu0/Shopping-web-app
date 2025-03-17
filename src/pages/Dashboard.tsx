import { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';
import '../App.css';

type Item = {
  id: number;
  name: string;
  description: string;
};

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<Item>({ id: 0, name: '', description: '' });

  const handleOpen = () => {
    setNewItem({ id: Date.now(), name: '', description: '' });
    setIsEditing(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (newItem.name.trim() === '' || newItem.description.trim() === '') return;
    setItems([...items, newItem]);
    handleClose();
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (item: Item) => {
    setNewItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSaveEdit = () => {
    setItems(items.map(item => (item.id === newItem.id ? newItem : item)));
    handleClose();
  };

  return (
    <div className="app-container">
      <h1 className="header">Shopping App</h1>

      <Button className="add-item-btn" variant="contained" onClick={handleOpen}>
        Add Item
      </Button>

      <div className="item-grid">
        {items.map(item => (
          <ItemCard key={item.id} item={item} onDelete={handleDeleteItem} onEdit={handleEditItem} />
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit Item' : 'Add New Item'}
          </Typography>
          <TextField
            label="Item Name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Description"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '10px' }}
            onClick={isEditing ? handleSaveEdit : handleAddItem}
          >
            {isEditing ? 'Save Changes' : 'Add Item'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
