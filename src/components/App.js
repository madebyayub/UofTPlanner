import React from "react";

import Navbar from "./Navbar";
import Coursebar from "./Course/Coursebar";
import Programbar from "./Program/Programbar";
import YearSection from "./Main/YearSection";
import CourseDetailModal from "./Course/CourseDetailModal";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Programbar />
        <Coursebar />
        <YearSection />
        <CourseDetailModal />
      </React.Fragment>
    );
  }
}

export default App;
