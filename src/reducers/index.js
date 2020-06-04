import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import AuthReducer from "./AuthReducer";
import CoursebarReducer from "./CoursebarReducer";
import ProgrambarReducer from "./ProgrambarReducer";
import ProgramsReducer from "./ProgramsReducer";
import CourseDetailReducer from "./CourseDetailReducer";

export default combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  showCoursebar: CoursebarReducer,
  showProgrambar: ProgrambarReducer,
  selectedPrograms: ProgramsReducer,
  courseDetail: CourseDetailReducer,
});
