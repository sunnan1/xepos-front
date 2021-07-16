import Api from "./api";

export default {
  getCookie() {
    return Api.get("/sanctum/csrf-cookie");
  }
};