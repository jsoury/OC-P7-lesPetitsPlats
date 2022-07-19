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
  factoryDropdown.createDropdown();
};

const addFilterIngredients = () => {
  $ingredients = document.querySelectorAll(
    "#dropdownIngredients .dropdown-item"
  );
  $ingredients.forEach((ingredient) => {
    ingredient.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "ingredient" });
      searchRecipes($INPUT.value);
      emptyInputDropdown("ingredients");
    });
  });
};
const addFilterAppareils = () => {
  $appareils = document.querySelectorAll("#dropdownAppareils .dropdown-item");
  $appareils.forEach((appareil) => {
    appareil.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "appareil" });
      searchRecipes($INPUT.value);
      emptyInputDropdown("appareils");
    });
  });
};
const addFilterUstensiles = () => {
  $ustensiles = document.querySelectorAll("#dropdownUstensiles .dropdown-item");
  $ustensiles.forEach((ustensile) => {
    ustensile.addEventListener("click", (event) => {
      creatBadge({ value: event.currentTarget.innerText, type: "ustensile" });
      searchRecipes($INPUT.value);
      emptyInputDropdown("ustensiles");
    });
  });
};

const addFilter = () => {
  addFilterIngredients();
  addFilterAppareils();
  addFilterUstensiles();
};

const creatBadge = (data) => {
  const factoryFilter = filterFactory(data);
  factoryFilter.createFilter();
};

const removeBadge = (event) => {
  event.currentTarget.parentNode.remove();
  searchRecipes($INPUT.value);
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
    DATA = recipes;
    DATA = dataFilter(value, DATA);
    filterValues.forEach((tag) => {
      DATA = dataFilterByTag(tag, DATA);
    });
    refreshDisplay(DATA);
  } else if (!value && filterValues.length != 0) {
    DATA = recipes;
    filterValues.forEach((tag) => {
      DATA = dataFilterByTag(tag, DATA);
    });
    refreshDisplay(DATA);
  } else {
    DATA = recipes;
    refreshDisplay(DATA);
  }
};

const lisenInputIngredientsValue = () => {
  const $ListInput = document.querySelectorAll(".dropdown-list input");
  $ListInput.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      filterDropdownlist(event.target.id, event.target.value);
    });
  });
};

const filterDropdownlist = (dropdownId, value) => {
  let dataDropdown = [];
  DATA.forEach((recipes) => {
    if (dropdownId === "ingredients") {
      recipes.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(value.toLowerCase()))
          dataDropdown.push(capitalize(ingredient.ingredient));
      });
      dataDropdown = [...new Set(dataDropdown)];
    }
    if (dropdownId === "appareils") {
      if (recipes.appliance.toLowerCase().includes(value.toLowerCase()))
        dataDropdown.push(capitalize(recipes.appliance));
      dataDropdown = [...new Set(dataDropdown)];
    }
    if (dropdownId === "ustensiles") {
      recipes.ustensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(value.toLowerCase()))
          dataDropdown.push(capitalize(ustensil));
      });
      dataDropdown = [...new Set(dataDropdown)];
    }
  });
  if (dropdownId === "ingredients") {
    const data = [dataDropdown, [], []];
    const factoryDropdown = dropdownFactory(data);
    factoryDropdown.createDropdownIngredients();
    addFilterIngredients();
  }
  if (dropdownId === "appareils") {
    const data = [[], dataDropdown, []];
    const factoryDropdown = dropdownFactory(data);
    factoryDropdown.createDropdownAppareils();
    addFilterAppareils();
  }
  if (dropdownId === "ustensiles") {
    const data = [[], [], dataDropdown];
    const factoryDropdown = dropdownFactory(data);
    factoryDropdown.createDropdownUstensiles();
    addFilterUstensiles();
  }
};

const refreshDisplay = (data) => {
  data.length != 0
    ? (makeAllRecipes(data), creatDropdown(data), addFilter())
    : makeAllRecipes();
};

const getFiltersValues = () => {
  let filterValues = [];
  const $filters = document.querySelector(".filter");
  for (element of $filters.children)
    filterValues.push({
      type: element.dataset.type,
      value: element.innerText.trim(),
    });

  return filterValues;
};

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const emptyInputDropdown = (inputId) => {
  const $input = document.querySelector(`#${inputId}`);
  $input.value = "";
};

async function init() {
  await makeAllRecipes(DATA);
  await creatDropdown(DATA);
  await addFilter();
  await lisenInputsearchValue();
  await lisenInputIngredientsValue();
}

window.addEventListener("load", () => {
  init();
});
