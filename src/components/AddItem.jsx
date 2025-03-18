import { useState } from "react";

function AddItem({ onItemAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // Debugging: Log API URL
  console.log("API_URL:", API_URL);

  if (!API_URL) {
    console.error("❌ REACT_APP_API_URL is not defined in .env file!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();
      onItemAdded(newItem);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add Item</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "auto",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddItem;