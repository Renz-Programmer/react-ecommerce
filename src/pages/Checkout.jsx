import { useState } from "react";
import { useCart } from "../context/CartContext";

// ⭐ Import your background image correctly
import checkoutBg from "../assets/images/checkoutbg.jpg";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    payment: "Credit Card",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.12;
  const grandTotal = subtotal + tax;

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    clearCart();   // Clears global cart
    setOrderPlaced(true);
  };

  return (
    <div
      className="checkout-page py-5"
      style={{
        backgroundImage: `url(${checkoutBg})`,   // ⭐ FIXED: No more broken path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="overlay"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">
          <h1 className="text-white text-center mb-4">Checkout</h1>

          {cartItems.length === 0 && !orderPlaced && (
            <p className="text-white text-center">Your cart is empty.</p>
          )}

          {orderPlaced && (
            <div className="alert alert-success text-center">
              🎉 Thank you, {form.name}! Your order has been placed.
            </div>
          )}

          {cartItems.length > 0 && !orderPlaced && (
            <div className="row g-4">
              {/* Billing Form */}
              <div className="col-md-6">
                <div className="card p-4 bg-dark text-white">
                  <h4>Billing Details</h4>

                  <form onSubmit={handlePlaceOrder}>
                    {["name", "address", "email", "phone"].map((field) => (
                      <div key={field} className="mb-3">
                        <label>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>

                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          className="form-control"
                        />

                        {errors[field] && (
                          <small className="text-danger">{errors[field]}</small>
                        )}
                      </div>
                    ))}

                    <div className="mb-3">
                      <label>Payment Method</label>
                      <select
                        name="payment"
                        value={form.payment}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option>Credit Card</option>
                        <option>Gcash</option>
                        <option>PayPal</option>
                        <option>Cash on Delivery</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                      Place Order
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-md-6">
                <div className="card p-4 bg-dark text-white">
                  <h4>Order Summary</h4>

                  <ul className="list-group mb-3">
                    {cartItems.map((item) => (
                      <li
                        key={item.name}
                        className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-0"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "50px",
                              marginRight: "10px",
                              borderRadius: "5px",
                            }}
                          />
                          {item.name} × {item.quantity}
                        </div>

                        <span>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <hr className="border-light" />

                  <p className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </p>

                  <p className="d-flex justify-content-between">
                    <span>Tax (12%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </p>

                  <h5 className="d-flex justify-content-between">
                    <span>Grand Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
