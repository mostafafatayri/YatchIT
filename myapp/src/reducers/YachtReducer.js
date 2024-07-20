// YachtReducer.js

export const INITIAL_STATE = {
    title: '',
    boatType: '',
    price: '',
    priceType: 'per day', // new field
    hours: 0, // new field
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    guests: 1,
    files: [],
    engine: '',
    torque: '',
    fuelSystem: '',
    boreStroke: '',
    fuelCap: '',
    capacity: '',
    fuelEconomy: '',
    weight: '',
    equipment: [],
  };
  
  export const boatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_INPUT':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case 'ADD_FILES':
        return {
          ...state,
          files: action.payload,
        };
      case 'REMOVE_FILE':
        return {
          ...state,
          files: state.files.filter(file => file !== action.payload),
        };
      case 'TOGGLE_EQUIPMENT':
        return {
          ...state,
          equipment: state.equipment.includes(action.payload)
            ? state.equipment.filter(item => item !== action.payload)
            : [...state.equipment, action.payload],
        };
      default:
        return state;
    }
  };
  

/*export const INITIAL_STATE = {
    title: "",
    boatType: "",
    price: 0,
    description: "",
    bedrooms: 0,
    bathrooms: 0, 
    guests: 1,
    files: ['hello',"test"],////[],
    engine: "",
    torque: "",
    fuelSystem: "",
    boreStroke: "",
    fuelCap: "",
    capacity: "",
    fuelEconomy: "",
    weight: "",
    equipment: []
  };
  
  export const boatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_FILES":
        return {
          ...state,
          files: [...state.files, ...action.payload],
        };
      case "REMOVE_FILE":
        return {
          ...state,
          files: state.files.filter(file => file !== action.payload),
        };
      case "TOGGLE_EQUIPMENT":
        return {
          ...state,
          equipment: state.equipment.includes(action.payload)
            ? state.equipment.filter(item => item !== action.payload)
            : [...state.equipment, action.payload],
        };
      default:
        return state;
    }
  };
  **/