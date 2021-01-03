import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemTypes";
import "../../style.css";
export const WestDrop = ({ name, cbFunc }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      console.log(item);
      cbFunc(item);
    },
    // drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  let width = "3px";
  if (isActive) {
    backgroundColor = "#00bcd466";
    width = "30px";
  }

  return <div ref={drop} style={{ backgroundColor, width }} className="ph-table-cell west drop we s"></div>;
};
