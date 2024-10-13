import React from 'react';
import './ContextMenu.css'; // Import the new stylesheet

interface ContextMenuProps {
  x: number;
  y: number;
  onAddLocation: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onAddLocation }) => {
  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
    >
      <button onClick={onAddLocation}>Add Location</button>
    </div>
  );
};

export default ContextMenu;
