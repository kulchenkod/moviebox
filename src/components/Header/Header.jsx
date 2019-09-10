import React from "react";

import "./header.css"

export default class Header extends React.Component {
    render() {
      return (
        <header className="header">
            <div className="header_section layout">
              <h1 className="title">Themovie<span className="title-bold">box</span></h1>
            </div>
        </header>
      )
    }
  }