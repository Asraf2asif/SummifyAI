const summaryData = [
  {
    command:
      "If the given article, blog post, or document does not require summarization, clearly state 'I think, no summarization needed here.' Otherwise, extract key points to help users save time and enhance their understanding. Provide a well-formatted, concise summary that captures the essence of the original text",
  }
];

const summary_footer = `




########################################
Summary Generated by SummifyAI
Date: {{date}}
Time: {{time}}
########################################

Thank you for using SummifyAI, an advanced text summarization tool. We hope that the generated summary has provided you with a concise and insightful overview of the original text. Should you have any further inquiries or require additional assistance, please don't hesitate to reach out to us.

Best regards,
SummifyAI Team`


export const data = {
  summaryData,
  summary_footer
};
