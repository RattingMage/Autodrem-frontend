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
import {createTheme} from "@mui/material";
import {lime, purple} from "@material-ui/core/colors";
import {ThemeProvider} from "@emotion/react";

const theme = createTheme({
    palette: {
        contrastThreshold: 4.5,
        background: {
            paper: "#2d2d2d"
        }
    },
});

const App = () => {
  return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
  );
};

export default App;
