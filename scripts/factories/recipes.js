function recipesFactory(data) {
  const { id, name, ingredients, time, description, appliance, ustensils } =
    data;

  const makeCardIngredients = () => {
    const card = document.getElementById(`${id}`);
    const $cardIngredients = card.querySelector(`.card-ingredients`);
    ingredients.forEach((element) => {
      const $ingredient = `<li>${element.ingredient}${
        element.quantity ? ": " + element.quantity : ""
      } ${element.unit ? element.unit : ""}</li>`;
      $cardIngredients.innerHTML += $ingredient;
    });
  };

  const createRecipeCard = () => {
    const $card = document.createElement("div");
    $card.className = "card recipe";
    $card.setAttribute("id", id);
    const cardContent = `
            <img class="card-img-top" alt="">
            <div class="card-title">
              <h5>${name}</h5>
              <span class="card-time"><i class="fa-regular fa-clock"></i> ${time} min </span>
            </div>
            <div class="card-body">
            <ul class="card-ingredients"></ul>               
                <p class="card-description">${description}</p>
            </div>
      `;
    $card.innerHTML = cardContent;
    return $card;
  };
  return { createRecipeCard, makeCardIngredients };
}
