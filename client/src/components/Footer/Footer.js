import React, { Component } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact">
        {/* <div className="logo">
            <img src="http://localhost:3000/images/logo.png" alt="" />
          </div> */}
        <div>
          <h3>Contact us</h3>
          <div className="icons">
            <i className="fas fa-phone" />
            <span className="text">+385 98/601/661</span>
            <br />
            <i className="far fa-envelope" />
            <span className="text">mmtours@gmail.com</span>
            <br />
            <i className="fas fa-home" />
            <span className="text">Kamen, Split</span>
          </div>
        </div>
      </div>
      <div className="follow">
        <h3>Follow us</h3>
        <div className="icons">
          <i className="fab fa-twitter fa-2x" />
          <i className="fab fa-facebook-square fa-2x" />
          <i className="fab fa-instagram fa-2x" />
        </div>
      </div>
      <div className="certificate">
        <h3>Something?</h3>
        <div className="icons">
          {/*           <i class="fas fa-trophy fa-2x" />
           */}{" "}
          <i className="fab fa-tripadvisor fa-4x" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
