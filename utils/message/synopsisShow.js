import { data } from "../../data";
import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";
import { fetchBotReply } from "../fetch/fetchBotReply";

// Get the necessary DOM elements
const setupTextarea = document.getElementById("setup-textarea"); // Textarea input
const outputTitle = document.getElementById("output-title"); // Output title element
const outputText = document.getElementById("output-text"); // Output text element
const outputContainer = document.getElementById("output-container"); // Output container element
const inputContainer = document.getElementById("input-container"); // Input container element
const movieBossText = document.getElementById("movie-boss-text"); // Movie boss text element
const inputText = document.getElementById("input-text"); // Input Text

// Function to show a message in the output container
const showMessage = (text) => {
  const messageElement = document.createElement("p"); // Create a new paragraph element
  outputContainer.appendChild(messageElement); // Append the message element to the output container
  typeTextByChar(text, messageElement); // Type the text character by character in the message element
  return messageElement; // Return the created message element
};

// Function to remove a message from the output container
const removeMessage = (messageElement) => {
  if (messageElement && messageElement.parentNode) {
    outputContainer.removeChild(messageElement); // Remove the message element from the output container
  }
};

// Function to show a message for synopsis generation
const showSynopsisGenerationMessage = () => {
  const messageElement = showMessage(
    "Generating movie synopsis based on your concept..."
  );
  return messageElement;
};

// Function to show a message for synopsis generated
const showSynopsisGeneratedMessage = () => {
  const messageElement = showMessage(
    "✔️ Movie synopsis generated based on your concept..."
  );
  return messageElement;
};


// Function to generate the synopsis
const generateSynopsis = async (prompt) => {
  const { synopsisData } = data; // Get the synopsis data from the imported data

  const messageElement1 = showSynopsisGenerationMessage(); // Show the message indicating synopsis generation

  const synopsis = await fetchBotReply({
    dataArray: synopsisData,
    resType: "summary",
    outline: prompt,
    max_tokens: 2000,
    outputTextElement: outputText,
    outputContainerElement: outputContainer,
  }); // Fetch the synopsis

  removeMessage(messageElement1); // Remove the message indicating synopsis generation

  return synopsis;
};


// Main function to display the synopsis and movie title
export async function synopsisShow() {
  loadingState(); // Set loading state

  inputContainer.style.display = "block"; // Show input container
  inputText.textContent = setupTextarea.value; // Set input text

  outputContainer.style.display = "block"; // Show output container

  const synopsis = await generateSynopsis(setupTextarea.value); // Generate the synopsis

  if (synopsis) {
  typeTextByChar(synopsis, outputText, null, () => {
    resetLoading(); // Reset the loading state
    setupTextarea.value = ""; // Clear the setup textarea
    setupTextarea.select(); // Select the setup textarea
  }); // Type the synopsis character by character in the output text    
  }
}
