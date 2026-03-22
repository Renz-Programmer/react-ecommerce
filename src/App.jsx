import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [search, setSearch] = useState(""); // GLOBAL SEARCH

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">

        {/* Navbar */}
        <Navbar search={search} setSearch={setSearch} />

        {/* Main content */}
        <main className="flex-grow-1 mt-5"> 
          {/* mt-5 adds spacing if navbar is fixed */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList search={search} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;