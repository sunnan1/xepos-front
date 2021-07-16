import Api from "./api";
import Csrf from "./csrf";

export default {
  async register(form) {
    await Csrf.getCookie();
    return Api.post("/register", form);
  },

  async login(form) {
    await Csrf.getCookie();
    return Api.post("/login", form);
  },

  async logout() {
    await Csrf.getCookie();
    return Api.post("/logout");
  },
  auth() {
    return Api.get("/api/user");
  },
  getCompanies(page) {
    return Api.get(`/api/company?page=${page}`);
  },
  allCompanies() {
    return Api.get(`/api/all-companies`);
  },
  getEmployees(page) {
    return Api.get(`/api/employee?page=${page}`);
  },
  deletecompany(id) {
    return Api.delete(`/api/company/${id}`);
  },
  deleteEmployee(id) {
    return Api.delete(`/api/employee/${id}`);
  },
  saveCompany(data , headers) {
    return Api.post(`/api/company` , data , {
      headers : headers
    });
  },
  saveEmployee(data) {
    return Api.post(`/api/employee` , data);
  },
  logout() {
    return Api.post("/api/logout");
  }
};