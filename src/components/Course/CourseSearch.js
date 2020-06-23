import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import Course from "./Course";
import { searchCourse } from "../../actions";
import "../../stylesheets/coursebar.css";

class CourseSearch extends React.Component {
  renderInput = (formProps) => {
    if (formProps.input.value.length >= 0) {
      this.searchInput(formProps.input.value);
    }
    return (
      <input
        className="form-control form-control-lg mx-3"
        type="text"
        placeholder="Search by course code"
        autoComplete="off"
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
    );
  };
  searchInput = (course) => {
    this.props.searchCourse(course);
  };
  renderResults() {
    if (this.props.courseResults && this.props.courseResults.length > 0) {
      return this.props.courseResults.map((course) => {
        return <Course key={course.code} course={course} search />;
      });
    } else {
      return <div id="no-results">No Results Found</div>;
    }
  }
  render() {
    return (
      <div className="search-section">
        <Field name="course-search" component={this.renderInput} />
        <ul className="result-section mt-3">{this.renderResults()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { courseResults: state.showCoursebar.courseResults };
};

CourseSearch = connect(mapStateToProps, { searchCourse })(CourseSearch);

export default reduxForm({
  form: "CourseSearch",
})(CourseSearch);
