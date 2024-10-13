// src/ContextMenu.tsx
import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onOpenForm: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onOpenForm }) => {
  return (
    <div style={{ position: 'absolute', top: y, left: x, backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
      <button onClick={onOpenForm}>Add Location</button>
    </div>
  );
};

export default ContextMenu;
