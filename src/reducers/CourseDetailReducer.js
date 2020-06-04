export default (state = {}, action) => {
  switch (action.type) {
    case "SHOW_DETAIL":
      return {
        ...state,
        courseDetail: { showDetail: true, course: action.payload },
      };
    case "HIDE_DETAIL":
      return { ...state, courseDetail: { showDetail: false, course: null } };
    default:
      return state;
  }
};
