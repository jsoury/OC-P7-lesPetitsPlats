const dataFilter = (valueSearch, data) => {
  valueSearch = valueSearch.toLowerCase();
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const nameRecipe = data[i].name.toLowerCase();
    const indexRecipe = nameRecipe.indexOf(valueSearch);

    const description = data[i].description.toLowerCase();
    const indexDescription = description.indexOf(valueSearch);

    if (indexRecipe !== -1) result.push(data[i]);
    else if (indexDescription !== -1) result.push(data[i]);

    for (let y = 0; y < data[i].ingredients.length; y++) {
      const nameIngredient = data[i].ingredients[y].ingredient.toLowerCase();
      let indexIngredient = nameIngredient.indexOf(valueSearch);

      if (indexIngredient !== -1) result.push(data[i]);
    }
  }
  return [...new Set(result)];
};

// const dataFilter = (valueSearch, data) => {
//   valueSearch = valueSearch.toLowerCase();
//   let recipes = data.filter(({ name }) =>
//     name.toLowerCase().includes(valueSearch)
//   );

//   let recipesByIngredient = data.filter(({ ingredients }) => {
//     let ingredientInRecipe = ingredients.filter(({ ingredient }) =>
//       ingredient.toLowerCase().includes(valueSearch)
//     );
//     if (ingredientInRecipe.length > 0) return data;
//   });

//   let description = data.filter(({ description }) => {
//     let wordInDescription = description
//       .split(" ")
//       .filter((word) => word.toLowerCase().includes(valueSearch));
//     console.log(wordInDescription);
//     if (wordInDescription.length > 0) return data;
//   });
//   const result = recipes.concat(recipesByIngredient).concat(description);
//   return [...new Set(result)];
// };

const dataFilterByTag = (tag, data) => {
  let result = [];
  if (tag.type === "ingredient") {
    let recipesByIngredient = data.filter(({ ingredients }) =>
      ingredients.some(({ ingredient }) => ingredient === tag.value)
    );
    result = result.concat(recipesByIngredient);
  } else if (tag.type === "appareil") {
    let recipesByAppareil = data.filter(
      ({ appliance }) => appliance.toLowerCase() === tag.value.toLowerCase()
    );
    result = result.concat(recipesByAppareil);
  } else if (tag.type === "ustensile") {
    let recipesByUstensile = data.filter(({ ustensils }) =>
      ustensils.some(
        (ustensil) => ustensil.toLowerCase() === tag.value.toLowerCase()
      )
    );

    result = result.concat(recipesByUstensile);
  }

  return result;
};
