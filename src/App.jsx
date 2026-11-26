
import { useState } from "react";
import "./App.css";

import RoleSelection from "./pages/RoleSelection";
import UserLogin from "./pages/Userlogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const ADMIN_EMAIL = "admin@recipenest.com";
const ADMIN_PASSWORD = "admin123";

function App() {
  const [page, setPage] = useState("role");

  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("recipeUsers") || "[]")
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  // Select User or Admin
  function openLogin(role) {
    setMessage("");

    if (role === "admin") {
      setPage("adminLogin");
    } else {
      setPage("userLogin");
    }
  }

  // User Signup
  function signup(name, email, password) {
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      setMessage("Email already registered.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "recipeUsers",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);
    setCurrentUser(newUser);
    setMessage("");
    setPage("userDashboard");
  }

  // User Login
  function userLogin(email, password) {
    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setMessage("");
      setPage("userDashboard");
    } else {
      setMessage("Invalid user email or password.");
    }
  }

  // Admin Login
  function adminLogin(email, password) {
    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setCurrentUser({
        name: "Admin",
        email,
        role: "admin",
      });

      setMessage("");
      setPage("adminDashboard");
    } else {
      setMessage("Invalid admin credentials.");
    }
  }

  // Logout
  function logout() {
    setCurrentUser(null);
    setMessage("");
    setPage("role");
  }

  return (
    <div className="app">

      {/* ROLE SELECTION */}
      {page === "role" && (
        <RoleSelection onSelect={openLogin} />
      )}

      {/* USER LOGIN */}
      {page === "userLogin" && (
        <UserLogin
          onLogin={userLogin}
          message={message}
          onBack={() => {
            setMessage("");
            setPage("role");
          }}
          onSignup={() => {
            setMessage("");
            setPage("signup");
          }}
        />
      )}

      {/* USER SIGNUP */}
      {page === "signup" && (
        <UserSignup
          onSignup={signup}
          message={message}
          onBack={() => {
            setMessage("");
            setPage("userLogin");
          }}
        />
      )}

      {/* ADMIN LOGIN */}
      {page === "adminLogin" && (
        <AdminLogin
          onLogin={adminLogin}
          message={message}
          onBack={() => {
            setMessage("");
            setPage("role");
          }}
        />
      )}

      {/* USER HOMEPAGE */}
      {page === "userDashboard" && (
        <UserDashboard
          user={currentUser}
          onLogout={logout}
        />
      )}

      {/* ADMIN DASHBOARD */}
      {page === "adminDashboard" && (
        <AdminDashboard
          onLogout={logout}
        />
      )}

    </div>
  );
}

export default App;
