import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://localhost:4499/api/",
  withCredentials: true,
  
});
//this is a build in function for axios to build our connection to
// the server with a single class {baseURL ==> were is the server} and if we need to have credentials

export default newRequest;
// we will be calling them for every time we need to do a server connection 