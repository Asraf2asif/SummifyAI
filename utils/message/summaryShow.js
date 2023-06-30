import { data } from "../../data";
import { loadingState } from "../state/loadingState";
import { resetLoading } from "../state/resetLoading";
import { typeTextByChar } from "../ui/typeTextByChar";
import { fetchBotReply } from "../fetch/fetchBotReply";

/**
 * Get the necessary DOM elements
 */
const setupTextarea = document.getElementById("setup-textarea"); // Textarea input
const outputTitle = document.getElementById("output-title"); // Output title element
const outputText = document.getElementById("output-text"); // Output text element
const outputContainer = document.getElementById("output-container"); // Output container element
const inputContainer = document.getElementById("input-container"); // Input container element
const movieBossText = document.getElementById("movie-boss-text"); // Movie boss text element
const inputText = document.getElementById("input-text"); // Input Text

/**
 * Create an image element with the specified source, class name, and alt text.
 *
 * @param {string} src - The source URL of the image.
 * @param {string} className - The class name to assign to the image element.
 * @param {string} alt - The alt text of the image.
 * @returns {HTMLImageElement} - The created image element.
 */
function createImage(src, className, alt) {
  const image = document.createElement('img');
  image.src = src;
  image.className = className;
  image.alt = alt;
  return image;
}

/**
 * Create a chat container element based on the specified message type.
 *
 * @param {string} messageType - The type of the chat message (e.g., 'user', 'chatbot').
 * @returns {HTMLDivElement} - The created chat container element.
 */
function createChatContainer(messageType) {
  const container = document.createElement('div');
  container.className = `chat-message ${messageType}`;

  // If the message type is 'chatbot', add a logo image to the container.
  if (messageType === 'chatbot') {
    const image = createImage('./images/logo-gray.png', 'logo', 'SummifyAI logo');
    container.appendChild(image);
  }

  return container;
}

function createButtons(element) {
  // Create the buttons container element
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');

  // Define the button data
  const buttonData = [
    { class: 'copy-button', iconClass: 'fa-regular fa-clipboard', text: 'Copy', handler: handleCopyButtonClick },
    { class: 'download-button', iconClass: 'fa-regular fa-floppy-disk', text: 'Save', handler: handleDownloadButtonClick },
    { class: 'repeat-button', iconClass: 'fa-solid fa-repeat', text: 'Redo', handler: handleRepeatButtonClick }
  ];

  // Create buttons based on button data
  buttonData.forEach(buttonInfo => {
    const button = createButton(buttonInfo);
    buttonsContainer.appendChild(button);
  });

  // Append the buttons container to the element
  element.appendChild(buttonsContainer);
}

function createButton(buttonInfo) {
  const button = document.createElement('button');
  button.classList.add(buttonInfo.class);
  button.innerHTML = `<i class="${buttonInfo.iconClass}"></i> ${buttonInfo.text}`;
  button.addEventListener('click', buttonInfo.handler);
  return button;
}

// Event listener for copy button click
function handleCopyButtonClick(event) {
  const button = event.target;

  if (copyToClipboard(button)) {
    // Update the button's innerHTML with the new icon and text
    button.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;

    // Revert back to previous state after 2 seconds
    setTimeout(() => {
      button.innerHTML = '<i class="fa-regular fa-clipboard"></i> Copy';
    }, 2000);
  }
}

// Event listener for download button click
function handleDownloadButtonClick(event) {
  // Add your code to handle the download button click event
  const button = event.target;
  button.innerHTML = `<i class="fa-regular fa-floppy-disk"></i> Saving`;
  
  // Find the upper label's text
  const label = findUpperLabel(button, 'p', 'message-content');

  if (label) {
    const { summary_footer } = data.summaryData[1];

    const text = label.textContent + "\n" + summary_footer;

    const brandMsg = "Summarized by SummifyAI";

    downloadTextAsFile(text, `${brandMsg} on ${getFormattedDate("-")}`, () => {
      // Update the button's innerHTML with the new icon and text
      button.innerHTML = `<i class="fa-solid fa-check"></i> Saved`;

      // Revert back to previous state after 2 seconds
      setTimeout(() => {
        button.innerHTML = '<i class="fa-regular fa-floppy-disk"></i> Save';
      }, 2000);
    });
  } else {
    console.error('Failed to find upper label');
    return false;
  }
}


// Event listener for repeat button click
function handleRepeatButtonClick() {
  // Add your code to handle the repeat button click event
  console.log('Repeat button clicked');
}

function getFormattedDate(timeSeparator=":") {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    // Format the time (hour, minute, second, AM/PM) manually
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHours = hours % 12 || 12;
    const time = `${twelveHours.toString().padStart(2, '0')}${timeSeparator}${minutes.toString().padStart(2, '0')}${timeSeparator}${seconds.toString().padStart(2, '0')} ${ampm}`;

    // Create the formatted date string
    const formattedDate = `${day}th ${month}, ${year}, ${time}`;

    return formattedDate;
  } catch (error) {
    console.error("Error occurred while formatting the date:", error);
    return "Error occurred while formatting the date.";
  }
}


/**
 * Add a chat message to the parent element based on the specified parameters.
 *
 * @param {HTMLElement} parentElement - The parent element to which the chat message will be added.
 * @param {string} message - The content of the chat message.
 * @param {string} messageType - The type of the chat message (e.g., 'user', 'chatbot').
 * @param {HTMLElement|null} containerToRemove - The container element to be removed from the parent element.
 * @param {Function|null} callback - The callback function to execute after adding the chat message.
 * @param {boolean} typeText - A flag indicating whether to type the message character by character.
 * @returns {Promise<HTMLDivElement>} - A promise that resolves to the created chat container element.
 */
function addChatMessage(parentElement, message, messageType, containerToRemove = null, callback = null, typeText = true) {
  return new Promise((resolve) => {
    // If a container to remove is provided, remove it from the parent element.
    if (containerToRemove instanceof Element) {
      parentElement.removeChild(containerToRemove);
    }

    const container = createChatContainer(messageType);

    if (message.trim() !== '') {
      // Create a message content
      const messageContent = document.createElement('div');
      messageContent.className = "message-content";
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
      messageContent.appendChild(paragraph);
      if (messageType === 'chatbot') {
        createButtons(messageContent)
      }
      // Append the message element to the container
      container.appendChild(messageContent);

      

      if (!typeText && callback && typeof callback === 'function') {
        callback(); // Execute the callback function
      }

      resolve(container); // Resolve the promise with the container element
    } else {
      // If the message is empty, show a loading image in the container.
      const loadingImage = createImage('images/loading.svg', 'loading', 'Loading image');
      container.appendChild(loadingImage);

      if (callback && typeof callback === 'function') {
        callback();
      }

      resolve(container);
    }

    // Append the container to the parent element.
    if (parentElement instanceof Element) {
      parentElement.appendChild(container);
    } else {
      console.error('Invalid parent element provided.');
    }
  });
}

/**
 * Generate a summary based on the provided prompt.
 *
 * @param {string} prompt - The prompt for generating the summary.
 * @returns {Promise<string>} - A promise that resolves to the generated summary.
 */
const generateSummary = async (prompt) => {
  const { summaryData } = data; // Get the summary data from the imported data

  const summaryFetch = await fetchBotReply({
    dataArray: summaryData,
    resType: "summary",
    outline: prompt,
    max_tokens: 9,
    outputTextElement: outputText,
    outputContainerElement: outputContainer,
  }); // Fetch the summary

  return summaryFetch;
};

/**
 * Show the summary based on the provided input.
 *
 * @param {HTMLInputElement} input - The input element containing the user's input.
 * @param {HTMLButtonElement} btn - The button element triggering the summary show.
 * @returns {Promise<void>} - A promise that resolves after showing the summary.
 */
export async function summaryShow(input, btn) {
  loadingState(); // Set loading state

  const chatContainer = document.querySelector('.chat-container');
  
  // Add user input to the chat container
  await addChatMessage(chatContainer, input.value, 'user', null, async () => {
    // Rest of the code
    const chatbotMsg = await addChatMessage(chatContainer, '', 'chatbot');
    // const summary = await generateSummary(input.value);
    const summary = "await generateSummary(input.value)";
    if (summary && chatbotMsg) {
      await addChatMessage(chatContainer, summary, 'chatbot', chatbotMsg, null);
      resetLoading(); // Reset the loading state
      input.value = ""; // Clear the setup input
      input.select(); // Select the setup input
    }
  }, false);
}

// max_tokens, 1500

/**
 * Copies text to the clipboard by creating a temporary textarea element.
 * @param {string} text - The text to be copied.
 * @returns {boolean} - A flag indicating whether the text was successfully copied.
 */
function copyToClipboard(targetElement) {
   // Find the upper label's text
  const label = findUpperLabel(targetElement, 'p', 'message-content');

  if (label) {
    const text = label.textContent;

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    const success = document.execCommand('copy');

    // Clean up by removing the textarea
    document.body.removeChild(textarea);

    if (success) {
      return true;
    } else {
      console.error('Failed to copy text to clipboard');
      return false;
    }
  } else {
    console.error('Failed to find upper label');
    return false;
  }
}


function findUpperLabel(element, tagName, className = null) {
  let parent = element.parentNode;
  let count = 0;
  while (parent && count < 3) {
    if (!className && parent.nodeType === 1 && parent.tagName.toLowerCase() === tagName) {
      return parent;
    } else if (className && parent.nodeType === 1 && parent.classList.contains(className) && parent.querySelector(tagName)) {
      return parent.querySelector(tagName);
    }

    parent = parent.parentNode;
    count++;
  }
  return null;
}

/**
 * Downloads the text content as a file with the specified filename.
 * @param {string} text - The text content to be saved as a file.
 * @param {string} filename - The desired filename of the downloaded file.
 * @param {function} callback - The callback function to be executed after the download is complete.
 */
function downloadTextAsFile(text, filename, callback) {
  // Create a blob from the text content
  const blob = new Blob([text], { type: 'text/plain' });

  // Check if the download attribute is supported
  if ('download' in document.createElement('a')) {
    // Create a download link element
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;

    // Programmatically trigger the download
    downloadLink.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(downloadLink.href);

    // Execute the callback function after the download is complete
    if (typeof callback === 'function') {
      callback();
    }
  } else {
    // For older browsers, open a new window with the data URI
    const windowRef = window.open('', '_blank');
    windowRef.document.write(text);
    windowRef.document.close();
    windowRef.document.execCommand('SaveAs', true, filename);
    windowRef.close();

    // Execute the callback function after the download is complete
    if (typeof callback === 'function') {
      callback();
    }
  }
}

