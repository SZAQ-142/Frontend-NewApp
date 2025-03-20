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
  }, [setItems]);

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`https://backend-newapp-production.up.railway.app/api/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ Items List</h2>
      {items.length === 0 ? (
        <p style={styles.noItems}>No items found.</p>
      ) : (
        <div style={styles.itemList}>
          {items.map(item => (
            <div key={item._id} style={styles.itemCard}>
              <p><strong>{item.name}</strong></p>
              <p>{item.description || "No description available."}</p>
              <div style={styles.buttons}>
                <Link to={`/edit/${item._id}`} style={styles.editButton}>✏️ Edit</Link>
                <button onClick={() => deleteItem(item._id)} style={styles.deleteButton}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  noItems: {
    fontSize: "18px",
    color: "gray",
  },
  itemList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  itemCard: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  editButton: {
    textDecoration: "none",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;
