import axios from "axios";

export const getNotes = () =>
  axios.get("http://localhost:3001/notes").then((res) => {
    //! logical code here showing loding data
    // for (let i = 0; i < 1000000000; i++) {}
    return res.data;
  });
