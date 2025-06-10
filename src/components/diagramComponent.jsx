import {
    addEdge,
    applyEdgeChanges, applyNodeChanges,
    Background,
    Controls,
    MiniMap, Panel,
    ReactFlow, ReactFlowProvider,
    useEdgesState,
    useNodesState, useReactFlow
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import React, {useCallback, useEffect} from "react";
import ButtonEdge from './ButtonEdge';

function DiagramComponentChild(props) {
    const [nodes, setNodes] = useNodesState(props.nodes);
    const [edges, setEdges] = useEdgesState(props.edges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const edgeTypes = {
        buttonedge: ButtonEdge,
    };

    // useEffect(() => {
    //     applyNodeChanges(nodes, nodes)
    // }, [nodes])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                edgeTypes={edgeTypes}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
                <Panel position="top-right">
                    <button className="xy-theme__button" onClick={() => props.generate()}>
                        Начать работу
                    </button>
                    <button className="xy-theme__button" onClick={() => props.newCon()}>
                        Новое подключение
                    </button>
                    <button className="xy-theme__button" onClick={() => props.links()}>
                        Поиск связей
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    )
}

function DiagramComponent(props) {
    return (
        <ReactFlowProvider>
            <DiagramComponentChild {...props} />
        </ReactFlowProvider>
    );
}

export default DiagramComponentChild;