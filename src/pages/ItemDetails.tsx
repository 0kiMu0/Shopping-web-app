import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useStore } from "../store"; 

const ItemDetails: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();  
  const navigate = useNavigate();
  
  const itemIdNumber = parseInt(itemId || "", 10);  
  const item = useStore((state) => state.getItem(itemIdNumber)); 

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <Box className="details-container">
      <Typography variant="h4">Item Details</Typography>
      <Typography variant="h6">ID: {item.id}</Typography>
      <Typography variant="body1">Name: {item.name}</Typography>
      <Typography variant="body1">Description: {item.description}</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </Box>
  );
};

export default ItemDetails;
