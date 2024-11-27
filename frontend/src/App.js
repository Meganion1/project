import "./App.css";
// import { useState, useEffect } from "react";
// import { Style } from 'react';
// import Button from './components/Button/Button';
import {
   BrowserRouter as Router, 
   Routes, 
   Route 
  } from "react-router-dom";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactHeader from "./components/contactHeader/ContactHeader";
import Login from "./components/Register/Login";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Ingredients from "./components/ingredients/Ingredients";
import { slides } from "./assets/slideData";
// import classNames from 'classnames'

function App() {

  return (
    <Router>
      <Navigation  />

      <div className={"container"}>
        <main className={"main_container"}>
          <Routes>
            <Route 
              path="/"
              element={
                <>
                  <Home images={slides} />
                  <Ingredients />
                </>
              }
            />

            <Route
              path="/contactUs"
              element={
                <>
                  <ContactHeader />
                  <ContactForm />
                </>
              }
            />
            <Route
            path="/login" element={
              <>
              <Login/>
              </>
              
            }
            />
            <Route
            path="/register" element={
              <>
              <Register/>
              </>
            }
            />
           
          </Routes>
        </main>

        {/* <Button /> */}
      </div>
      <Footer/>

    </Router>
  );
}

export default App;
