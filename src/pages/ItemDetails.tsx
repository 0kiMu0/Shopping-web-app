import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

type Item = {
  id: number;
  name: string;
  description: string;
};

const ItemDetails: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();  
  const itemIdNumber = parseInt(itemId || "", 10);  

  const items = JSON.parse(localStorage.getItem("items") || "[]");  
  const item = items.find((item: Item) => item.id === itemIdNumber);  

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <Box className="details-container">
      <Typography variant="h4">Item Details</Typography>
      <Typography variant="h6">ID: {item.id}</Typography>
      <Typography variant="body1">Name: {item.name}</Typography>
      <Typography variant="body1">Description: {item.description}</Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        Back
      </Button>
    </Box>
  );
};

export default ItemDetails;
