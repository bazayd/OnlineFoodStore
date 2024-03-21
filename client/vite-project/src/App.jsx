import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegister from './CustomerRegister';
import NavBarTest from './NavBarTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerRegister />} />
        <Route path="/NavBarTest" element={<NavBarTest />} />
      </Routes>
    </Router>
  );
};

export default App;
