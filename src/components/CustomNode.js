import { memo, useCallback } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
 
const CustomNode = ({ id, data, removeElements }) => {
  return (
    <>

      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <a className="delete-btn" >X</a>
      </NodeToolbar>
 
      <div className='custom-node'>
        {data.label}
      </div>
 
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
 
export default memo(CustomNode);