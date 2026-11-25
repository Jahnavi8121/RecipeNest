
import { useState } from "react";
import defaultRecipes from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

function UserDashboard({ user, onLogout }) {
  const [recipes] = useState(() => {
    const saved = localStorage.getItem("adminRecipes");
    return saved ? JSON.parse(saved) : defaultRecipes;
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.category.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients([]);
    setShowProfile(false);
  };

  const goHome = () => {
    setSelectedRecipe(null);
    setShowProfile(false);
  };

  return (
    <div className="home-page">
      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="home-logo">✦ RecipeNest</div>

        <div className="home-nav-links">
          <span onClick={goHome}>Home</span>

          <span
            onClick={() => {
              goHome();
              setTimeout(() => {
                document.getElementById("popular")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 0);
            }}
          >
            Recipes
          </span>
        </div>

        <div className="home-user">
          <span>
            Hi, {user?.name?.split(" ")[0] || "Food Lover"}
          </span>

          <button onClick={() => {
            setShowProfile(true);
            setSelectedRecipe(null);
          }}>
            My Profile
          </button>

          <button onClick={onLogout}>Log out</button>
        </div>
      </nav>

      {/* PROFILE SECTION */}
      {showProfile ? (
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <span className="hero-label">YOUR ACCOUNT</span>

            <h1>{user?.name || "Food Lover"}</h1>

            <p>{user?.email || "Email not available"}</p>

            <div className="profile-details">
              <div>
                <span>Account Type</span>
                <strong>User</strong>
              </div>

              <div>
                <span>Total Recipes</span>
                <strong>{recipes.length}</strong>
              </div>
            </div>

            <button
              className="profile-close"
              onClick={goHome}
            >
              Back to RecipeNest
            </button>
          </div>
        </section>

      ) : selectedRecipe ? (

        /* RECIPE DETAILS */
        <div className="recipe-detail">
          <button
            className="back-btn"
            onClick={goHome}
          >
            ← Back to recipes
          </button>

          <div className="detail-layout">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="detail-photo"
            />

            <div className="detail-info">
              <span className="recipe-category">
                {selectedRecipe.category}
              </span>

              <h1>{selectedRecipe.name}</h1>

              <p>{selectedRecipe.description}</p>

              <div className="recipe-meta">
                <span>◷ {selectedRecipe.time}</span>
                <span>{selectedRecipe.servings} servings</span>
              </div>

              <h2>Ingredients</h2>

              <div className="ingredient-list">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <label className="ingredient-item" key={index}>
                    <input
                      type="checkbox"
                      checked={checkedIngredients.includes(index)}
                      onChange={() => {
                        setCheckedIngredients((prev) =>
                          prev.includes(index)
                            ? prev.filter((item) => item !== index)
                            : [...prev, index]
                        );
                      }}
                    />

                    <span>{ingredient}</span>
                  </label>
                ))}
              </div>

              <p className="ingredient-progress">
                {checkedIngredients.length} of{" "}
                {selectedRecipe.ingredients.length} ingredients collected
              </p>

              <h2>Instructions</h2>

              <ol className="instruction-list">
                {selectedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      ) : (

        /* HOMEPAGE */
        <>
          <section className="home-hero">
            <div className="hero-text">
              <span className="hero-label">
                A LITTLE FOOD INSPIRATION
              </span>

              <h1>
                Good food starts with a little inspiration.
              </h1>

              <p>
                Discover delicious recipes, simple ingredients
                and new flavours to bring to your kitchen.
              </p>

              <input
                className="recipe-search"
                type="text"
                placeholder="Search recipes or ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </section>

          <section className="popular-section" id="popular">
            <div className="section-heading">
              <div>
                <span className="hero-label">
                  FRESH IDEAS FOR YOUR KITCHEN
                </span>

                <h2>Popular recipes</h2>
              </div>
            </div>

            <div className="category-filter">
              {["All", "Breakfast", "Lunch", "Dinner", "Desserts"].map(
                (category) => (
                  <button
                    key={category}
                    className={
                      selectedCategory === category
                        ? "active-category"
                        : ""
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {filteredRecipes.length > 0 ? (
              <div className="recipe-grid">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={openRecipe}
                  />
                ))}
              </div>
            ) : (
              <p className="no-results">
                No recipes found. Try another search or category.
              </p>
            )}
          </section>

          <section className="ingredient-banner">
            <h2>Cooking is better when it's simple.</h2>

            <p>
              Find recipes, check ingredients and follow
              easy steps to create your next meal.
            </p>
          </section>

          <footer className="home-footer">
            <span>✦ RecipeNest</span>
            <p>Made for food lovers. © 2026 RecipeNest</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default UserDashboard;
