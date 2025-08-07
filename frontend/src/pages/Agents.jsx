
import React, { useState, useEffect } from 'react';
import { getAgents, createAgent, updateAgent, deleteAgent } from '../services/agentService';
import useForm from '../hooks/useForm';
import AgentCard from '../components/AgentCard';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { values, handleChange, setValues, resetForm } = useForm({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();
        setAgents(data);
      } catch (error) {
        // Handle error
      }
    };
    fetchAgents();
  }, []);

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setValues(agent);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAgent(id);
      setAgents(agents.filter((a) => a._id !== id));
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAgent) {
        const updatedAgent = await updateAgent(selectedAgent._id, values);
        setAgents(agents.map((a) => (a._id === selectedAgent._id ? updatedAgent : a)));
      } else {
        const newAgent = await createAgent(values);
        setAgents([...agents, newAgent]);
      }
      resetForm();
      setSelectedAgent(null);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Agents</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Agent Name" />
        <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={values.phone} onChange={handleChange} placeholder="Phone" />
        <button type="submit">{selectedAgent ? 'Update' : 'Create'}</button>
      </form>
      <div className="agent-list">
        {agents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Agents;
