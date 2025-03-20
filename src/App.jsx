import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddItem from "./components/AddItem.jsx";
import EditItem from "./components/EditItem.jsx";

function App() {
  return (
    <div className="container">
      <header className="header">📦 My Item Manager</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </div>
  );
}

export default App;
