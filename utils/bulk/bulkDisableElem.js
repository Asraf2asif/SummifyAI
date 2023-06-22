// Function to bulk update display property to "none"
export function bulkDisableElem(...elements) {
  elements.forEach((element) => {
    elements.disabled = true;
  });
}