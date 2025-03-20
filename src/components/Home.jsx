import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ items, setItems }) {
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("https://backend-newapp-production.up.railway.app/api/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    await fetch(`https://backend-newapp-production.up.railway.app/api/items/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(error => console.error("Error deleting item:", error));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🛍️ Items List</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item._id}>
              <p><strong>{item.name}</strong></p>
              <p>{item.description || "No description available."}</p>
              <Link to={`/edit/${item._id}`}>✏️ Edit</Link>
              <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;