import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Lists from "./components/Lists";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Navbar />
        </header>
        <Route exact path="/" component={Lists} />
        <Route exact path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
