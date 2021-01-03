import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ShortId from "shortid";
import { useSelector, useDispatch } from "react-redux";

import { ACTIONS } from "./Store/Redux";
import { ItemTypes } from "./ItemTypes";
import { NewContainer } from "./NewContainer/NewContainer";
import "./style.css";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  // color: 'white',
  border: "dashed 1px green",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};
export const Dustbin = () => {
  const dispatch = useDispatch();
  const [hasDropped, setHasDropped] = useState(false);
  const [limit, setLimit] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [displayDataIds, setDisplayDataIds] = useState([]);

  const callbackFunction = (droppedItem, side, id) => {
    console.log("Dustbin DroppedItem", droppedItem);
    console.log("side", side);
    console.log("id", id);
    console.log("displayDataIds", displayDataIds);
    console.log("displayData", displayData);
    if (side === "south") {
      let key = ShortId.generate();
      setDisplayDataIds([...displayDataIds, key]);
      setDisplayData([...displayData, <NewContainer id={key} key={key} name={droppedItem.name} cbFunc={callbackFunction} />]);
    } else if (side === "north") {
      let key = ShortId.generate();
      setDisplayDataIds([key, ...displayDataIds]);
      setDisplayData([<NewContainer id={key} key={key} name={droppedItem.name} cbFunc={callbackFunction} />, ...displayData]);
    }
  };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      console.log("Dustbin", didDrop);
      // const didDrop = monitor.didDrop();
      // if (didDrop && !greedy) {
      // 	return;
      // }
      console.log(item);

      setHasDropped(true);
      // setLimit(1);
      let key = ShortId.generate();
      setDisplayDataIds([...displayDataIds, key]);
      setDisplayData([...displayData, <NewContainer id={key} key={key} name={item.name} cbFunc={callbackFunction} />]);
      dispatch({
        type: ACTIONS.SAVE_CONTAINER,
        payload: {
          key: key,
          container: <NewContainer id={key} key={key} name={item.name} cbFunc={callbackFunction} />,
        },
      });
      // setHasDroppedOnChild(didDrop);
      // console.log(displayData);
    },
    canDrop(props, monitor) {
      if (!limit) {
        return true;
      }
      return false;
    },
    // drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div className="centered">
      <div className="ph-table-row">
        <div className="ph-table-cell">
          <div id="drop" className="drop" ref={drop} style={{ ...style, backgroundColor }}>
            {isActive ? "Release to drop" : "Drag a box here"}
            {hasDropped && displayData}
          </div>
        </div>
      </div>
    </div>
  );
};
