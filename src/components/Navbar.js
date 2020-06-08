import React from "react";
import { connect } from "react-redux";

import GoogleAuth from "./GoogleAuth";
import { showCoursebar, hideCoursebar } from "../actions";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  componentDidMount() {
    this.props.hideCoursebar();
  }
  toggleCoursebar() {
    if (this.props.coursebar && this.props.coursebar.showCoursebar) {
      this.props.hideCoursebar();
    } else if (this.props.coursebar && !this.props.coursebar.showCoursebar) {
      this.props.showCoursebar();
    }
  }
  render() {
    return (
      <nav id="navbar" className="navbar navbar-expand-lg p-0">
        <div className="navbar-brand ml-3">
          <img
            src="https://learnkit.com/wp-content/uploads/uoft-logo-white.png"
            alt="UofT Logo"
          />
        </div>
        <span id="brand-label">MCS Program Planner</span>
        <div id="navbar-buttons">
          <ul className="navbar-nav right-tabs ml-auto mr-4 align-items-center">
            <li className="nav-item mr-5">
              <div>
                <div
                  className="add-course py-2 px-3 show-coursebar"
                  onClick={() => this.toggleCoursebar()}
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Course
                </div>
              </div>
            </li>
            <li className="nav-item">
              <GoogleAuth />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coursebar: state.showCoursebar,
  };
};

export default connect(mapStateToProps, { showCoursebar, hideCoursebar })(
  Navbar
);
