import React from "react";

import Navbar from "./Navbar";
import Coursebar from "./Course/Coursebar";
import Programbar from "./Program/Programbar";
import YearSection from "./Main/YearSection";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Programbar />
        <Coursebar />
        <YearSection />
      </React.Fragment>
    );
  }
}

export default App;
