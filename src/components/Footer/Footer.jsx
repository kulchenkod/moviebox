import React from "react";
import { Link } from "react-router-dom";

import "./footer.css"

class Footer extends React.Component {
    render() {
      return (
        <footer className="footer">
          <div className="footer_section layout">
            <div className="footer_nav">
              <h1 className="title footer_title">Themovie<span className="title-bold">box</span></h1>
              <nav className="footer_nav-list">
                <Link to="/favorites/" className="footer_nav-item">Favorites</Link>
                <Link to="/" className="footer_nav-item">Movies</Link>
                <a href="/" className="footer_nav-item">Ratings</a>
                <a href="/" className="footer_nav-item">Contact</a>
              </nav>
            </div>
            <div className="footer_rights">
              <span className="footer_rights-text">Designed by Milan Houter. All rights reserved.</span>
              <div className="footer_social">
                <a href="/" className="footer_social-link"><i className="fab fa-facebook"></i></a> 
                <a href="/" className="footer_social-link"><i className="fab fa-pinterest"></i></a> 
                <a href="/" className="footer_social-link"><i className="fab fa-twitter-square"></i></a> 
                <a href="/" className="footer_social-link"><i className="fab fa-linkedin"></i></a> 
              </div>
            </div>
          </div>
      </footer>
      )
    }
  }
export default Footer