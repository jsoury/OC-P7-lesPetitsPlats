let DATA = recipes;
const $INPUT = document.querySelector("#searchBar");

const makeAllRecipes = (recipes) => {
  const $wrapper = document.querySelector(".recipes");
  removeChild($wrapper);
  recipes && recipes != 0
    ? recipes.forEach((recipe) => {
        const factoryRecipes = recipesFactory(recipe);
        const cardRecipe = factoryRecipes.createRecipeCard();
        $wrapper.appendChild(cardRecipe);
        const cardIngredients = factoryRecipes.makeCardIngredients();
      })
    : ($wrapper.innerText =
        "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.");
};

const creatDropdown = (recipes) => {
  const ingredients = [];
  const appareils = [];
  const ustensiles = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(capitalize(ingredient.ingredient));
    });
    recipe.ustensils.forEach((ustensile) => {
      ustensiles.push(capitalize(ustensile));
    });
    appareils.push(capitalize(recipe.appliance));
  });

  const IngredientsUnique = [...new Set(ingredients)];
  const appareilsUnique = [...new Set(appareils)];
  const ustensileUnique = [...new Set(ustensiles)];

  const data = [IngredientsUnique, appareilsUnique, ustensileUnique];
  const factoryDropdown = dropdownFactory(data);
  const dropDownElement = factoryDropdown.createDropdown();
};

const creatBadge = (data) => {
  const factoryFilter = filterFactory(data);
  factoryFilter.createFilter();
};

const removeBadge = (event) => {
  event.currentTarget.parentNode.remove();
  searchRecipes($INPUT.value);
};

const addFilterIngredients = () => {
  $ingredients = document.querySelectorAll(
    "#dropdownIngredients .dropdown-item"
  );
  $ingredients.forEach((ingredient) => {
    ingredient.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "ingredient" });
      searchRecipes($INPUT.value);
    });
  });
};
const addFilterAppareils = () => {
  $appareils = document.querySelectorAll("#dropdownAppareils .dropdown-item");
  $appareils.forEach((appareil) => {
    appareil.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "appareil" });
      searchRecipes();
    });
  });
};
const addFilterUstensiles = () => {
  $ustensiles = document.querySelectorAll("#dropdownUstensiles .dropdown-item");
  $ustensiles.forEach((ustensile) => {
    ustensile.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "ustensile" });
      searchRecipes();
    });
  });
};

const addFilter = () => {
  addFilterIngredients();
  addFilterAppareils();
  addFilterUstensiles();
};

const lisenInputsearchValue = () => {
  $INPUT.addEventListener("keyup", (event) => {
    const value = event.target.value;
    if (value.length > 2) {
      searchRecipes(value);
    } else if (value.length === 0 || value.length <= 2) {
      searchRecipes();
    }
  });
};

const searchRecipes = (value) => {
  const filterValues = getFiltersValues();

  if (value && filterValues.length === 0) {
    DATA = recipes;
    DATA = dataFilter(value, DATA);
    refreshDisplay(DATA);
  } else if (value && filterValues.length != 0) {
    DATA = dataFilter(value, DATA);
    filterValues.forEach((filter) => {
      DATA = searchRecipesByFilter(filter);
    });
    refreshDisplay(DATA);
  } else if (!value && filterValues.length != 0) {
    DATA = recipes;
    filterValues.forEach((filter) => {
      DATA = searchRecipesByFilter(filter);
    });
    refreshDisplay(DATA);
  } else {
    DATA = recipes;
    refreshDisplay(DATA);
  }
};

const refreshDisplay = (data) => {
  data.length != 0
    ? (makeAllRecipes(data), creatDropdown(data), addFilter())
    : makeAllRecipes();
};

const searchRecipesByFilter = (value) => {
  DATA = dataFilter(value, DATA);
  return DATA;
};

const getFiltersValues = () => {
  let filterValues = [];
  const $filters = document.querySelector(".filter");
  for (element of $filters.children)
    filterValues.push(element.innerText.trim());

  return filterValues;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function init() {
  await makeAllRecipes(DATA);
  await creatDropdown(DATA);
  await addFilter();
  await lisenInputsearchValue();
}

window.addEventListener("load", () => {
  init();
});
