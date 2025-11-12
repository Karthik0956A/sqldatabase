import api from "./client";

export const addTime = (skillId, data) => api.post(`/time/${skillId}`, data);
export const listTime = (params={}) => api.get("/time", { params });
export const timeSummary = () => api.get("/time/summary");
