function dropdownFactory(data) {
  [ingredients, appareils, ustensiles] = data;
  const createDropdownIngredients = () => {
    const $wrapper = document.querySelector("#dropdownIngredients ul");
    removeChild($wrapper);
    ingredients.forEach((ingredient) => {
      const $element = document.createElement("li");
      $element.insertAdjacentHTML(
        "afterbegin",
        `<a class="dropdown-item" href=#>${ingredient}</a>`
      );
      $wrapper.appendChild($element);
    });
  };
  const createDropdownAppareils = () => {
    const $wrapper = document.querySelector("#dropdownAppareils ul");
    removeChild($wrapper);
    appareils.forEach((appareil) => {
      const $element = document.createElement("li");
      $element.insertAdjacentHTML(
        "afterbegin",
        `<a class="dropdown-item" href=#>${appareil}</a>`
      );
      $wrapper.appendChild($element);
    });
  };
  const createDropdownUstensiles = () => {
    const $wrapper = document.querySelector("#dropdownUstensiles ul");
    removeChild($wrapper);
    ustensiles.forEach((ustensile) => {
      const $element = document.createElement("li");
      $element.insertAdjacentHTML(
        "afterbegin",
        `<a class="dropdown-item" href=#>${ustensile}</a>`
      );
      $wrapper.appendChild($element);
    });
  };

  const createDropdown = () => {
    createDropdownIngredients();
    createDropdownAppareils();
    createDropdownUstensiles();
  };
  return {
    createDropdown,
    createDropdownIngredients,
    createDropdownAppareils,
    createDropdownUstensiles,
  };
}
