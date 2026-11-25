
function RecipeCard({ recipe, onView }) {
  return (
    <article className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-image"
        loading="lazy"
      />

      <div className="recipe-card-content">
        <span className="recipe-category">{recipe.category}</span>

        <h3>{recipe.name}</h3>

        <p>{recipe.description}</p>

        <div className="recipe-meta">
          <span>◷ {recipe.time}</span>
          <span>{recipe.servings} servings</span>
        </div>

        <button
  className="recipe-view-btn"
  onClick={() => onView(recipe)}
>
  View recipe →
</button>
      </div>
    </article>
  );
}

export default RecipeCard;
