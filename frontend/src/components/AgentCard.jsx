
import React from 'react';

const AgentCard = ({ agent, onEdit, onDelete }) => {
  return (
    <div className="agent-card">
      <h3>{agent.name}</h3>
      <p>{agent.email}</p>
      <p>{agent.phone}</p>
      <div>
        <button onClick={() => onEdit(agent)}>Edit</button>
        <button onClick={() => onDelete(agent._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AgentCard;
