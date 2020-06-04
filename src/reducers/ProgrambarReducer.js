export default (state = {}, action) => {
  switch (action.type) {
    case "SHOW_PROGRAMBAR":
      return { ...state, showProgrambar: true };
    case "HIDE_PROGRAMBAR":
      return { ...state, showProgrambar: false };
    case "SEARCH_PROGRAM":
      return { ...state, programResults: action.payload };
    default:
      return state;
  }
};
