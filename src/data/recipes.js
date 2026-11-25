
const recipes = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    category: "Dinner",
    time: "35 min",
    servings: 2,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900",
    description: "Soft paneer cubes in a rich, creamy tomato gravy.",
    ingredients: ["200 g paneer", "3 medium tomatoes", "1 medium onion", "2 tbsp butter", "2 tbsp fresh cream", "1 tsp ginger-garlic paste", "1 tsp garam masala", "Salt to taste"],
    instructions: ["Heat butter and sauté chopped onions.", "Add tomatoes and cook until soft.", "Blend into a smooth gravy.", "Add ginger-garlic paste and spices.", "Add paneer and simmer for 5 minutes.", "Finish with fresh cream and serve hot."]
  },
  {
    id: 2,
    name: "Vegetable Biryani",
    category: "Lunch",
    time: "45 min",
    servings: 3,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=900",
    description: "Fragrant rice cooked with vegetables and aromatic spices.",
    ingredients: ["1.5 cups basmati rice", "1 cup mixed vegetables", "1 large onion", "1/2 cup curd", "1 tbsp ginger-garlic paste", "2 tbsp oil or ghee", "1 tsp biryani masala", "Mint and coriander", "Salt to taste"],
    instructions: ["Wash and soak rice for 20 minutes.", "Fry sliced onions in oil or ghee.", "Add ginger-garlic paste and vegetables.", "Add curd, biryani masala and salt.", "Add rice and required water.", "Cover and cook until rice is done."]
  },
  {
    id: 3,
    name: "Masala Dosa",
    category: "Breakfast",
    time: "25 min",
    servings: 2,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=900",
    description: "Crispy dosa filled with a seasoned potato mixture.",
    ingredients: ["2 cups dosa batter", "2 potatoes", "1 onion", "1/2 tsp mustard seeds", "1/4 tsp turmeric", "Curry leaves", "1 tbsp oil", "Salt to taste"],
    instructions: ["Boil and mash the potatoes.", "Heat oil and add mustard seeds and curry leaves.", "Add onion, turmeric and potatoes.", "Mix well to prepare the filling.", "Spread dosa batter on a hot pan.", "Add filling, fold and serve."]
  },
  {
    id: 4,
    name: "Chole Bhature",
    category: "Lunch",
    time: "40 min",
    servings: 3,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    description: "Spiced chickpea curry served with fluffy fried bread.",
    ingredients: ["1 cup dried chickpeas", "2 tomatoes", "1 onion", "1 tsp ginger-garlic paste", "1 tsp chole masala", "1/2 tsp chilli powder", "1 cup all-purpose flour", "2 tbsp curd", "Salt to taste"],
    instructions: ["Soak chickpeas overnight and pressure cook.", "Sauté onions in a pan.", "Add tomatoes, ginger-garlic paste and spices.", "Add chickpeas and simmer.", "Mix flour, curd and salt to prepare bhature dough.", "Rest the dough, roll into circles and deep fry.", "Serve hot with chole."]
  },
  {
    id: 5,
    name: "Dal Tadka",
    category: "Dinner",
    time: "30 min",
    servings: 3,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    description: "Comforting yellow lentils finished with a fragrant spice tempering.",
    ingredients: ["1 cup toor dal", "1 tomato", "1 onion", "2 garlic cloves", "1/2 tsp turmeric", "1 tsp cumin seeds", "1 tbsp ghee", "Salt to taste"],
    instructions: ["Wash and pressure cook the dal with turmeric.", "Mash the cooked dal.", "Heat ghee in a pan.", "Add cumin, garlic and chopped onion.", "Add tomato and cook until soft.", "Mix the tempering into the dal and serve."]
  },
  {
    id: 6,
    name: "Vegetable Pulao",
    category: "Dinner",
    time: "30 min",
    servings: 2,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900",
    description: "Light and flavourful rice cooked with vegetables and spices.",
    ingredients: ["1 cup basmati rice", "1 cup mixed vegetables", "1 onion", "1 tsp ginger-garlic paste", "1 bay leaf", "1/2 tsp garam masala", "1 tbsp ghee", "Salt to taste"],
    instructions: ["Wash and soak the rice.", "Heat ghee and add bay leaf.", "Add onion and ginger-garlic paste.", "Add vegetables and spices.", "Add rice and water.", "Cover and cook until rice is fluffy."]
  },
  {
    id: 7,
    name: "Gulab Jamun",
    category: "Desserts",
    time: "35 min",
    servings: 4,
    image: "https://images.pexels.com/photos/9198596/pexels-photo-9198596.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Soft, sweet milk dumplings soaked in cardamom sugar syrup.",
    ingredients: ["1 cup milk powder", "1/4 cup all-purpose flour", "2 tbsp ghee", "Milk as needed", "1 cup sugar", "1 cup water", "Cardamom powder", "Oil for frying"],
    instructions: ["Mix milk powder, flour and ghee.", "Add milk gradually to make a soft dough.", "Shape into small smooth balls.", "Boil sugar and water to make syrup.", "Fry the balls on low heat until golden.", "Soak them in warm syrup before serving."]
  },
  {
    id: 8,
    name: "Fruit Custard",
    category: "Desserts",
    time: "20 min",
    servings: 3,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900",
    description: "Creamy chilled custard mixed with fresh seasonal fruits.",
    ingredients: ["2 cups milk", "2 tbsp custard powder", "3 tbsp sugar", "1 apple", "1 banana", "1/2 cup grapes", "Other seasonal fruits"],
    instructions: ["Mix custard powder with a little cold milk.", "Heat the remaining milk with sugar.", "Add the custard mixture slowly while stirring.", "Cook until thick and allow it to cool.", "Chop the fruits and mix into the custard.", "Refrigerate and serve chilled."]
  }
];

export default recipes;
