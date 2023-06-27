import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";

// Get the necessary DOM elements
const movieBossText = document.getElementById("movie-boss-text"); // Output text container

const defaultMsg =
  "Please provide the content you would like me to summarize using SummifyAI professionally and concisely.";

export function initMsgShow() {
  loadingState();
  // Initial message
  typeTextByChar(defaultMsg, movieBossText, 0, resetLoading);
}
