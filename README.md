# Astrological Questionnaire App

This project is built as part of a recruitment task. The app uses **Redux Toolkit** for state management and allows dynamic questions defined through a JSON configuration file.

## Features

- **Dynamic Questionnaire Flow:** The questions, answers, and their flow are entirely configurable through `questionnaire.json`.
- **MultiSelect Component:** Currently, the app includes a **MultiSelect** question type, but it’s designed to be easily extended.
- **State Management with Redux Toolkit:** User answers are saved in Redux and evaluated dynamically.
- **Placeholder Replacement for Dynamic Text:** Templates like `{gender}` and `{parent_status}` are replaced based on user input.
- **Transition Pages:** Conditional logic is used to determine the next question or path based on user answers.

## How to Scale the App

The app currently supports **`multiSelect`** questions but can be extended with more question types. Example:

**Extend the `questionTypes` object** in the relevant component:

```typescript
const questionTypes = {
  multiSelect: MultiSelect,
  textInput: TextInput, // Example of a new question type
};
```

**Update the JSON configuration** to include the new type:

```json
{
  "id": "new-question",
  "type": "textInput",
  "question": "What is your name?"
}
```

## Configuring `questionnaire.json`

The **`questionnaire.json`** file defines the structure and flow of the questionnaire. Below is a breakdown of the configuration options.

### Question Structure

Each question must have the following fields:

```json
{
  "id": "question-id",
  "type": "multiSelect",
  "question": "Question text",
  "options": [{ "value": "option1", "label": "Option 1" }],
  "next": "next-question-id"
}
```

- **`id`**: A unique identifier for the question.
- **`type`**: The type of question (e.g., `multiSelect`, `textInput`).
- **`question`**: The question text to display.
- **`options`**: An array of answer options, each with:
  - **`value`**: The internal value of the option.
  - **`label`**: The label to display to the user.
- **`next`**: The ID of the next question (if no conditions are defined).

### Conditional Logic

You can define **conditions** to determine which question follows based on user answers. App preoritizes conditions over next. Note, that question may have next AND/OR conditions, but it cannot have none of them. Zod parser will throw an error in console and show a message to the user in that case (indicating that the structure for the provided questionnarie.json is not valid)

```json
{
  "id": "example-question",
  "type": "multiSelect",
  "question": "Do you tend to overthink?",
  "options": [
    { "value": "yes", "label": "Yes" },
    { "value": "no", "label": "No" }
  ],
  "conditions": [
    { "if": { "example-question": "yes" }, "then": "next-question-yes" },
    { "if": { "example-question": "no" }, "then": "next-question-no" }
  ]
}
```

- **`conditions`**: An array of condition objects:
  - **`if`**: A mapping of question IDs to expected answer values.
  - **`then`**: The ID of the next question if the condition is met.

### Placeholders in Questions

You can use **placeholders** to insert dynamic content into question text. The placeholders are replaced based on user answers using the `replacePlaceholders` function.

Example:

```json
{
  "id": "relationship-description",
  "type": "multiSelect",
  "question": "{gender} {parent_status} need a different approach.",
  "options": [{ "value": "option1", "label": "Option 1" }]
}
```

- **Supported Placeholders**:
  - `{gender}`: Replaced with `"man"` or `"woman"` based on the user’s answer.
  - `{parent_status}`: Replaced with `"who have children"` or `"without children"`.

## Development

### Running the Application in Development Mode

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the app at **http://localhost:3000**.

## Building and Running in Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. Open the app at **http://localhost:3000**.

## License

This project is licensed under the MIT License.

## Summary

This project is a flexible, questionnaire-based app built with **Next.js** and **Redux Toolkit**. The app is easily extendable by adding new question types and supports dynamic flows with conditional logic. The `questionnaire.json` configuration makes it easy to modify the flow without changing the core code.
