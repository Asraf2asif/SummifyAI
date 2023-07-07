import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";

// Get the necessary DOM elements
const initChatMsg = document.getElementById("init-chat-msg"); // Output text container

const defaultMsg =
  "Please provide the content you want to summarize using SummifyAI concisely and professionally.";

export async function initMsgShow() {
  loadingState();
  // Initial message
  await typeTextByChar(defaultMsg, initChatMsg, 0);
  resetLoading();
}
