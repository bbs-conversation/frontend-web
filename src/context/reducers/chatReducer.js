export const chatInitialState = {
  messages: [],
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
    default:
      return state;
  }
};

export default chatReducer;
