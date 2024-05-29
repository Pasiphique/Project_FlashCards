import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Routes,Route } from "react-router-dom";
import Home from '../Pages/Home.js'
import Decks from "../Pages/Decks.js";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/decks/*" element={<Decks />}/>         
          <Route path="*" element ={<NotFound />} />
          
        </Routes>
        
      </div>
    </div>
  );
}

export default Layout;
