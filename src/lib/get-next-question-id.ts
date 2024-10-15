import { Question } from '../app/types';

interface AnswersState {
  [questionId: string]: string;
}

export const getNextQuestionId = (
  currentQuestion: Question,
  answers: AnswersState,
  latestAnswer?: { questionId: string; answer: string }
): string | undefined => {
  if (currentQuestion.next && currentQuestion.next === 'end') return 'end';

  // Merge the latest answer with existing answers
  const combinedAnswers = {
    ...answers,
    ...(latestAnswer && { [latestAnswer.questionId]: latestAnswer.answer }),
  };

  if (currentQuestion.conditions) {
    // sort to prioritize specific matches
    const sortedConditions = [...currentQuestion.conditions].sort(
      (a, b) => Object.keys(b.if).length - Object.keys(a.if).length
    );

    for (const condition of sortedConditions) {
      const allConditionsMet = Object.entries(condition.if).every(
        ([questionId, expectedAnswer]) =>
          combinedAnswers[questionId] === expectedAnswer
      );

      if (allConditionsMet) {
        console.log(`Condition met: Navigating to ${condition.then}`);
        return condition.then;
      }
    }
  }

  // fallback to the "next" property if no match
  if (currentQuestion.next) {
    console.log(`Using 'next' property: Navigating to ${currentQuestion.next}`);
    return currentQuestion.next;
  }

  console.warn('No valid next question found');
  return undefined;
};
