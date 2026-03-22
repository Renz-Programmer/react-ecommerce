import { useState, useEffect } from "react";

const BASE_URL = "https://react-ecommerce-backend-1.onrender.com";

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="p-3 bg-dark text-white">
      <h4>Categories</h4>

      <ul className="list-group">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
