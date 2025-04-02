import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import "../App.css";

type ItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
  };
  onDelete: (id: number) => void;
  onEdit: (item: { id: number; name: string; description: string }) => void;
  onViewDetails: (id: number) => void;  
};

const ItemCard: React.FC<ItemProps> = ({ item, onDelete, onEdit, onViewDetails }) => {
  return (
    <Card className="item-card">
      <CardContent className='card-content'>
        <Typography className='item-name' variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography className='item-description' variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <br />
        <Button className='edit-button' variant="outlined" color="primary" onClick={() => onEdit(item)} sx={{ marginRight: '5px' }}>
          Edit
        </Button>
        <Button className='delete-button' variant="outlined" color="error" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
        <Button className='details-button' variant="outlined" color="secondary" onClick={() => onViewDetails(item.id)} sx={{ marginLeft: '5px' }}>
          Item Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
