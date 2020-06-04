import React from "react";
import { connect } from "react-redux";

import { hideProgrambar } from "../../actions";
import ProgramSearch from "./ProgramSearch";
import "../../stylesheets/programbar.css";

class Programbar extends React.Component {
  render() {
    if (this.props.programbar) {
      return (
        <div id="programbar" className="toggled">
          <div className="header px-3 pt-3">
            <span id="header-label">Add a Program</span>
            <button
              className="hide-programbar px-3 py-2"
              onClick={this.props.hideProgrambar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <hr className="mx-3" />
          <ProgramSearch />
        </div>
      );
    } else {
      return (
        <div id="programbar">
          <div className="header px-3 pt-3">
            <span id="header-label">Add a Program</span>
            <button
              className="hide-programbar px-3 py-2"
              onClick={this.props.hideProgram}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <hr className="mx-3" />
          <ProgramSearch />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    programbar: state.showProgrambar.showProgrambar,
  };
};

export default connect(mapStateToProps, { hideProgrambar })(Programbar);
