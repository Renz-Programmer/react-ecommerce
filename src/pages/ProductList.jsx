import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const BASE_URL = "https://react-ecommerce-backend-1.onrender.com";

function ProductList({ search }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Fetch Error:", error));
  }, []);

  // 🔍 SEARCH (name + category)
  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // 📂 CATEGORY FILTER
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      product => product.category === category
    );
  }

  // 🔃 SORT
  if (sort === "priceLowHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "priceHighLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  // 📂 Unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="product-background d-flex flex-column min-vh-100">
      <div className="container flex-grow-1 py-5">

        <h2 className="mb-4 text-center text-white">
          League of Legends Products
        </h2>

        {/* FILTER BAR */}
        <div className="row mb-4 g-2">

          {/* Category */}
          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="col-md-4">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-md-4">
            <button
              className="btn btn-light w-100"
              onClick={() => {
                setCategory("all");
                setSort("");
              }}
            >
              Reset Filters
            </button>
          </div>

        </div>

        {/* PRODUCTS */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h4 className="text-center text-white mt-4">
              No Item Available At the Moment
            </h4>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductList;
