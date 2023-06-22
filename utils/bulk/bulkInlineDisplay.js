// Function to bulk update display property to "inline"
export function bulkInlineDisplay(...elements) {
  elements.forEach((element) => {
    element.style.display = "inline";
  });
}