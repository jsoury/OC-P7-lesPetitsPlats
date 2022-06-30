const removeChild = ($wrapper) => {
  while ($wrapper.firstChild) {
    $wrapper.removeChild($wrapper.firstChild);
  }
};
