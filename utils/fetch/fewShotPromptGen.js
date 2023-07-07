import {
  validateStringParameter,
  validateArrayParameter,
  handleError,
} from "../error/handleError";

/**
 * Generates the prompt string for few-shot learning.
 * @param {Array} dataArray - The array of data samples.
 * @param {string} resType - The response type to include in the prompt.
 * @param {string} outline - The outline string to include in the prompt.
 * @returns {string} - The generated prompt string.
 */
export function fewShotPromptGen(dataArray, resType, outline) {
  try {
    // Check if the command property exists in the first data sample
    if (!dataArray[0].command) {
      throw new Error(`Not found command property in dataArray.`);
    }
    
    // Validate the input parameters
    validateParameters(dataArray, resType, outline);

    let promptStr = `${dataArray[0].command}\n`;

    for (let i = 1; i < dataArray.length; i++) {
      const outlineSample = dataArray[i]["outline"];

      // Check if the resType property exists in the current data sample
      if (!dataArray[i][resType]) {
        throw new Error(`Not found ${resType} property in dataArray[${i}].`);
      }

      const resTypeSample = dataArray[i][resType];
      promptStr += `###\narticle: ${outlineSample}\n${resType}: ${resTypeSample}\n`;
    }

    promptStr += `###\narticle: ${outline}\n${resType}: `;
    return promptStr;
  } catch (error) {
    // Handle errors
    handleError(
      error,
      null,
      null,
      "An error occurred while generating the prompt string."
    );
  }
}

/**
 * Validates the input parameters.
 * @param {Array} dataArray - The array of data samples.
 * @param {string} resType - The response type to include in the prompt.
 * @param {string} outline - The outline string to include in the prompt.
 * @throws {Error} If any of the input parameters are invalid.
 */
function validateParameters(dataArray, resType, outline) {
  // Check if the dataArray parameter is a valid array
  validateArrayParameter(dataArray, "dataArray");
  // Check if the resType parameter is a non-empty string
  validateStringParameter(resType, "resType");
  // Check if the outline parameter is a non-empty string
  validateStringParameter(outline, "outline");
}
