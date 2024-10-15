import { placeholdersConfig, placeholderToQuestionId } from '@/config';

type AnswersState = {
  [questionId: string]: string;
};

export const replacePlaceholders = (
  text: string,
  answers: AnswersState
): string => {
  return text.replace(/\{(.*?)\}/g, (_, key) => {
    const placeholderKey = `{${key}}` as keyof typeof placeholdersConfig;

    const questionIds = placeholderToQuestionId[placeholderKey];

    if (questionIds) {
      for (const questionId of questionIds) {
        const userAnswer = answers[questionId];
        if (userAnswer) {
          return placeholdersConfig[placeholderKey](userAnswer);
        }
      }
    }

    // fallback if no match
    return placeholderKey;
  });
};
