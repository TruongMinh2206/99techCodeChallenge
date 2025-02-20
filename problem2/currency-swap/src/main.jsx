import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import SwapForm from './components/SwapForm.jsx'; // Import component form swap

const App = () => {
  return (
    <div className="app-container">
      <h1>Currency Swap</h1>
      <SwapForm />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
