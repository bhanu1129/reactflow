import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import "../App.css";

import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const initialEdges = [{ id: "1-2", source: "1", target: "2" }];
const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 20, y: 80 },
    type: "custom",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 200 },
    type: "custom",
  },
];

const Home = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const createNode = () => {
    setNodes((ns) => [
      ...ns,
      {
        id: (ns.length + 1).toString(),
        data: { label: "New Node" },
        position: {
          x: "150",
          y: "10",
        },
        type: "custom",
      },
    ]);
  };

  const handleTitleChange = (event) => {
    setSelectedNode((node) => ({
      ...node,
      data: { ...node.data, label: event.target.value },
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setNodes((ns) =>
      ns.map((n) => (n.id === selectedNode.id ? selectedNode : n))
    );
    setSelectedNode(null);
  };

  return (
    <div className="main-app">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        nodeTypes={nodeTypes}
        // fitView
      >
        <Background />
        <Controls />
        <MiniMap pannable zoomable />
        {selectedNode && (
          <Panel position="top-right">
            <div className="text-update">
              <form onSubmit={handleSave}>
                <label htmlFor="change">Node title:</label>
                <hr />
                <input
                  id="change"
                  type="text"
                  value={selectedNode.data.label}
                  onChange={handleTitleChange}
                />
                <br />
                <button type="submit">Save</button>
              </form>
            </div>
          </Panel>
        )}
        <Panel position="top-left">
          <a onClick={createNode} className="create-btn">
            Create Node
          </a>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Home;
