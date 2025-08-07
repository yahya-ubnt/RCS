
import api from './api';

export const getBuildings = async () => {
  try {
    const response = await api.get('/buildings');
    return response.data;
  } catch (error) {
    console.error('Error fetching buildings:', error);
    throw error;
  }
};

export const getBuilding = async (id) => {
  try {
    const response = await api.get(`/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching building ${id}:`, error);
    throw error;
  }
};

export const createBuilding = async (buildingData) => {
  try {
    const response = await api.post('/buildings', buildingData);
    return response.data;
  } catch (error) {
    console.error('Error creating building:', error);
    throw error;
  }
};

export const updateBuilding = async (id, buildingData) => {
  try {
    const response = await api.put(`/buildings/${id}`, buildingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating building ${id}:`, error);
    throw error;
  }
};

export const deleteBuilding = async (id) => {
  try {
    const response = await api.delete(`/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting building ${id}:`, error);
    throw error;
  }
};
