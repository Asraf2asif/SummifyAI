import {
  validateArrayParameter,
  validateStringParameter,
  validateHtmlElementParameter,
  validateNumberParameter,
  handleError,
} from "../error/handleError";

// Summarize the given text by extracting all the necessary information and ensuring that no important details are left out.

import { fewShotPromptGen } from "./fewShotPromptGen";
import { openai } from "../../openaiConfig";

/**
 * Fetches the bot reply based on the provided parameters.
 * @param {object} options - The options object containing the parameters for fetching the bot reply.
 * @param {Array} options.dataArray - The data array parameter.
 * @param {string} options.resType - The resType parameter.
 * @param {string} options.outline - The outline parameter.
 * @param {string} options.prompt - The prompt parameter.
 * @param {number} options.max_tokens - The max_tokens parameter.
 * @param {HTMLElement} options.outputTextElement - The HTML element for displaying the bot reply.
 * @param {HTMLElement} options.outputContainerElement - The HTML element for displaying the error message.
 * @returns {string} The bot's response text.
 */
export async function fetchBotReply({
  dataArray = null,
  resType = null,
  outline = null,
  prompt = null,
  max_tokens = 1, 
  outputTextElement = null,
  outputContainerElement = null,
}) {
  try {
    // Validate the input parameters
    validateParameters(
      dataArray,
      resType,
      outline,
      prompt,
      max_tokens,
      outputTextElement,
      outputContainerElement
    );

    // Send request to API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt ? prompt : fewShotPromptGen(dataArray, resType, outline), // Construct the prompt string
      temperature: .5,
      max_tokens: max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const { choices } = response.data;
    console.log(choices)
    const respondedText = choices[0].text.trim();

    return respondedText;
  } catch (error) {
    // Handle errors
    handleError(
      error,
      outputContainerElement,
      outputTextElement,
      "An error occurred while fetching the bot reply."
    );
  }
}

/**
 * Validates the input parameters.
 * @param {Array} dataArray - The data array parameter.
 * @param {string} resType - The resType parameter.
 * @param {string} outline - The outline parameter.
 * @param {string} prompt - The prompt parameter.
 * @param {number} max_tokens - The max_tokens parameter.
 * @param {HTMLElement} outputTextElement - The HTML element for displaying the error text.
 * @param {HTMLElement} outputContainerElement - The HTML element for displaying the error message.
 * @throws {Error} If any of the input parameters are invalid.
 */
function validateParameters(
  dataArray,
  resType,
  outline,
  prompt,
  max_tokens,
  outputTextElement,
  outputContainerElement
) {
  validateArrayParameter(dataArray, "data array", false);
  validateStringParameter(resType, "res type", false);
  validateStringParameter(outline, "outline", false);
  validateStringParameter(prompt, "prompt", false);
  validateHtmlElementParameter(outputTextElement, "output text element", false);
  validateHtmlElementParameter(
    outputContainerElement,
    "output container element",
    false
  );
  validateNumberParameter(max_tokens, "max tokens");
}

// max_tokens, 100