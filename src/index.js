import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider as ReduxProvider } from "react-redux";
import { createReduxStore } from "./Store/Redux";
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <ReduxProvider store={createReduxStore()}>
          <Example />
        </ReduxProvider>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
