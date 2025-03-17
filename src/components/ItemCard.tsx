import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

type ItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
  };
  onDelete: (id: number) => void;
  onEdit: (item: { id: number; name: string; description: string }) => void;
};

const ItemCard: React.FC<ItemProps> = ({ item, onDelete, onEdit }) => {
  return (
    <Card className="item-card">
      <CardContent>
        <Typography variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => onEdit(item)} sx={{ marginRight: '5px' }}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
