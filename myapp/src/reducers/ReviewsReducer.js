// modalReducer.js
export const initialState = {
    show: false,
    rating: 0,
    feedback: '',
    userId: '',
    yachtId:'',
  };
  
  export const modalReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_MODAL':
        return { ...state, show: true };
     case 'SET_YACHT_ID':
      return {
        ...state,
        yachtId: action.payload,
      };
      case 'SET_USER_ID':
        return {
          ...state,
          userId: action.payload,
        };
      case 'HIDE_MODAL':
        return { ...state, show: false };
      case 'SET_RATING':
        return { ...state, rating: action.payload };
      case 'SET_FEEDBACK':
        return { ...state, feedback: action.payload };
      case 'SUBMIT_REVIEW':
        return { ...initialState }; // Reset the state on submit
      default:
        return state;
    }
  };
  