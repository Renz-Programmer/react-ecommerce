import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // ✅ correct import for Vite + PWA
import { useCart } from "../context/CartContext";
import riotLogo from "../assets/images/riotlogo.png";

function Navbar({ search, setSearch }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ zIndex: 1000 }}>
        <div className="container">

          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={riotLogo} alt="League Merch Logo" className="navbar-logo" />
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">

            {/* Navigation Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>

            {/* Search Form */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                <FaSearch />
              </button>
            </form>

            {/* Cart Icon with Badge */}
            <NavLink to="/cart" className="nav-link position-relative text-white ms-2">
              <FaShoppingCart size={22} />
              {totalQty > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalQty}
                </span>
              )}
            </NavLink>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;