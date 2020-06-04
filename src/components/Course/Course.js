import React from "react";
import { connect } from "react-redux";
import { updateCourses, hideCoursebar, showCoursebar } from "../../actions";

class Course extends React.Component {
  drag = (e) => {
    this.props.hideCoursebar();
    e.dataTransfer.setData("transfer", JSON.stringify(this.props.course));
  };
  noAllowDrop = (e) => {
    e.stopPropagation();
  };
  drop = (e) => {
    e.preventDefault();
    const course = JSON.parse(e.dataTransfer.getData("transfer"));
    this.props.course = course;
    this.props.option = false;
  };
  allowDrop = (e) => {
    e.preventDefault();
  };
  removeACourse(courseToRemove, option) {
    const year = this.props.year;
    const newRequirements = { ...this.props.programRequirements };
    switch (year) {
      case "One":
        if (!option) {
          newRequirements.first = newRequirements.first.filter(
            (course) => course.code !== courseToRemove.code
          );
        } else {
          newRequirements.options.first_options = newRequirements.options.first_options.filter(
            (course) => course !== courseToRemove
          );
        }
        break;
      case "Two":
        if (!option) {
          newRequirements.second = newRequirements.second.filter(
            (course) => course.code !== courseToRemove.code
          );
        } else {
          newRequirements.options.second_options = newRequirements.options.second_options.filter(
            (course) => course !== courseToRemove
          );
        }
        break;
      case "Three":
        if (!option) {
          newRequirements.third = newRequirements.third.filter(
            (course) => course.code !== courseToRemove.code
          );
        } else {
          newRequirements.options.third_options = newRequirements.options.third_options.filter(
            (course) => course !== courseToRemove
          );
        }
        break;
      case "Four":
        if (!option) {
          newRequirements.fourth = newRequirements.fourth.filter(
            (course) => course.code !== courseToRemove.code
          );
        } else {
          newRequirements.options.fourth_options = newRequirements.options.fourth_options.filter(
            (course) => course !== courseToRemove
          );
        }
        break;
      default:
        break;
    }
    this.props.updateCourses(newRequirements);
  }
  renderTitle(courses) {
    let title = "";
    if (courses.length > 1) {
      for (let i = 0; i < courses.length; i++) {
        title = title + courses[i];
        if (i < courses.length - 1) {
          title = title + "/";
        }
      }
    } else {
      title = courses[0];
    }
    return title;
  }
  render() {
    if (this.props.search) {
      return (
        <li
          id={this.props.course.code}
          className="course-container mx-2 mb-2 py-2 px-2"
          draggable="true"
          onDragStart={this.drag}
          onDragOver={this.noAllowDrop}
        >
          <div className="info-course ml-1">
            <i className="fas fa-info-circle"></i>
          </div>
          <div className="course-title">{this.props.course.name}</div>
          <div className="course-code">{this.props.course.code}</div>
        </li>
      );
    } else if (this.props.option) {
      return (
        <li className="course-container mx-2 mb-2 py-2 px-2">
          <div className="remove-course ml-1">
            <i
              className="fas fa-minus-circle"
              onClick={() => this.removeACourse(this.props.course, true)}
            ></i>
          </div>
          <div className="course-title option">
            {this.renderTitle(this.props.course)}
          </div>
          <div className="course-code option">A Decision Is Required</div>
          <div
            className="add-course-option mt-2"
            onClick={this.props.showCoursebar}
          >
            Add A Course
          </div>
        </li>
      );
    } else {
      return (
        <li className="course-container mx-2 mb-2 py-2 px-2">
          <div className="remove-course ml-1">
            <i
              className="fas fa-minus-circle"
              onClick={() => this.removeACourse(this.props.course, false)}
            ></i>
          </div>
          <div className="course-title">{this.props.course.name}</div>
          <div className="course-code">{this.props.course.code}</div>
        </li>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    programRequirements: state.selectedPrograms.programRequirements,
  };
};

export default connect(mapStateToProps, {
  updateCourses,
  hideCoursebar,
  showCoursebar,
})(Course);
