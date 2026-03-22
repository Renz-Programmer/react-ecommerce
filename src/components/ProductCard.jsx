import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://react-ecommerce-backend-1.onrender.com";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some(
    item => item.id === product.id
  );

  // Toggle wishlist + add to cart + go to cart
  const handleWishlistClick = () => {
    toggleWishlist(product);
    addToCart(product);
    navigate("/cart");
  };

  // Add to cart only
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center p-3 position-relative bg-white text-dark">

        {/* ❤️ Wishlist Button */}
        <button
          className={`btn position-absolute top-0 end-0 m-2 ${
            isInWishlist ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={handleWishlistClick}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>

        {/* 📸 Product Image */}
        <img
          src={`${BASE_URL}${product.image}`}
          className="card-img-top product-img mb-2"
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200";
          }}
        />

        {/* 📝 Product Name */}
        <h5 className="card-title text-dark">{product.name}</h5>

        {/* 💰 Price */}
        <p>
          <span className="text-danger fw-bold">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${product.oldPrice}
            </span>
          )}
        </p>

        {/* ⭐ Rating */}
        <p className="text-dark">⭐ {product.rating}</p>

        {/* 🛒 Add to Cart */}
        <button
          className="btn btn-primary w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
