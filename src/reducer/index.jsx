import { ADD_NOTE } from "./actions";

const initialState = {
  allTurnos: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state
      };
  }
}

export default rootReducer;
