import uoftAPI from "../api/UofTAPI";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
export const displayCourseDetail = (course) => {
  return {
    type: "SHOW_DETAIL",
    payload: course,
  };
};
export const hideCourseDetail = () => {
  return {
    type: "HIDE_DETAIL",
  };
};
export const showProgrambar = () => {
  return {
    type: "SHOW_PROGRAMBAR",
  };
};
export const hideProgrambar = () => {
  return {
    type: "HIDE_PROGRAMBAR",
  };
};
export const showCoursebar = () => {
  return {
    type: "SHOW_COURSEBAR",
  };
};
export const hideCoursebar = () => {
  return {
    type: "HIDE_COURSEBAR",
  };
};
export const updateCourses = (newRequirements) => {
  return {
    type: "UPDATE_COURSES",
    payload: newRequirements,
  };
};
export const searchCourse = (course) => {
  return async (dispatch) => {
    const response = await uoftAPI.get(`/courses/${course}`);
    dispatch({ type: "SEARCH_COURSE", payload: response.data });
  };
};
export const initPrograms = () => {
  return {
    type: "INITIALIZE_PROGRAMS",
  };
};
export const searchProgram = (program) => {
  return async (dispatch) => {
    const response = await uoftAPI.get(`/programs/${program}`);
    dispatch({ type: "SEARCH_PROGRAM", payload: response.data });
  };
};
export const addProgram = (program) => {
  return {
    type: "ADD_PROGRAM",
    payload: program,
  };
};
export const removeProgram = (program) => {
  return {
    type: "REMOVE_PROGRAM",
    payload: program,
  };
};
export const fetchProgramRequirements = (programs, prev) => {
  return async (dispatch) => {
    let first = [...prev.first],
      second = [...prev.second],
      third = [...prev.third],
      fourth = [...prev.fourth],
      first_options = prev.options ? [...prev.options.first_options] : [],
      second_options = prev.options ? [...prev.options.second_options] : [],
      third_options = prev.options ? [...prev.options.third_options] : [],
      fourth_options = prev.options ? [...prev.options.fourth_options] : [];
    for (let i = 0; i < programs.length; i++) {
      let program = programs[i];
      const first_response = await uoftAPI.get(
        `/program/requirements/first/${program.code}`
      );
      first = [...first, ...first_response.data.set];
      first_options = [...first_options, ...first_response.data.options];
      const second_response = await uoftAPI.get(
        `/program/requirements/second/${program.code}`
      );
      second = [...second, ...second_response.data.set];
      second_options = [...second_options, ...second_response.data.options];
      const third_response = await uoftAPI.get(
        `/program/requirements/third/${program.code}`
      );
      third = [...third, ...third_response.data.set];
      third_options = [...third_options, ...third_response.data.options];
      const fourth_response = await uoftAPI.get(
        `/program/requirements/fourth/${program.code}`
      );
      fourth = [...fourth, ...fourth_response.data.set];
      fourth_options = [...fourth_options, ...fourth_response.data.options];
    }
    dispatch({
      type: "FETCH_PROGRAM_REQUIREMENTS",
      payload: {
        first: first,
        second: second,
        third: third,
        fourth: fourth,
        options: {
          first_options,
          second_options,
          third_options,
          fourth_options,
        },
      },
    });
  };
};
