import { Link } from "react-router-dom";
import AddItem from "./AddItem";

function Home() {
  const [items, setItems] = useState([]);

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

  const addNewItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div>
      <h2>🛍️ Items List</h2>
      <AddItem onItemAdded={addNewItem} /> {/* Pass function here */}
      {items.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
          <Link to={`/edit/${item._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}
