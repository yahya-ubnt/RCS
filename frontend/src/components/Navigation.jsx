
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/agents">Agents</Link>
        </li>
        <li>
          <Link to="/buildings">Buildings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
