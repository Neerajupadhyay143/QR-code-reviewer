import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ReviewPage } from './pages/ReviewPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:profileId" element={<ProfilePage />} />
          <Route path="/review/:profileId" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;