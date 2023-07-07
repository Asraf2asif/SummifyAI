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

const lastPrompt = document.getElementById("last-prompt");

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

function createButtons(element, chatContainer) {
  // Create the buttons container element
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');

  // Define the button data
  const buttonData = [
    { class: 'copy-button', iconClass: 'fa-regular fa-clipboard', text: 'Copy', handler: handleCopyButtonClick },
    { class: 'download-button', iconClass: 'fa-regular fa-floppy-disk', text: 'Save', handler: handleDownloadButtonClick },
    { class: 'repeat-button', iconClass: 'fa-solid fa-repeat', text: 'Redo', handler: handleRepeatButtonClick.bind(null, chatContainer) }
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
    let { summary_footer } = data;

    // Replace the placeholders with the dynamic date and time strings
    summary_footer = summary_footer.replace('{{date}}', generateDateString());
    summary_footer = summary_footer.replace('{{time}}', generateTimeString());

    const text = label.textContent + "\n" + summary_footer;

    const brandMsg = "Summarized by SummifyAI";

    downloadTextAsFile(text, `${brandMsg} on ${generateDateString()}, ${generateTimeString("-")}`, () => {
      // Update the button's innerHTML with the new icon and text
      button.innerHTML = `<i class="fa-solid fa-check"></i> Saved`;

      // Revert back to previous state after 2 seconds
      setTimeout(() => {
        button.textContent = '';
        button.innerHTML = '<i class="fa-regular fa-floppy-disk"></i> Save';
      }, 2000);
    });
  } else {
    console.error('Failed to find upper label');
    return false;
  }
}


// Event listener for repeat button click
async function handleRepeatButtonClick(chatContainer, event) {
  // Add your code to handle the repeat button click event
  const label = findUpperLabel(event.target, '.user-prompt', 'message-content');
  lastPrompt.value = label.textContent
  // Update the button's innerHTML with the new icon and text
  event.target.innerHTML = `<i class="fa-solid fa-check"></i> Retrying`;

  await chatbotMsgShow(chatContainer, lastPrompt)
  event.target.innerHTML = '<i class="fa-solid fa-repeat"></i> Redo';
}

// Function to get the month name from the month number
function getMonthName(month) {
  var monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month];
}

// Function to add leading zeros to single-digit numbers
function addLeadingZero(number) {
  return number < 10 ? '0' + number : number;
}

// Function to generate the date string
function generateDateString() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var daySuffix = getDaySuffix(day);
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();
  return addLeadingZero(day) + daySuffix +' ' + getMonthName(month) + ', ' +  + year;
}

// Function to get the suffix for the day
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  
  var lastDigit = day % 10;
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Function to generate the time string
function generateTimeString(separator=":") {
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  return addLeadingZero(hours) + separator + addLeadingZero(minutes) + separator + addLeadingZero(seconds) + ' ' + ampm;
}


// Function to add a user message
function addUserMessage(parentElement, message,containerToRemove = null, callback = null, typeText = false) {
  return addChatMessage(parentElement, message, 'user', containerToRemove, callback, typeText);
}

// Function to add a chatbot message
function addChatbotMessage(parentElement, message, containerToRemove = null, callback = null, typeText = true) {
  return addChatMessage(parentElement, message, 'chatbot', containerToRemove, callback, typeText);
}

// The main function for adding chat messages (refactored)
function addChatMessage(parentElement, message, messageType, containerToRemove = null, callback = null, typeText = false) {
  return new Promise((resolve) => {
    // If a container to remove is provided, remove it from the parent element.
    if (containerToRemove instanceof Element) {
      parentElement.removeChild(containerToRemove);
    }

    const container = createChatContainer(messageType);

    if (message.trim() !== '') {
      if (messageType === 'user') {
        lastPrompt.value = message;
      }
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
        createButtons(messageContent, parentElement);
        const userPrompt = document.createElement('p');
        userPrompt.className = "user-prompt"
        userPrompt.style.display = "none"
        userPrompt.textContent = lastPrompt.value
        messageContent.appendChild(userPrompt);
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
       // Get the number of child elements in the container
      const childNumber = parentElement.childElementCount + 1;
      
      // Set the id of the messageContent using the child number
      container.id = `message-${childNumber}`;
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
    max_tokens: 1500,
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
export async function summaryShow(input, chatContainer) {
  loadingState(); // Set loading state

  await addUserMessage(chatContainer, input.value, null, async () => {
    await chatbotMsgShow(chatContainer, input)
  });
}

async function chatbotMsgShow(chatContainer, input){
  // const chatbotMsg = await addChatbotMessage(chatContainer, '');
  // const summary = input.value?input.value:input;
  const summary = input.value? await generateSummary(input.value) : await generateSummary(input);
  if (summary) {
    await addChatbotMessage(chatContainer, summary, null, () => {
      resetLoading(); // Reset the loading state
      // input.value = ""; // Clear the setup input
      input.select(); // Select the setup input
    });      
  }
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

