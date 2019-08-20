import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx"
import Favorites from "./components/Favorites/Favorites.jsx";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/page/:page" component={Main} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route exact path="/favorites/" component={Favorites} />
          <Footer />
        </div>
      </Router> 
    )
  }
}

export default App;