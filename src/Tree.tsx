// Tree - A Recursive react component
// The Tree component that calls itself until its
// exhausted of objects in the tree
// Can be optimized and refactored a bit
import React, { useState } from "react";
import { JsonArray } from "./JsonArrayClass";

interface Props {
  data: JsonArray;
}

export const Tree = ({ data, ...props }: Props) => {
  return (
    <div className="group">
      {data.map((item, idx) => {
        const isObject = item.type === "object";
        return (
          <div key={item.path} className="child node-row">
            <div className="row-items">
              <span
                className="checkbox"
                style={{
                  transform: `translate(-${item.level * 32 + 32}px, 2px)`,
                }}
              >
                <input type={"checkbox"} />
              </span>
              <span
                className="plus"
                onClick={(e) => {
                  data.addSubNode(idx);
                }}
              >
                {"➕"}
              </span>
              <input
                value={item.key}
                onChange={(e) => {
                  data.updateNode(idx, e.target.value);
                }}
              />
              <input
                value={isObject ? "Object" : item.value}
                disabled={isObject}
                onChange={(e) => {
                  data.updateNode(idx, undefined, e.target.value);
                }}
              />
              <span onClick={() => data.deleteNode(idx)}>🗑</span>
            </div>
            {isObject && <Tree data={item.value} {...props} />}
          </div>
        );
      })}
    </div>
  );
};
