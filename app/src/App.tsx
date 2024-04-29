import React from "react";
import { DvdComponent } from "./components/DvdDomponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>DVD Library</p>

        <DvdComponent />
      </header>
    </div>
  );
}

export default App;
