import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import MenuBar from "./components/UI/MenuBar";
import Repair from "./components/Repair";
import Catalog from "./components/Catalog";
import Profile from "./components/Profile";
import ShopingCart from "./components/ShopingCart";



const App = () => {
  return (

        <Router>
            <MenuBar/>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/repair" element={<Repair/>} />
            <Route path="/catalog" element={<Catalog/>} />
            <Route path="/cart" element={<ShopingCart/>} />
          </Routes>
        </Router>
  );
};

export default App;
