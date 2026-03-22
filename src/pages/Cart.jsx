import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// background
import cartBg from "../assets/images/cartbg.jpg";

function Cart() {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="cart-page"
      style={{
        backgroundImage: `url(${cartBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div className="container py-5">
        <h1 className="text-white text-shadow mb-4">Shopping Cart</h1>

        {cartItems.length === 0 && (
          <p className="text-white text-shadow">Your cart is empty.</p>
        )}

        {cartItems.map((item) => (
          // ✅ FIXED KEY
          <div key={item.id} className="cart-card mb-4">
            
            {/* Product Image */}
            <div className="cart-card-img">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
            </div>

            {/* Product Info */}
            <div className="cart-card-overlay p-3">
              <h5 className="text-white">{item.name}</h5>

              <p className="text-white mb-1">
                <strong>Price:</strong> ${item.price.toFixed(2)}
              </p>

              {/* QUANTITY */}
              <div className="d-flex align-items-center mb-1">
                <strong className="text-white me-2">Quantity:</strong>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="text-white mb-2">
                <strong>Subtotal:</strong> $
                {(item.price * item.quantity).toFixed(2)}
              </p>

              {/* REMOVE */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="d-flex justify-content-end mt-3 align-items-center">
            <h4 className="text-white me-4 text-shadow">
              Total: ${totalPrice.toFixed(2)}
            </h4>

            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;