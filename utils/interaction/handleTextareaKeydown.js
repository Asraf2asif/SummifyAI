// Get the necessary DOM elements
const sendBtn = document.getElementById("send-btn"); // Send button

/**
 * Handles the keydown event of the textarea.
 * If the Enter key is pressed without the Shift key, it prevents the default behavior and triggers the send button click.
 * @param {Event} event - The keydown event object.
 */
export function handleTextareaKeydown(event) {
  // Check if Enter key is pressed without Shift key
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevent default Enter key behavior
    sendBtn.click(); // Trigger send button click
  }
}