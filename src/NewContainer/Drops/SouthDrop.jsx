import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import "../../style.css";
export const SouthDrop = ({ name, cbFunc }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      console.log(item);
      cbFunc(item, "south");
    },
    // drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  let height = "3px";
  if (isActive) {
    backgroundColor = "#00bcd466";
    height = "30px";
  }
  // else if (canDrop) {
  //   backgroundColor = "yellow";
  // }

  return <div ref={drop} style={{ backgroundColor, height }} className="ph-table-cell south ns drop s"></div>;
};
