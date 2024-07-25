export const INITIAL_SELLER_STATE = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password:''
  };
  
  export const sellerReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_INPUT':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };

    
      default:
        return state;
    }
  };
  