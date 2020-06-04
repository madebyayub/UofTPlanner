import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { updateCourses } from "../../actions";
import _ from "lodash";

import Course from "../Course/Course";
import "../../stylesheets/yearsection.css";
import "../../stylesheets/year.css";

class Year extends React.Component {
  drop = (e) => {
    e.preventDefault();
    const course = JSON.parse(e.dataTransfer.getData("transfer"));
    this.addACourse(course);
  };
  allowDrop = (e) => {
    e.preventDefault();
  };
  addACourse(courseToAdd) {
    const year = this.props.label.split(" ")[1];
    let newRequirements = { ...this.props.programRequirements };
    switch (year) {
      case "One":
        if (_.isEmpty(newRequirements)) {
          newRequirements = {
            first: [courseToAdd],
            second: [],
            third: [],
            fourth: [],
          };
        } else {
          newRequirements.first = [...newRequirements.first, courseToAdd];
        }
        break;
      case "Two":
        if (_.isEmpty(newRequirements)) {
          newRequirements = {
            first: [],
            second: [courseToAdd],
            third: [],
            fourth: [],
          };
        } else {
          newRequirements.second = [...newRequirements.second, courseToAdd];
        }
        break;
      case "Three":
        if (_.isEmpty(newRequirements)) {
          newRequirements = {
            first: [],
            second: [],
            third: [courseToAdd],
            fourth: [],
          };
        } else {
          newRequirements.third = [...newRequirements.third, courseToAdd];
        }
        break;
      case "Four":
        if (_.isEmpty(newRequirements)) {
          newRequirements = {
            first: [],
            second: [],
            third: [],
            fourth: [courseToAdd],
          };
        } else {
          newRequirements.fourth = [...newRequirements.fourth, courseToAdd];
        }
        break;
      default:
        break;
    }
    this.props.updateCourses(newRequirements);
  }
  renderCourses(courses) {
    const set_courses = courses.set.map((course) => {
      return (
        <Course
          course={course}
          key={course.code}
          year={this.props.label.split(" ")[1]}
        />
      );
    });
    let i = 0;
    const optional_courses = courses.options.map((course) => {
      return (
        <Course
          option
          course={course}
          key={i++}
          year={this.props.label.split(" ")[1]}
        />
      );
    });
    return [...set_courses, ...optional_courses];
  }

  render() {
    return (
      <div className="year" onDrop={this.drop} onDragOver={this.allowDrop}>
        <div className="year-label mt-1 ml-3 mb-3">{this.props.label}</div>
        <ul className="list-courses">
          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.renderCourses(this.props.courses)}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    programRequirements: state.selectedPrograms.programRequirements,
  };
};

export default connect(mapStateToProps, { updateCourses })(Year);
