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

// Function to add HTML to a specified parent element and update the value of the <p> element
function addChatMessage(parentElement, message, messageType, containerToRemove = null, callback = null, typeText = true) {
  return new Promise((resolve) => {
    // Check if the containerToRemove parameter is provided and is a valid element
    if (containerToRemove instanceof Element) {
      // Remove the previous loading container from the parent element
      parentElement.removeChild(containerToRemove);
    }

    // Create a container div
    const container = document.createElement('div');
    container.className = `chat-message ${messageType}`;

    // Check if the message type is 'chatbot'
    if (messageType === 'chatbot') {
      // Create an image element
      const image = document.createElement('img');
      image.src = './images/logo-gray.png';
      image.className = 'logo';
      image.alt = 'SummifyAI logo';

      // Append the image to the container
      container.appendChild(image);
    }

    if (message.trim() !== '') {
      // Create a message element
      const paragraph = document.createElement('p');

      if (typeText) {
        typeTextByChar(message, paragraph).then(() => {
          if (callback && typeof callback === 'function') {
            callback(); // Execute the callback function
          }
          resolve(container); // Resolve the promise with the container element
        });
      } else {
        // Add the message as a whole without typing
        paragraph.textContent = message;
      }

      // Append the message element to the container
      container.appendChild(paragraph);

      if (!typeText && callback && typeof callback === 'function') {
        callback(); // Execute the callback function
      }

      resolve(container); // Resolve the promise with the container element
    } else {
      // Create the loading image element
      const loadingImage = document.createElement('img');
      loadingImage.src = 'images/loading.svg';
      loadingImage.className = 'loading';
      loadingImage.id = 'loading';
      loadingImage.alt = 'Loading image';

      // Append the loading image element to the container
      container.appendChild(loadingImage);

      if (callback && typeof callback === 'function') {
        callback(); // Execute the callback function
      }

      resolve(container); // Resolve the promise with the container element
    }

    // Check if the parent element exists
    if (parentElement instanceof Element) {
      // Append the container to the parent element
      parentElement.appendChild(container);
    } else {
      console.error('Invalid parent element provided.');
    }
  });
}



// Function to generate the synopsis
const generateSummary = async (prompt) => {
  const { synopsisData } = data; // Get the synopsis data from the imported data

  const synopsis = await fetchBotReply({
    dataArray: synopsisData,
    resType: "summary",
    outline: prompt,
    max_tokens: 9,
    outputTextElement: outputText,
    outputContainerElement: outputContainer,
  }); // Fetch the synopsis

  return synopsis;
};


export async function summaryShow(input, btn) {
  loadingState(); // Set loading state

  // Example usage
  const chatContainer = document.querySelector('.chat-container');
  await addChatMessage(chatContainer, input.value, 'user', null, async () => {
    // Rest of the code
    const chatbotMsg = await addChatMessage(chatContainer, '', 'chatbot');
    const summary = await generateSummary(input.value);

    if (summary && chatbotMsg) {
      await addChatMessage(chatContainer, summary, 'chatbot', chatbotMsg, null);
      resetLoading(); // Reset the loading state
      input.value = ""; // Clear the setup input
      input.select(); // Select the setup input
    }
  },false);
}

// max_tokens, 1500