import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ItemDetails from './pages/ItemDetails'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/item/:itemId" element={<ItemDetails />} /> 
      </Routes>
    </Router>
  );
};

export default App;
