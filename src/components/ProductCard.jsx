import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  // ✅ Handle wishlist + cart + navigation
  const handleWishlistClick = () => {
    toggleWishlist(product); // toggle wishlist
    addToCart(product);      // add to cart
    navigate("/cart");       // go to cart page
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center p-3 position-relative bg-white text-dark">

        {/* ❤️ Wishlist / Add to Cart button */}
        <button
          className={`btn position-absolute top-0 end-0 m-2 ${
            isInWishlist ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={handleWishlistClick} // ✅ updated
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>

        <img
          src={`http://localhost:5000${product.image}`}
          className="card-img-top product-img mb-2"
          alt={product.name}
          onError={(e) => { e.target.src = "https://via.placeholder.com/200"; }}
        />

        <h5 className="card-title text-dark">{product.name}</h5>

        <p>
          <span className="text-danger fw-bold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${product.oldPrice}
            </span>
          )}
        </p>

        <p className="text-dark">⭐ {product.rating}</p>

        <button
          className="btn btn-primary w-100"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;