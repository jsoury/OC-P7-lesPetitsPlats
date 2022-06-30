function filterFactory(data) {
  const { value, type } = data;
  const selectType = (type) => {
    switch (type) {
      case "ingredient":
        return "primary";
      case "appareil":
        return "success";
      case "ustensile":
        return "danger";
    }
  };
  const createFilter = () => {
    $wrapper = document.querySelector(".filter");

    const $badge = document.createElement("div");
    $badge.classList = `badge bg-${selectType(type)}`;
    $badge.innerHTML = `${value} <i class="far fa-times-circle" aria-hidden="true" onclick="removeBadge(event)"></i>`;
    $wrapper.appendChild($badge);
  };

  return { createFilter };
}
