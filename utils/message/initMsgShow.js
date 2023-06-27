import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";

// Get the necessary DOM elements
const initChatMsg = document.getElementById("init-chat-msg"); // Output text container

const defaultMsg =
  "Please provide the content you would like me to summarize using SummifyAI professionally and concisely.";

export async function initMsgShow() {
  loadingState();
  // Initial message
  await typeTextByChar(defaultMsg, initChatMsg, 0);
  resetLoading()
}
