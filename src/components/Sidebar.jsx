import { useState, useEffect } from "react";

function Sidebar() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
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