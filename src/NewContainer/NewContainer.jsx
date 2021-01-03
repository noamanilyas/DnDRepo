import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { EastDrop, WestDrop, NorthDrop, SouthDrop } from "./Drops";
import { ItemTypes } from "../ItemTypes";
import "../style.css";
export const NewContainer = ({ id, name, cbFunc }) => {
  const cbFuncDrops = (item, side) => {
    cbFunc(item, side, id);
  };
  // const [{ canDrop, isOver }, drop] = useDrop({
  //   accept: ItemTypes.BOX,
  //   drop(item, monitor) {
  //     const didDrop = monitor.didDrop();
  //     console.log("NewContainer", didDrop);
  //   },
  //   // drop: () => ({ name: 'Dustbin' }),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });

  // const isActive = canDrop && isOver;
  // let backgroundColor = "white";
  // let width = "3px";
  // if (isActive) {
  //   backgroundColor = "#00bcd466";
  //   width = "30px";
  // }
  console.log("NewContainer", id);

  return (
    <div className="drag vertical ph-table-row">
      <div className="ph-table">
        <div className="ph-table-row eowo">
          <WestDrop />
          <div className="ph-table-cell">
            <div className="ph-table noso">
              <div className="ph-table-row">
                <NorthDrop cbFunc={cbFuncDrops} />
              </div>
              <div className="ph-table-row">
                <div className="ph-table-cell data">I am new {name} container</div>
              </div>
              <div className="ph-table-row">
                <SouthDrop cbFunc={cbFuncDrops} />
              </div>
            </div>
          </div>
          <EastDrop />
        </div>
      </div>
    </div>
  );
};
