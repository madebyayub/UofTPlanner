import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { hideCourseDetail, displayCourseDetail } from "../../actions";
import "../../stylesheets/coursedetail.css";

Modal.setAppElement("#root");

class CourseDetailModal extends React.Component {
  componentDidMount() {
    this.props.hideCourseDetail();
  }
  renderOptionsPrereqs(list) {
    let buffer = "";
    for (let i = 0; i < list.length; i++) {
      if (!Array.isArray(list[i])) {
        buffer = buffer + list[i] + `${i === list.length - 1 ? "" : "/"}`;
      } else {
        buffer = buffer + "(" + this.renderPrereqs(list[i]) + ")";
      }
    }
    return buffer;
  }
  renderPrereqs(prerequisites) {
    let buffer = "";
    if (prerequisites.length === 0) {
      return buffer + "None";
    } else {
      for (let i = 0; i < prerequisites.length; i++) {
        if (Array.isArray(prerequisites[i])) {
          if (i === prerequisites.length - 1) {
            buffer = buffer + this.renderOptionsPrereqs(prerequisites[i]);
          } else {
            buffer =
              buffer + this.renderOptionsPrereqs(prerequisites[i]) + ", ";
          }
        } else if (i === prerequisites.length - 1) {
          buffer = buffer + prerequisites[i];
        } else {
          buffer = buffer + prerequisites[i] + ", ";
        }
      }
      return buffer;
    }
  }
  render() {
    if (this.props.courseDetail && this.props.courseDetail.course) {
      return (
        <Modal
          isOpen={
            this.props.courseDetail ? this.props.courseDetail.showDetail : false
          }
          onRequestClose={this.props.hideCourseDetail}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
            content: {
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
              backgroundColor: "rgba(255,255,255,0.9)",
              width: "60%",
              height: "70vh",
              margin: "auto",
            },
          }}
        >
          <div className="modal-container">
            <div className="modal-course-title">
              <span
                className="float-right close-modal px-3"
                onClick={this.props.hideCourseDetail}
              >
                <i class="fas fa-times"></i>
              </span>
              {this.props.courseDetail.course.name}
            </div>
            <div className="modal-course-code mt-1">
              {this.props.courseDetail.course.code}
            </div>
            <div className="modal-course-description mt-3">
              {this.props.courseDetail.course.description}
            </div>
            <div className="modal-course-prereqs mt-4">
              Prerequisites:{" "}
              {this.renderPrereqs(this.props.courseDetail.course.prerequisites)}
            </div>
          </div>
        </Modal>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    courseDetail: state.courseDetail.courseDetail,
  };
};

export default connect(mapStateToProps, {
  displayCourseDetail,
  hideCourseDetail,
})(CourseDetailModal);
