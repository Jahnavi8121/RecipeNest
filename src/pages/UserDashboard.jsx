
import { useState } from "react";
import defaultRecipes from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

function UserDashboard({ user, onLogout }) {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem("adminRecipes");
      return saved ? JSON.parse(saved) : defaultRecipes;
    } catch {
      return defaultRecipes;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  // New: Recipe submission states
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "Breakfast",
    time: "",
    servings: "2",
    image: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  const getSearchableText = (recipe) => {
    const ingredients = (recipe.ingredients || [])
      .map((ingredient) =>
        typeof ingredient === "string"
          ? ingredient
          : Object.values(ingredient || {}).join(" ")
      )
      .join(" ");

    return [
      recipe.name,
      recipe.category,
      recipe.description,
      ingredients,
    ].join(" ").toLowerCase();
  };

  const searchWords = search
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchableText = getSearchableText(recipe);

    const matchesSearch = searchWords.every((word) =>
      searchableText.includes(word)
    );

    const matchesCategory =
      selectedCategory === "All" ||
      recipe.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients([]);
    setShowProfile(false);
    setShowSubmitForm(false);
  };

  const goHome = () => {
    setSelectedRecipe(null);
    setShowProfile(false);
    setShowSubmitForm(false);
  };

  // New: Handle submission form changes
  const handleNewRecipeChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // New: Submit recipe for admin approval
  const handleRecipeSubmit = (e) => {
    e.preventDefault();

    const submission = {
      ...newRecipe,
      id: Date.now(),
      servings: Number(newRecipe.servings),
      ingredients: newRecipe.ingredients
        .split("\n")
        .filter((item) => item.trim() !== ""),
      instructions: newRecipe.instructions
        .split("\n")
        .filter((item) => item.trim() !== ""),
      submittedBy: user?.name || "RecipeNest user",
      submittedEmail: user?.email || "",
    };

    const existingSubmissions = JSON.parse(
      localStorage.getItem("pendingRecipes") || "[]"
    );

    localStorage.setItem(
      "pendingRecipes",
      JSON.stringify([...existingSubmissions, submission])
    );

    setSubmitMessage("Your recipe has been submitted for admin approval!");

    setNewRecipe({
      name: "",
      category: "Breakfast",
      time: "",
      servings: "2",
      image: "",
      description: "",
      ingredients: "",
      instructions: "",
    });
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
              }, 100);
            }}
          >
            Recipes
          </span>
        </div>

        <div className="home-user">
          <span>
            Hi, {user?.name?.split(" ")[0] || "Food Lover"}
          </span>

          <button
            onClick={() => {
              setShowProfile(true);
              setSelectedRecipe(null);
              setShowSubmitForm(false);
            }}
          >
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

            <button className="profile-close" onClick={goHome}>
              Back to RecipeNest
            </button>
          </div>
        </section>

      ) : showSubmitForm ? (

        /* NEW: SUBMIT RECIPE FORM */
        <section className="submit-recipe-section">
          <div className="submit-recipe-card">

            <button className="back-btn" onClick={goHome}>
              ← Back to recipes
            </button>

            <span className="hero-label">SHARE YOUR CREATIVITY</span>
            <h1>Share Your Recipe</h1>

            <p>
              Have a delicious recipe? Share it with our community.
              Our admin will review it before publishing.
            </p>

            {submitMessage && (
              <div className="admin-message">
                {submitMessage}
              </div>
            )}

            <form className="admin-form" onSubmit={handleRecipeSubmit}>

              <label>Recipe name</label>
              <input
                name="name"
                value={newRecipe.name}
                onChange={handleNewRecipeChange}
                placeholder="Enter recipe name"
                required
              />

              <label>Category</label>
              <select
                name="category"
                value={newRecipe.category}
                onChange={handleNewRecipeChange}
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
                    value={newRecipe.time}
                    onChange={handleNewRecipeChange}
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
                    value={newRecipe.servings}
                    onChange={handleNewRecipeChange}
                    required
                  />
                </div>
              </div>

              <label>Food image URL</label>
              <input
                name="image"
                type="url"
                value={newRecipe.image}
                onChange={handleNewRecipeChange}
                placeholder="https://example.com/food.jpg"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={newRecipe.description}
                onChange={handleNewRecipeChange}
                placeholder="Tell us about your recipe..."
                required
              />

              <label>Ingredients (one per line)</label>
              <textarea
                name="ingredients"
                value={newRecipe.ingredients}
                onChange={handleNewRecipeChange}
                placeholder={"2 tomatoes\n1 onion\n1 tsp salt"}
                rows="5"
                required
              />

              <label>Instructions (one step per line)</label>
              <textarea
                name="instructions"
                value={newRecipe.instructions}
                onChange={handleNewRecipeChange}
                placeholder={"Chop the vegetables.\nHeat the pan.\nCook and serve."}
                rows="6"
                required
              />

              <button className="admin-save-btn" type="submit">
                Submit for Approval
              </button>

            </form>
          </div>
        </section>

      ) : selectedRecipe ? (

        /* RECIPE DETAILS */
        <div className="recipe-detail">
          <button className="back-btn" onClick={goHome}>
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
                {(selectedRecipe.ingredients || []).map(
                  (ingredient, index) => (
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

                      <span>
                        {typeof ingredient === "string"
                          ? ingredient
                          : Object.values(ingredient || {}).join(" ")}
                      </span>
                    </label>
                  )
                )}
              </div>

              <p className="ingredient-progress">
                {checkedIngredients.length} of{" "}
                {(selectedRecipe.ingredients || []).length} ingredients
                collected
              </p>

              <h2>Instructions</h2>

              <ol className="instruction-list">
                {(selectedRecipe.instructions || []).map(
                  (step, index) => (
                    <li key={index}>{step}</li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>

      ) : (

        /* USER HOMEPAGE */
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

              <div className="recipe-search-wrapper">
                <span className="search-icon">⌕</span>

                <input
                  className="recipe-search"
                  type="text"
                  placeholder="Search by recipe name or ingredients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="search-hint">
                Try searching: Paneer, Potato, Tomato or Biryani
              </p>
            </div>
          </section>

          {/* NEW: SUBMIT RECIPE BUTTON */}
          <section className="submit-recipe-promo">
            <div>
              <span className="hero-label">YOUR RECIPE, YOUR STORY</span>
              <h2>Have a recipe worth sharing?</h2>
              <p>
                Submit your favourite dish and let the RecipeNest
                community discover it.
              </p>
            </div>

            <button
              onClick={() => {
                setShowSubmitForm(true);
                setSubmitMessage("");
              }}
            >
              + Submit Your Recipe
            </button>
          </section>

          {/* POPULAR RECIPES */}
          <section className="popular-section" id="popular">
            <div className="section-heading">
              <div>
                <span className="hero-label">
                  FRESH IDEAS FOR YOUR KITCHEN
                </span>

                <h2>
                  {search.trim() ? "Search results" : "Popular recipes"}
                </h2>
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

            <p className="search-result-count">
              {filteredRecipes.length}{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </p>

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
              <div className="no-results">
                <h3>No recipes found!</h3>
                <p>Try another recipe name or ingredient.</p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                >
                  Show all recipes
                </button>
              </div>
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
