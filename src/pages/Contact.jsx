import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
// ⭐ Import background image (keeps your folders EXACTLY the same)
import contactBg from "../assets/images/contactbg.png";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div
      className="contact-background d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Main content grows to fill space */}
      <div className="flex-grow-1 container py-5">

        {/* Hero Banner */}
        <div className="text-center py-5">
          <h1 className="display-5 fw-bold" style={{ color: "#a79380" }}>
            Get in Touch with League Merch
          </h1>
          <p className="lead" style={{ color: "#a79380" }}>
            We are here to answer your questions and assist you with your orders.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="row g-4">

          {/* Contact Form */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="transparent-card p-4 shadow h-100">
              <h4 className="mb-4 text-center">Send Us a Message</h4>

              <input type="text" className="form-control mb-3" placeholder="Your Name" required />
              <input type="email" className="form-control mb-3" placeholder="Your Email" required />
              <textarea className="form-control mb-3" rows="5" placeholder="Write your message here..." required></textarea>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Store Information */}
          <div className="col-md-6">
            <div className="transparent-card p-4 shadow h-100">
              <h4 className="mb-4 text-center">Store Information</h4>

              <p><FaEnvelope className="me-2 text-primary" /> <strong>Email:</strong> support@lolmerch.com</p>
              <p><FaPhone className="me-2 text-primary" /> <strong>Phone:</strong> +63 912 345 6789</p>
              <p><FaMapMarkerAlt className="me-2 text-primary" /> <strong>Address:</strong> Parañaque City, Philippines</p>

              <p className="mt-3 text-white">
                Have questions about orders, products, or shipping? Fill out the form and we will respond as soon as possible!
              </p>

              <div className="mt-4">
                <iframe
                  title="store-location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.157981902435!2d121.0035309152978!3d14.490152589808988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c958b0f7b6a5%3A0x0!2zMTTCsDI5JzAwLjAiTiAxMjHCsDAwJzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1676500000000!5m2!1sen!2sph"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Contact;