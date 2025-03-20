import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.jsx";
import AddItem from "./components/AddItem.jsx";
import EditItem from "./components/EditItem.jsx";

function App() {
  const [items, setItems] = useState([]);

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemUpdated = (updatedItem) => {
    setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
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
        <Route path="/add" element={<AddItem onItemAdded={handleItemAdded} />} />
        <Route path="/edit/:id" element={<EditItem onItemUpdated={handleItemUpdated} />} />
      </Routes>
    </div>
  );
}

export default App;