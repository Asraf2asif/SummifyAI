import { summaryShow } from "../message/summaryShow";
import { typeTextByChar } from "../ui/typeTextByChar";

/**
 * Handles the click event of the send button.
 * If the textarea has a value, it waits for the message to be shown and then displays the synopsis.
 * Otherwise, it displays a message asking for a concept.
 */
export async function handleSendBtnClick(input, btn) {
  if (input.value.trim() !== '') {
    await summaryShow(input, btn); // Display the synopsis
  } else {
    // typeTextByChar("Please provide some concept...", movieBossText); // Display a message asking for a concept
  }
}
