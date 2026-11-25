
import { useState } from "react";

function AdminLogin({ onLogin, message, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="auth-container">
      <div className="left-panel">
        <div className="brand">RecipeNest / Admin</div>
        <div className="left-content">
          <span className="tag">ADMINISTRATION</span>
          <h1>Manage the recipe collection.</h1>
          <p>Sign in to access the administration dashboard.</p>
        </div>
        <div className="left-footer">RecipeNest · Administration</div>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h2>Administrator sign in</h2>
          <p className="form-subtitle">Enter your administrator credentials.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
              />
            </div>

            {message && <p className="message">{message}</p>}
            <button className="submit-btn" type="submit">Access dashboard</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
