
import React, { useState, useEffect } from 'react';
import { getBuildings, createBuilding, updateBuilding, deleteBuilding } from '../services/buildingService';
import useForm from '../hooks/useForm';
import BuildingMap from '../components/BuildingMap';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const { values, handleChange, setValues, resetForm } = useForm({ name: '', address: '' });

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildings();
        setBuildings(data);
      } catch (error) {
        // Handle error
      }
    };
    fetchBuildings();
  }, []);

  const handleEdit = (building) => {
    setSelectedBuilding(building);
    setValues(building);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBuilding(id);
      setBuildings(buildings.filter((b) => b._id !== id));
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBuilding) {
        const updatedBuilding = await updateBuilding(selectedBuilding._id, values);
        setBuildings(buildings.map((b) => (b._id === selectedBuilding._id ? updatedBuilding : b)));
      } else {
        const newBuilding = await createBuilding(values);
        setBuildings([...buildings, newBuilding]);
      }
      resetForm();
      setSelectedBuilding(null);
    } catch (error) { 
      // Handle error
    }
  };

  return (
    <div>
      <h1>Buildings</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Building Name" />
        <input type="text" name="address" value={values.address} onChange={handleChange} placeholder="Address" />
        <button type="submit">{selectedBuilding ? 'Update' : 'Create'}</button>
      </form>
      <BuildingMap buildings={buildings} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Buildings;
