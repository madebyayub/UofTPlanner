import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import {
  searchProgram,
  addProgram,
  hideProgrambar,
  fetchProgramRequirements,
} from "../../actions";
import "../../stylesheets/programbar.css";

class ProgramSearch extends React.Component {
  renderInput = (formProps) => {
    if (formProps.input.value.length >= 0) {
      this.searchInput(formProps.input.value);
    }
    return (
      <input
        className="form-control form-control-lg mx-3"
        type="text"
        placeholder="Search by program name"
        autoComplete="off"
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
    );
  };
  searchInput = (program) => {
    this.props.searchProgram(program);
  };
  addAProgram = (program) => {
    if (this.props.programs) {
      let flag = false;
      for (let i = 0; i < this.props.programs.length; i++) {
        if (
          this.props.programs[i].code === program.code ||
          this.props.programs[i].program === program.program
        ) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.props.addProgram(program);
        this.props.fetchProgramRequirements(
          [program],
          _.isEmpty(this.props.programRequirements)
            ? { first: [], second: [], third: [], fourth: [] }
            : this.props.programRequirements
        );
      }
    } else {
      this.props.addProgram(program);
      this.props.fetchProgramRequirements(
        [program],
        _.isEmpty(this.props.programRequirements)
          ? { first: [], second: [], third: [], fourth: [] }
          : this.props.programRequirements
      );
    }
    this.props.hideProgrambar();
  };
  renderResults() {
    if (this.props.programResults && this.props.programResults.length >= 0) {
      return this.props.programResults.map((program) => {
        return (
          <div
            className="result-item mx-3 my-2 py-2"
            key={program.code}
            onClick={() => this.addAProgram(program)}
          >
            <div className="result-name pl-3">
              {program.program} - {program.code}
            </div>
            <div className="result-code pl-4">{program.type}</div>
          </div>
        );
      });
    } else {
      return <div id="no-results">No Results Found</div>;
    }
  }
  render() {
    return (
      <div className="search-section">
        <Field name="program-search" component={this.renderInput} />
        <div className="result-section mt-3">{this.renderResults()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    programResults: state.showProgrambar.programResults,
    programs: state.selectedPrograms.selectedPrograms,
    programRequirements: state.selectedPrograms.programRequirements,
  };
};

ProgramSearch = connect(mapStateToProps, {
  searchProgram,
  addProgram,
  hideProgrambar,
  fetchProgramRequirements,
})(ProgramSearch);

export default reduxForm({
  form: "ProgramSearch",
})(ProgramSearch);
