import "./App.css";
import Lists from "./components/Lists";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
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
          render={(props) => <Lists {...props} setName={setName} />}
        />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} name={name} setName={setName} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
