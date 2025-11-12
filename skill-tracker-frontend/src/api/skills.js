import api from "./client";

export const listSkills = (params={}) => api.get("/skills", { params });
export const createSkill = (data) => api.post("/skills", data);
export const updateSkill = (id, data) => api.patch(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const groupByStatus = () => api.get("/skills/group/status");
export const groupByCategory = () => api.get("/skills/group/category");
export const groupByConfidence = () => api.get("/skills/group/confidence");
