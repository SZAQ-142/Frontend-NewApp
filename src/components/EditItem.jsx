import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`https://backend-newapp-production.up.railway.app/api/items/${id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchItem();
  }, [id]);
  

  const handleSubmit =async (e) => {
    e.preventDefault();

    await fetch(`https://backend-newapp-production.up.railway.app/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update item");
        return res.json();
      })
      .then(() => navigate("/")) // Redirect to home after update
      .catch((error) => console.error("Error updating item:", error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✏️ Edit Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.updateButton}>Update Item</button>
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
  updateButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EditItem;
