import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Lists from "./components/Lists";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Search />
      <Lists />
    </div>
  );
}

export default App;
