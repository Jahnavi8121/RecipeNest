
import { useState } from "react";

function UserLogin({ onLogin, message, onBack, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="auth-container">
      <div className="left-panel">
        <div className="brand">RecipeNest</div>
        <div className="left-content">
          <span className="tag">FOOD DISCOVERY</span>
          <h1>A little inspiration for every meal.</h1>
          <p>Explore recipes and make everyday cooking enjoyable.</p>
        </div>
        <div className="left-footer">RecipeNest · Everyday cooking</div>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h2>Welcome back</h2>
          <p className="form-subtitle">Sign in to your RecipeNest account.</p>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
              />
            </div>

            {message && <p className="message">{message}</p>}
            <button className="submit-btn" type="submit">Sign in</button>
          </form>

          <p className="switch-text">
            New to RecipeNest? <button onClick={onSignup}>Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
