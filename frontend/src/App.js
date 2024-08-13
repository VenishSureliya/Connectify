import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./pages/Register"; // Import your Register component

function App() {
  return (
    <Router> {/* Wrap Routes in Router */}
      <Routes>
        <Route path="/" element={<Register />} /> {/* Set Register as the root page */}
      </Routes>
    </Router>
  );
}

export default App;
