
import React from 'react';

const BuildingMap = ({ buildings, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Building List</h2>
      <ul>
        {buildings.map((building) => (
          <li key={building._id}>
            <div>
              <strong>{building.name}</strong>
              <p>{building.address}</p>
            </div>
            <div>
              <button onClick={() => onEdit(building)}>Edit</button>
              <button onClick={() => onDelete(building._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingMap;
