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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://backend-newapp-production.up.railway.app/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      await res.json();
      navigate("/");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>✏️ Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;
