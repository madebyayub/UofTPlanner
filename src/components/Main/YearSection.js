import React from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import {
  initPrograms,
  addProgram,
  removeProgram,
  searchProgram,
  showProgrambar,
  fetchProgramRequirements,
} from "../../actions";
import Year from "./Year";
import "../../stylesheets/yearsection.css";

class YearSection extends React.Component {
  componentDidMount() {
    this.props.initPrograms();
  }

  removeAProgram(program) {
    this.props.removeProgram(program);
    const removedPrograms = this.props.programs.filter(function (
      selectedProgram
    ) {
      return selectedProgram.code !== program.code;
    });

    let first = [];
    this.props.programRequirements.first.map((noRemoveCourse) => {
      if (program.requirements.first.indexOf(noRemoveCourse.code) < 0) {
        first.push(noRemoveCourse);
      }
      return null;
    });
    let second = [];
    this.props.programRequirements.second.map((noRemoveCourse) => {
      if (program.requirements.second.indexOf(noRemoveCourse.code) < 0) {
        second.push(noRemoveCourse);
      }
      return null;
    });
    let third = [];
    this.props.programRequirements.third.map((noRemoveCourse) => {
      if (program.requirements.third.indexOf(noRemoveCourse.code) < 0) {
        third.push(noRemoveCourse);
      }
      return null;
    });
    let fourth = [];
    this.props.programRequirements.fourth.map((noRemoveCourse) => {
      if (program.requirements.fourth.indexOf(noRemoveCourse.code) < 0) {
        fourth.push(noRemoveCourse);
      }
      return null;
    });
    this.props.fetchProgramRequirements(removedPrograms, {
      first,
      second,
      third,
      fourth,
    });
  }
  renderPrograms() {
    if (this.props.programs) {
      return this.props.programs.map((program) => {
        return (
          <div className="program-selected py-1 px-2 ml-2" key={program.code}>
            <div className="program-label">
              {program.program} - {program.type}
            </div>
            <div
              className="remove-program ml-1"
              onClick={() => this.removeAProgram(program)}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div id="main-container" className="pt-2 px-2">
        <div id="programs-selected" className="ml-5 mb-2">
          <ReactCSSTransitionGroup
            transitionName="slideleft"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            {this.renderPrograms()}
          </ReactCSSTransitionGroup>
          <div
            className="program-selected add-program py-1 px-2 ml-2"
            onClick={this.props.showProgrambar}
          >
            <div className="add-program">Add A Program</div>
            <i className="fas fa-plus ml-2"></i>
          </div>
        </div>
        <div id="years-section">
          <Year
            label={"Year One"}
            courses={{
              set: this.props.programRequirements
                ? this.props.programRequirements.first
                : [],
              options: !this.props.programRequirements
                ? []
                : this.props.programRequirements.options
                ? this.props.programRequirements.options.first_options
                : [],
            }}
          />
          <Year
            label="Year Two"
            courses={{
              set: this.props.programRequirements
                ? this.props.programRequirements.second
                : [],
              options: !this.props.programRequirements
                ? []
                : this.props.programRequirements.options
                ? this.props.programRequirements.options.second_options
                : [],
            }}
          />
          <Year
            label="Year Three"
            courses={{
              set: this.props.programRequirements
                ? this.props.programRequirements.third
                : [],
              options: !this.props.programRequirements
                ? []
                : this.props.programRequirements.options
                ? this.props.programRequirements.options.third_options
                : [],
            }}
          />
          <Year
            label="Year Four"
            courses={{
              set: this.props.programRequirements
                ? this.props.programRequirements.fourth
                : [],
              options: !this.props.programRequirements
                ? []
                : this.props.programRequirements.options
                ? this.props.programRequirements.options.fourth_options
                : [],
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    programs: state.selectedPrograms.selectedPrograms,
    programRequirements: state.selectedPrograms.programRequirements,
  };
};
export default connect(mapStateToProps, {
  initPrograms,
  addProgram,
  searchProgram,
  showProgrambar,
  removeProgram,
  fetchProgramRequirements,
})(YearSection);
