import React from 'react';
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from 'react-flow-renderer';

const foreignObjectSize = 40;

const onEdgeClick = (evt, data, func) => {
    evt.stopPropagation();
    func(data);
};

export default function CustomEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       data,
                                       arrowHeadType,
                                       markerEndId,
                                   }) {
    const { func } = data;
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                <button
                    className="edgebutton"
                    onClick={() => {
                        console.log(func)
                        console.log(data.query)
                        func(data.query)}}
                >
                    +
                </button>
                </body>
            </foreignObject>
        </>
    );
}