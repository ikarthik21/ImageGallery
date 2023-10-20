import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';

export const searchContext = createContext("");

function App() {


  const [photos, setPhotos] = useState([]);

  return (
    <searchContext.Provider value={{ photos, setPhotos }}>
      <div>
        <Router>
          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />

          </Routes>


        </Router>

      </div>
    </searchContext.Provider>
  );
}

export default App;
