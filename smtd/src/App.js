import "./App.css";
import Lists from "./components/Lists";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Navbar setName={setName} name={name} />
        </header>
        <Route
          exact
          path="/"
          render={(props) => <Lists {...props} name={name} />}
        />
        <Route exact path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
