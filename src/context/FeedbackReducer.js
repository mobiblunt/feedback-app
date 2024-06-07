const feedbackReducer = (state, action) => {
    switch (action.type) {
      case 'GET_FEEDBACK':
        return { ...state, feedback: action.payload, loading: false };
      case 'ADD_FEEDBACK':
        return { ...state, feedback: [...state.feedback, action.payload] };
      case 'UPDATE_FEEDBACK':
        return { ...state, feedback: state.feedback.map((item) => (item.id === action.payload.id ? action.payload : item)) };
      case 'DELETE_FEEDBACK':
        return { ...state, feedback: state.feedback.filter((item) => item.id !== action.payload.id) };
      default:
        return state;
    }
  };

export default feedbackReducer