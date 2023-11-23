export const ADD_NOTE = "ADD_NOTE";
import axios from "axios";
export function addNote(payload) {
console.log(payload,"actions")
  return async function (dispatch) {
    try {
      await axios.post(
        'http://localhost:3002/api/addNote',
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };
}
