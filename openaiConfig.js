import { Configuration, OpenAIApi } from "openai";

// Get the API key from the environment variable
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Create the OpenAI configuration
const configuration = new Configuration({
  apiKey: apiKey,
});
configuration.baseOptions.headers["Authorization"] = `Bearer ${apiKey}`;
// Create and export the OpenAI instance
export const openai = new OpenAIApi(configuration);

