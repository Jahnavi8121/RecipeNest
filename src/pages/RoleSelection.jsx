
import { useState } from "react";

function RoleSelection({ onSelect }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="logo-icon">✦</span> RecipeNest
        </div>

        <div className="landing-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="nav-login-btn"
          onClick={() => onSelect("user")}
        >
          Login / Sign up
        </button>
      </nav>

      {/* Hero section */}
      <section className="landing-hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO RECIPENEST</span>

          <h1>
            Discover the joy
            <br />
            of <span>cooking.</span>
          </h1>

          <p>
            Find delicious recipes, explore new flavours and
            make every meal a special experience.
          </p>

          <div className="hero-buttons">
            <button
              className="get-started-btn"
              onClick={() => onSelect("user")}
            >
              Get Started →
            </button>

            <a href="#categories" className="explore-btn">
              Explore Recipes
            </a>
          </div>

          <div className="hero-note">
            <span>✦</span> Simple ingredients. Wonderful meals.
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
            alt="Fresh and delicious food"
          />

          <div className="floating-note">
            <span>♡</span>
            <div>
              <strong>Made with love</strong>
              <small>One recipe at a time</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="landing-categories" id="categories">
        <div className="landing-section-heading">
          <span>WHAT ARE YOU CRAVING?</span>
          <h2>Explore our kitchen</h2>
          <p>A little inspiration for every meal of the day.</p>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600"
              alt="Breakfast"
            />
            <div>
              <h3>Breakfast</h3>
              <p>Start your day deliciously</p>
            </div>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
              alt="Lunch"
            />
            <div>
              <h3>Lunch</h3>
              <p>Make afternoons special</p>
            </div>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
              alt="Dinner"
            />
            <div>
              <h3>Dinner</h3>
              <p>End your day with flavour</p>
            </div>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600"
              alt="Desserts"
            />
            <div>
              <h3>Desserts</h3>
              <p>A sweet little happiness</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="landing-about" id="about">
        <div className="about-heading">
          <span>OUR STORY</span>
          <h2>Good food brings people together.</h2>
        </div>

        <div className="about-content">
          <p>
            Welcome to RecipeNest, your everyday food companion!
            We believe cooking should be enjoyable, simple and
            accessible to everyone.
          </p>

          <p>
            Our goal is to bring delicious recipes, easy-to-find
            ingredients and clear cooking instructions together
            in one place. Whether you are a beginner or someone
            who loves experimenting in the kitchen, RecipeNest
            is here to inspire your next meal.
          </p>

          <div className="about-highlights">
            <div>
              <strong>01</strong>
              <span>Easy recipes</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Simple ingredients</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Cooking inspiration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="landing-contact" id="contact">
        <div className="contact-info">
          <span>GET IN TOUCH</span>
          <h2>We would love to hear from you.</h2>

          <p>
            Have a question, suggestion or feedback?
            Send us a message. Your thoughts help us
            make RecipeNest better.
          </p>

          <div className="contact-note">
            <span>✉</span>
            <div>
              <strong>Let's connect</strong>
              <small>Share your thoughts with RecipeNest.</small>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Send us a message</h3>
          <p>Fill in the details below.</p>

          {submitted ? (
            <div className="contact-success">
              <span>✓</span>
              <h3>Thank you for reaching out!</h3>
              <p>Your message has been submitted in this demo.</p>

              <button onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Your Message</label>
              <textarea
                placeholder="Write your message here..."
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button type="submit">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Login section */}
      <section className="landing-join">
        <span>READY TO GET COOKING?</span>
        <h2>Your next favourite recipe is waiting.</h2>
        <p>Join RecipeNest and discover something delicious today.</p>

        <div className="join-buttons">
          <button onClick={() => onSelect("user")}>
            Continue as User →
          </button>

          <button
            className="admin-join-btn"
            onClick={() => onSelect("admin")}
          >
            Admin Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <strong>✦ RecipeNest</strong>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <p>Made for food lovers. © 2026 RecipeNest</p>
      </footer>
    </div>
  );
}

export default RoleSelection;

