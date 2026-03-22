import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const BASE_URL = "https://react-ecommerce-backend-1.onrender.com";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((apiProducts) => {
        setProducts(apiProducts);
      })
      .catch((err) => console.error("Product API Error:", err));
  }, []);

  return (
    <div className="product-background">
      <div className="container py-5">
        <h2 className="text-center text-white mb-4">
          League of Legends Products
        </h2>

        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h4 className="text-white text-center">
              Loading products...
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
