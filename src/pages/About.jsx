import React from "react";

// ⭐ Import your banner image correctly (no folder changes needed)
import bannerGif from "../assets/images/bannergif.gif";

function About() {
  return (
    <div className="about-background">

      {/* Hero Banner */}
      <div id="heroBanner" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={bannerGif}
              className="d-block w-100 carousel-img"
              alt="League Banner"
            />
          </div>
        </div>
      </div>

      {/* About Section - 3 Boxes */}
      <div className="container my-5">
        <h2 className="text-center mb-4">About Our League of Legends Merch</h2>
        <div className="row g-4">

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>Exclusive Merchandise</h5>
              <p>
                We provide high-quality, officially inspired League of Legends merch including champion figures, hoodies, posters, and collectibles for all fans.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>Champion Inspired</h5>
              <p>
                Our products celebrate iconic champions like Ahri, Jinx, Yasuo, Zed, Lux, and Akali, capturing their essence in every collectible and apparel.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>For True Fans</h5>
              <p>
                Whether decorating your space, wearing your favorite champion, or collecting rare figures, we have something for every passionate fan.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Our Mission */}
      <div className="container my-5">
        <h3 className="text-center mb-4">Our Mission</h3>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          Our mission is to bring the League of Legends universe closer to fans worldwide by offering unique, high-quality merchandise that reflects the passion and excitement of the game.
        </p>
      </div>

      {/* Our Values */}
      <div className="container my-5">
        <h3 className="text-center mb-4">Our Values</h3>
        <div className="row g-4">

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>Quality</h5>
              <p>Every product is carefully crafted to meet the highest standards for fans who demand the best.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>Passion</h5>
              <p>We share the excitement of the League of Legends community and aim to bring that joy to every fan.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-box p-4 shadow rounded h-100 text-center">
              <h5>Community</h5>
              <p>We value our community and strive to create products that fans can proudly enjoy and share.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default About;