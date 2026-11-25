
import { useState } from "react";

function UserSignup({ onSignup, message, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSignup(name, email, password);
  }

  return (
    <div className="auth-container">
      <div className="left-panel">
        <div className="brand">RecipeNest</div>
        <div className="left-content">
          <span className="tag">JOIN THE COMMUNITY</span>
          <h1>Good food brings people together.</h1>
          <p>Create your account and start exploring.</p>
        </div>
        <div className="left-footer">RecipeNest · Everyday cooking</div>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <button className="back-btn" onClick={onBack}>← Back to login</button>
          <h2>Create your account</h2>
          <p className="form-subtitle">A few details to get you started.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            {message && <p className="message">{message}</p>}
            <button className="submit-btn" type="submit">Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
