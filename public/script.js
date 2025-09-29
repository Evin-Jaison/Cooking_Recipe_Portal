// Global variable to store all recipes
let allRecipes = [];

// Navigation Functions
function showLanding() {
  hideAllPages();
  document.getElementById('landingPage').classList.add('active');
}

function showRecipes() {
  hideAllPages();
  document.getElementById('browsePage').classList.add('active');
  loadRecipes();
}

function showAddRecipe() {
  hideAllPages();
  document.getElementById('addPage').classList.add('active');
  document.getElementById('title').focus();
}

function hideAllPages() {
  document.getElementById('landingPage').classList.remove('active');
  document.getElementById('browsePage').classList.remove('active');
  document.getElementById('addPage').classList.remove('active');
}

// Search and Filter Functions
function initializeSearchFunctionality() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const categoryFilter = document.getElementById('categoryFilter');
  const difficultyFilter = document.getElementById('difficultyFilter');
  const clearButton = document.getElementById('clearFilters');

  // Search on input change
  searchInput.addEventListener('input', performSearch);
  searchButton.addEventListener('click', performSearch);
  
  // Filter on dropdown change
  categoryFilter.addEventListener('change', performSearch);
  difficultyFilter.addEventListener('change', performSearch);
  
  // Clear filters
  clearButton.addEventListener('click', clearAllFilters);
  
  // Search on Enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  const difficultyFilter = document.getElementById('difficultyFilter').value;
  
  let filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm) ||
      (recipe.ingredients && recipe.ingredients.toLowerCase().includes(searchTerm)) ||
      (recipe.instructions && recipe.instructions.toLowerCase().includes(searchTerm));
    
    const matchesCategory = !categoryFilter || recipe.category === categoryFilter;
    const matchesDifficulty = !difficultyFilter || recipe.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  displayRecipes(filteredRecipes);
  updateSearchInfo(filteredRecipes.length, searchTerm, categoryFilter, difficultyFilter);
}

function clearAllFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('difficultyFilter').value = '';
  displayRecipes(allRecipes);
  updateSearchInfo(allRecipes.length);
}

function updateSearchInfo(count, searchTerm = '', category = '', difficulty = '') {
  const searchInfo = document.getElementById('searchResults');
  let infoText = `Showing ${count} recipe${count !== 1 ? 's' : ''}`;
  
  const filters = [];
  if (searchTerm) filters.push(`matching "${searchTerm}"`);
  if (category) filters.push(`in ${category}`);
  if (difficulty) filters.push(`${difficulty} difficulty`);
  
  if (filters.length > 0) {
    infoText += ` ${filters.join(', ')}`;
  }
  
  searchInfo.textContent = infoText;
  searchInfo.style.display = count === allRecipes.length && !searchTerm && !category && !difficulty ? 'none' : 'block';
}

async function loadRecipes() {
  const res = await fetch("/recipes");
  const data = await res.json();
  allRecipes = data; // Store all recipes globally
  
  // Initialize search functionality if not already done
  if (!document.getElementById('searchInput').hasEventListeners) {
    initializeSearchFunctionality();
    document.getElementById('searchInput').hasEventListeners = true;
  }
  
  displayRecipes(allRecipes);
  updateSearchInfo(allRecipes.length);
}

function displayRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #6b8e23;">
        <h3>No recipes found!</h3>
        <p>Try adjusting your search or filters, or add a new recipe.</p>
      </div>
    `;
    return;
  }

  recipes.forEach(r => {
    const div = document.createElement("div");
    div.className = "recipe";
    div.innerHTML = `
      <button class="delete-btn" title="Delete Recipe">×</button>
      <h3>${r.title}</h3>
      <div class="recipe-meta">
        ${r.cooking_time ? `<span>⏱️ ${r.cooking_time}</span>` : ''}
        ${r.category ? `<span>🍽️ ${r.category}</span>` : ''}
        ${r.difficulty ? `<span>📊 ${r.difficulty}</span>` : ''}
      </div>
      ${r.ingredients ? `<p><strong>Ingredients:</strong><br>${r.ingredients.replace(/\n/g, '<br>')}</p>` : ''}
      ${r.instructions ? `<p><strong>Instructions:</strong><br>${r.instructions.replace(/\n/g, '<br>')}</p>` : ''}
    `;

    // Add delete functionality
    div.querySelector(".delete-btn").addEventListener("click", async () => {
      const confirmDelete = confirm(`Are you sure you want to delete "${r.title}"?`);
      if (!confirmDelete) return; // stop if user cancels

      await fetch(`/recipes/${r.recipe_id}`, { method: "DELETE" });
      loadRecipes(); // refresh the list after deleting
    });

    container.appendChild(div);
  });
}

document.getElementById("recipeForm").addEventListener("submit", async e => {
  e.preventDefault();

  const recipe = {
    title: document.getElementById("title").value,
    cooking_time: document.getElementById("cooking_time").value,
    category: document.getElementById("category").value,
    difficulty: document.getElementById("difficulty").value,
    ingredients: document.getElementById("ingredients").value,
    instructions: document.getElementById("instructions").value
  };

  await fetch("/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });

  document.getElementById("recipeForm").reset();
  
  // Show success message
  alert("Recipe added successfully! 🎉");
  
  // Navigate to browse recipes page to see the new recipe
  showRecipes();
});

// Initialize the app - show landing page first
document.addEventListener('DOMContentLoaded', function() {
  showLanding();
});
