export const chatInitialState = {
  messages: [],
  user: null,
  token: null,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    case 'EMPTY_MESSAGES':
      return {
        ...state,
        messages: [],
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default chatReducer;
