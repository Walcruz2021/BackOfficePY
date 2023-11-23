import React, { useState } from "react";
import "./App.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import FormAddNote from "./components/formAddNote";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
  <div>
    <Routes>
     
      <Route
      path="/"
      element={
        <FormAddNote/>
       } 
      />
      
    </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App;
