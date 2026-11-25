
import { useState } from "react";
import defaultRecipes from "../data/recipes";

function AdminDashboard({ onLogout }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("adminRecipes");
    return saved ? JSON.parse(saved) : defaultRecipes;
  });

  const [users] = useState(() =>
    JSON.parse(localStorage.getItem("recipeUsers") || "[]")
  );

  const [activeTab, setActiveTab] = useState("recipes");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Main Course",
    time: "",
    servings: "2",
    image: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  function saveRecipes(updatedRecipes) {
    setRecipes(updatedRecipes);
    localStorage.setItem("adminRecipes", JSON.stringify(updatedRecipes));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recipe = {
      ...form,
      id: editingId || Date.now(),
      servings: Number(form.servings),
      ingredients: form.ingredients
        .split("\n")
        .filter((item) => item.trim() !== ""),
      instructions: form.instructions
        .split("\n")
        .filter((item) => item.trim() !== ""),
    };

    let updatedRecipes;

    if (editingId) {
      updatedRecipes = recipes.map((r) =>
        r.id === editingId ? recipe : r
      );
      setMessage("Recipe updated successfully!");
    } else {
      updatedRecipes = [...recipes, recipe];
      setMessage("Recipe added successfully!");
    }

    saveRecipes(updatedRecipes);
    resetForm();
  }

  function editRecipe(recipe) {
    setEditingId(recipe.id);

    setForm({
      name: recipe.name,
      category: recipe.category,
      time: recipe.time,
      servings: String(recipe.servings),
      image: recipe.image,
      description: recipe.description,
      ingredients: recipe.ingredients.join("\n"),
      instructions: recipe.instructions.join("\n"),
    });

    setActiveTab("form");
    setMessage("");
  }

  function deleteRecipe(id) {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    const updatedRecipes = recipes.filter((r) => r.id !== id);
    saveRecipes(updatedRecipes);
    setMessage("Recipe deleted successfully!");
  }

  function resetForm() {
    setForm({
      name: "",
      category: "Main Course",
      time: "",
      servings: "2",
      image: "",
      description: "",
      ingredients: "",
      instructions: "",
    });

    setEditingId(null);
  }

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <h2>✦ RecipeNest <span>Admin</span></h2>
        <button onClick={onLogout} className="admin-logout">
          Log out
        </button>
      </nav>

      <div className="admin-container">
        <div className="admin-welcome">
          <span className="admin-tag">ADMINISTRATION</span>
          <h1>Dashboard</h1>
          <p>Manage your recipes and registered users.</p>
        </div>

        {/* Statistics */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <span>🍽️</span>
            <p>Total recipes</p>
            <h2>{recipes.length}</h2>
          </div>

          <div className="admin-stat-card">
            <span>👥</span>
            <p>Registered users</p>
            <h2>{users.length}</h2>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="admin-tabs">
          <button
            className={activeTab === "recipes" ? "active" : ""}
            onClick={() => {
              setActiveTab("recipes");
              setMessage("");
            }}
          >
            Recipe List
          </button>

          <button
            className={activeTab === "form" ? "active" : ""}
            onClick={() => {
              resetForm();
              setActiveTab("form");
              setMessage("");
            }}
          >
            + Add Recipe
          </button>

          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => {
              setActiveTab("users");
              setMessage("");
            }}
          >
            Registered Users
          </button>
        </div>

        {message && <p className="admin-message">{message}</p>}

        {/* Recipe list */}
        {activeTab === "recipes" && (
          <div className="admin-content">
            <h2>Recipe management</h2>

            {recipes.length === 0 ? (
              <p>No recipes available.</p>
            ) : (
              <div className="admin-recipe-list">
                {recipes.map((recipe) => (
                  <div className="admin-recipe-row" key={recipe.id}>
                    <img src={recipe.image} alt={recipe.name} />

                    <div className="admin-recipe-info">
                      <h3>{recipe.name}</h3>
                      <p>{recipe.category} · {recipe.time}</p>
                    </div>

                    <div className="admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => editRecipe(recipe)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteRecipe(recipe.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recipe form */}
        {activeTab === "form" && (
          <div className="admin-content">
            <h2>{editingId ? "Edit recipe" : "Add a new recipe"}</h2>

            <form className="admin-form" onSubmit={handleSubmit}>
              <label>Recipe name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Recipe name"
                required
              />

              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Breakfast</option>
                <option>Main Course</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
                <option>Snacks</option>
              </select>

              <div className="admin-form-row">
                <div>
                  <label>Cooking time</label>
                  <input
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="30 min"
                    required
                  />
                </div>

                <div>
                  <label>Servings</label>
                  <input
                    name="servings"
                    type="number"
                    min="1"
                    value={form.servings}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label>Food image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/food.jpg"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the recipe..."
                required
              />

              <label>Ingredients (one per line)</label>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder={"2 tomatoes\n1 onion\n1 tsp salt"}
                rows="5"
                required
              />

              <label>Instructions (one step per line)</label>
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                placeholder={"Chop the vegetables.\nHeat the pan.\nCook and serve."}
                rows="6"
                required
              />

              <div className="admin-form-buttons">
                <button className="admin-save-btn" type="submit">
                  {editingId ? "Update recipe" : "Add recipe"}
                </button>

                <button
                  className="admin-cancel-btn"
                  type="button"
                  onClick={resetForm}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User list */}
        {activeTab === "users" && (
          <div className="admin-content">
            <h2>Registered users</h2>

            {users.length === 0 ? (
              <p>No registered users yet.</p>
            ) : (
              <div className="admin-user-list">
                {users.map((user, index) => (
                  <div className="admin-user-row" key={index}>
                    <div className="admin-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

