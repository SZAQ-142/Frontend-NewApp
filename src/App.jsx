import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddItem from "./components/AddItem.jsx";
import EditItem from "./components/EditItem.jsx";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="container">
      <header className="header">📦 My Item Manager</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home items={items} setItems={setItems} />} />
        <Route path="/add" element={<AddItem onItemAdded={addItem} />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </div>
  );
}

export default App;