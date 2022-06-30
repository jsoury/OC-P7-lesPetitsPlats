const arrayToSort = ["za", "zb", "x", "c", "a", "ä"];
const arrayLength = arrayToSort.length;

//tri à bulles(bubble sort) simple et lent
const bubbleSort = (array) => {
  let isSwapped;
  do {
    isSwapped = false;
    const arrayLength = array.length;
    for (let i = 0; i < arrayLength - 1; i++) {
      if (array[i].localeCompare(array[i + 1]) === 1) {
        const tempLeftValue = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tempLeftValue;
        isSwapped = true;
      }
    }
  } while (isSwapped);
  return array;
};
//console.log(bubbleSort(arrayToSort));

//tri par insertion simple et lent avec beaucoup de données
const insertionSort = (array) => {
  for (let i = 1; i < arrayLength; i++) {
    const currentItem = array[i];
    let currentLeftIndex = i - 1;
    while (
      currentLeftIndex >= 0 &&
      array[currentLeftIndex].localeCompare(currentItem, "fr", {
        sensitivity: "base",
      }) === 1
    ) {
      array[currentLeftIndex + 1] = array[currentLeftIndex];
      currentLeftIndex--;
    }
    array[currentLeftIndex + 1] = currentItem;
  }
  return array;
};
//insertionSort(arrayToSort);

const dataFilter = (valueSearch, data) => {
  valueSearch = valueSearch.toLowerCase();
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const nameRecipe = data[i].name.toLowerCase();
    let indexRecipe = nameRecipe.indexOf(valueSearch);
    if (indexRecipe !== -1) result.push(data[i]);

    const indexAppliance = data[i].appliance.toLowerCase().indexOf(valueSearch);
    if (indexAppliance !== -1) result.push(data[i]);

    for (let y = 0; y < data[i].ingredients.length; y++) {
      const nameIngredient = data[i].ingredients[y].ingredient.toLowerCase();
      let indexIngredient = nameIngredient.indexOf(valueSearch);

      if (indexIngredient !== -1) result.push(data[i]);
    }

    for (let x = 0; x < data[i].ustensils.length; x++) {
      const nameUstensil = data[i].ustensils[x].toLowerCase();
      let indexUstensil = nameUstensil.indexOf(valueSearch);

      if (indexUstensil !== -1) result.push(data[i]);
    }
  }
  return [...new Set(result)];
};
