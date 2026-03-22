import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

// Carousel images
import carousel1 from "../assets/images/Carousel1.png";
import carousel2 from "../assets/images/Carousel2.jpg";
import carousel3 from "../assets/images/Carousel3.jpg";

// Feature product images
import feature1 from "../assets/images/Feature1.png";
import feature2 from "../assets/images/Feature2.png";
import feature3 from "../assets/images/Feature3.png";

// Background image
import mainbg from "../assets/images/mainbg.jpg";

function Home() {
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState(""); // ✅ SEARCH STATE

  const products = [
    { name: "Poppy Plush", price: 45, oldPrice: 60, rating: 4.8, image: feature1 },
    { name: "Shan Hai Scrolls Lillia Figure", price: 70, oldPrice: 90, rating: 4.7, image: feature2 },
    { name: "Tibbers Blind Box", price: 35, oldPrice: 50, rating: 4.9, image: feature3 },
  ];

  // ✅ FILTER LOGIC
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => {
    addToCart(product);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleAutoplaying");
    if (!carousel) return;

    const captions = carousel.querySelectorAll(".carousel-caption");

    const handleSlide = () => {
      captions.forEach((caption) => {
        caption.querySelectorAll(".animate-fade-in").forEach((el) => {
          el.classList.remove("animate-fade-in", "delay-1s");
          void el.offsetWidth;
          el.classList.add("animate-fade-in");
        });
      });
    };

    carousel.addEventListener("slide.bs.carousel", handleSlide);
    return () => carousel.removeEventListener("slide.bs.carousel", handleSlide);
  }, []);

  return (
    <div className="home-background">

      {/* ================= CAROUSEL ================= */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={carousel1} className="d-block w-100 carousel-img" alt="Banner 1" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h1 className="display-3 fw-bold bronze-text animate-fade-in">Welcome to League Merch</h1>
              <p className="lead bronze-text animate-fade-in delay-1s">
                Collect, Wear, and Celebrate Your Favorite Champions!
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={carousel2} className="d-block w-100 carousel-img" alt="Banner 2" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h1 className="display-3 fw-bold bronze-text animate-fade-in">Welcome to League Merch</h1>
              <p className="lead bronze-text animate-fade-in delay-1s">
                Exclusive Collector Items for Every Champion!
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={carousel3} className="d-block w-100 carousel-img" alt="Banner 3" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h1 className="display-3 fw-bold bronze-text animate-fade-in">Welcome to League Merch</h1>
              <p className="lead bronze-text animate-fade-in delay-1s">
                Gear Up Like a True Summoner!
              </p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>


      {/* ================= FEATURED PRODUCTS ================= */}
      <div
        style={{
          backgroundImage: `url(${mainbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="container mt-5">
          <h2 className="mb-4 text-center text-white">
            Featured League of Legends Merch
          </h2>

          {/* ✅ SEARCH BAR */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search League merch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="row g-4">

            {/* ✅ FILTERED PRODUCTS */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div className="col-md-4" key={index}>
                  <div className="transparent-card shadow text-center p-3">
                    <img src={product.image} className="circular-img mb-3" alt={product.name} />

                    <h5>{product.name}</h5>

                    <p>
                      <span className="text-danger fw-bold">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through ms-2">
                          ${product.oldPrice}
                        </span>
                      )}
                    </p>

                    <p>⭐ {product.rating}</p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAdd(product)}
                      data-bs-toggle="modal"
                      data-bs-target="#cartModal"
                    >
                      Add to Cart
                    </button>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">No products found 😢</p>
            )}

          </div>
        </div>
      </div>


      {/* ================= MODAL ================= */}
      <div className="modal fade" id="cartModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-4">

            <h4 className="mb-3">Item Added to Cart</h4>

            {selectedProduct && (
              <>
                <img
                  src={selectedProduct.image}
                  style={{ width: "120px" }}
                  className="mb-3"
                  alt={selectedProduct.name}
                />

                <h5>{selectedProduct.name}</h5>
                <p className="fw-bold text-danger">${selectedProduct.price}</p>
              </>
            )}

            <button className="btn btn-primary mt-2" data-bs-dismiss="modal">
              Continue Shopping
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;