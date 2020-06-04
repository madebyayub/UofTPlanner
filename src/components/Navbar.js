import React from "react";
import { connect } from "react-redux";

import GoogleAuth from "./GoogleAuth";
import { showCoursebar } from "../actions";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <nav id="navbar" className="navbar navbar-expand-lg p-0">
        <div className="navbar-brand ml-3">
          <img
            src="https://learnkit.com/wp-content/uploads/uoft-logo-white.png"
            alt="UofT Logo"
          />
        </div>
        <span id="brand-label">Program Planner</span>
        <div id="navbar-buttons">
          <ul className="navbar-nav right-tabs ml-auto mr-4 align-items-center">
            <li className="nav-item mr-5">
              <div>
                <button
                  className="add-course py-2 px-3 show-coursebar"
                  onClick={this.props.showCoursebar}
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Course
                </button>
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

export default connect(mapStateToProps, { showCoursebar })(Navbar);
