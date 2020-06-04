export default (state = [], action) => {
  switch (action.type) {
    case "ADD_PROGRAM":
      return {
        ...state,
        selectedPrograms: [...state.selectedPrograms, action.payload],
      };
    case "REMOVE_PROGRAM":
      return {
        ...state,
        selectedPrograms: state.selectedPrograms.filter(
          (program) => program !== action.payload
        ),
      };
    case "INITIALIZE_PROGRAMS":
      return {
        ...state,
        selectedPrograms: [],
      };
    case "FETCH_PROGRAM_REQUIREMENTS":
      return {
        ...state,
        programRequirements: action.payload,
      };
    case "UPDATE_COURSES":
      return {
        ...state,
        programRequirements: action.payload,
      };
    default:
      return state;
  }
};
