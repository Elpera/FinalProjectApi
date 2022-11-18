import http from "../http-common";

const getAll = () => {
  return http.get("/claims");
};

const get = (id) => {
  return http.get(`/claims/${id}`);
};

const create = (data) => {
  return http.post("/claims", data);
};

const update = (id, data) => {
  return http.put(`/claims/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/claims/${id}`);
};

const removeAll = () => {
  return http.delete(`/claims`);
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
