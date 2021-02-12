import axios from "axios";

const API = {
  // Gets all Users
  getUsers: function() {
    return axios.get("/api/users/");
  },
  getUsersbyScheduled: function() {
    return axios.get("/api/users/scheduled");
  },
  // Gets the User with the given username
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  },
  updateUser: function(username, userdata) {
    return axios.put("/api/users/" + username, userdata);
  },
  // Deletes the User with the given username
  deleteUser: function(username) {
    return axios.delete("/api/users/" + username);
  },
  // Saves a User to the database
  createUser: function(userData) {
    return axios.post("/api/users/signup", userData);
  },
  signInUser: function(userData) {
    return axios.post("/api/users/signin", userData);
  },
  signOutUser: function() {
    return axios.post("/api/users/logout");
  }
};

export default API;
