import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";

// Get the necessary DOM elements
const movieBossText = document.getElementById("movie-boss-text"); // Output text container

const defaultMsg =
  "Transform Your Ideas into Blockbusters with a Single Movie Concept." +
  " Get a Movie Title, Synopsis, Poster, and Cast, All Powered by AI!";

export function initMsgShow() {
  loadingState();
  // Initial message
  typeTextByChar(defaultMsg, movieBossText, 0, resetLoading);
}
