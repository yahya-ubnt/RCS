
import api from './api';

export const getAgents = async () => {
  try {
    const response = await api.get('/agents');
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};

export const getAgent = async (id) => {
  try {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent ${id}:`, error);
    throw error;
  }
};

export const createAgent = async (agentData) => {
  try {
    const response = await api.post('/agents', agentData);
    return response.data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
};

export const updateAgent = async (id, agentData) => {
  try {
    const response = await api.put(`/agents/${id}`, agentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating agent ${id}:`, error);
    throw error;
  }
};

export const deleteAgent = async (id) => {
  try {
    const response = await api.delete(`/agents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting agent ${id}:`, error);
    throw error;
  }
};
