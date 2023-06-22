import { data } from "../../data";
import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";
import { fetchBotReply } from "../fetch/fetchBotReply";

// Get the necessary DOM elements
const setupTextarea = document.getElementById("setup-textarea"); // Textarea input
const movieBossText = document.getElementById("movie-boss-text"); // Output text container
const outputContainer = document.getElementById("output-container"); // Output Text Container
const inputContainer = document.getElementById("input-container"); // Output Text Container
const inputText = document.getElementById("input-text"); // Input Text
const outputTitle = document.getElementById("output-title"); // Output Text

const messageElement = document.createElement('p');

export async function waitMsgShow() {
  loadingState();
  // Display the output container
  inputContainer.style.display = "block";
  inputText.textContent = setupTextarea.value;

  const { initMsgData } = data;
  
  // Function to fetch init bot message
  const initMsg = await fetchBotReply({
    dataArray: initMsgData,
    resType: "message",
    outline: setupTextarea.value,
    outputTextElement: movieBossText,
  });
  // Display the output container
  outputContainer.style.display = "block";
  if (initMsg) {
    outputContainer.appendChild(messageElement);
    typeTextByChar(initMsg, messageElement, null, ()=>{
      setTimeout(() => {
        outputContainer.removeChild(messageElement);
      }, 100);
    });
  }else{
    outputTitle.textContent = "...";
  }
}
