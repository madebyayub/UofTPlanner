import React from "react";
import { connect } from "react-redux";

import { hideCoursebar } from "../../actions";
import CourseSearch from "./CourseSearch";
import "../../stylesheets/coursebar.css";

class Coursebar extends React.Component {
  render() {
    if (this.props.coursebar) {
      return (
        <div id="coursebar" className="toggled">
          <div className="header px-3 pt-3">
            <span id="header-label">Add a Course</span>
            <button
              className="hide-coursebar px-3 py-2"
              onClick={this.props.hideCoursebar}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <hr className="mx-3" />
          <CourseSearch />
        </div>
      );
    } else {
      return (
        <div id="coursebar">
          <div className="header px-3 pt-3">
            <span id="header-label">Add a Course</span>
            <button
              className="hide-coursebar px-3 py-2"
              onClick={this.props.hideCoursebar}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <hr className="mx-3" />
          <CourseSearch />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    coursebar: state.showCoursebar.showCoursebar,
  };
};

export default connect(mapStateToProps, { hideCoursebar })(Coursebar);
