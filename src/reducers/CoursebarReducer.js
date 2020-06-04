export default (state = false, action) => {
  switch (action.type) {
    case "SHOW_COURSEBAR":
      return { ...state, showCoursebar: true };
    case "HIDE_COURSEBAR":
      return { ...state, showCoursebar: false };
    case "SEARCH_COURSE":
      return { ...state, courseResults: action.payload };
    default:
      return state;
  }
};
