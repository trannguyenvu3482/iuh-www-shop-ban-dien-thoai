import instance from "./axios/instance";

export const getCategoryById = async (id) => {
  return await instance.get(`/categories/${id}`);
};
export const getCategories = async () => {
  return await instance.get("/categories");
};
