export const INITIAL_SELLER_STATE = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    yearsOfExperience: '', // New field for years of experience
    boatIds: [], // List of boats the seller owns
    profilePhoto: null, // Profile photo of the seller
    password:''
  };
  
  export const sellerReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_INPUT':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case 'ADD_BOAT_ID':
        return {
          ...state,
          boatIds: [...state.boatIds, action.payload],
        };
      case 'REMOVE_BOAT_ID':
        return {
          ...state,
          boatIds: state.boatIds.filter(id => id !== action.payload),
        };
      case 'SET_PROFILE_PHOTO':
        return {
          ...state,
          profilePhoto: action.payload,
        };
      case 'SET_YEARS_OF_EXPERIENCE':
        return {
          ...state,
          yearsOfExperience: action.payload,
        };
      default:
        return state;
    }
  };
  