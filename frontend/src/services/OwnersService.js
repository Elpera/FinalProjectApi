import http from "../http-common";

const getAll = () => {
  return http.get("/owners/all");
};

const get = (id) => {
  return http.get(`/owners/${id}`);
};

const create = (data) => {
  return http.post("/owners", data);
};

const update = (id, data) => {
  return http.put(`/owners/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/owners/${id}`);
};

const removeAll = () => {
  return http.delete(`/owners`);
};

const OwnerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default OwnerService;
