// import './App.css';
import './main.css'
import data from "./data.json";
import React from 'react';
import NavBar from './components/Navbar';
import Overview from './pages/Overview';
import Geo from './pages/Geo'
import { Routes, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <NavBar>
      <Routes>
        <Route path="/" element={<Overview/>} />
        <Route path="geo" element={<Geo />} />
      </Routes>
        
      </NavBar>
    )
  }
}


export default App;
