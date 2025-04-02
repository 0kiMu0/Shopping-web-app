import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import ItemCard from "../components/ItemCard";
import { useNavigate } from 'react-router-dom';

type Item = {
  id: number;
  name: string;
  description: string;
};

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>(JSON.parse(localStorage.getItem('items') || '[]')); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>({ id: 0, name: "", description: "" });

  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const onAddItemClick = () => {
    setCurrentItem({ id: Date.now(), name: "", description: "" });
    handleOpenModal();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (currentItem.name.trim() === "" || currentItem.description.trim() === "") return;
    const newItems = [...items, currentItem];
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));  
    handleCloseModal();
  };

  const onSubmit = () => {
    if (!isEditing) handleAddItem();
    else handleEditItem();
    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));  
  };

  const onEditClick = (item: Item) => {
    setIsEditing(true);
    setCurrentItem(item);
    handleOpenModal();
  };

  const handleEditItem = () => {
    const updatedItems = items.map((item) => (item.id === currentItem.id ? currentItem : item));
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));  
  };

  const handleViewDetails = (id: number) => {
    navigate(`/item/${id}`);  
  };

  return (
    <div className="app-container">
      <h1 className="header">Shopping App</h1>

      <div className="item-grid">
        <div className="add-item-card" onClick={onAddItemClick}>
          <span className="plus-sign">+</span>
          <span className="add-item-text">Add item</span>
        </div>

        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={handleDeleteItem}
            onEdit={onEditClick}
            onViewDetails={handleViewDetails}  
          />
        ))}
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Typography variant="h6">
            {isEditing ? "Edit Item" : "Add New Item"}
          </Typography>
          <TextField
            label="Item Name"
            name="name"
            value={currentItem.name}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Description"
            name="description"
            value={currentItem.description}
            onChange={onInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "10px" }}
            onClick={onSubmit}
          >
            {isEditing ? "Save Changes" : "Submit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
