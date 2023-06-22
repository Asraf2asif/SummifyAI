// Function to bulk update display property to "none"
export function bulkEnableElem(...elements) {
  elements.forEach((element) => {
    elements.disabled = false;
  });
}