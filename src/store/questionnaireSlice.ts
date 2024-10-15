import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionnaireState {
  currentQuestionId: string | null;
  answers: Record<string, string>;
  previousQuestions: string[];
}

const initialState: QuestionnaireState = {
  currentQuestionId: null,
  answers: {},
  previousQuestions: [],
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    initializeQuestionnaire: (state, action: PayloadAction<string>) => {
      state.currentQuestionId = action.payload;
    },
    setCurrentQuestionId: (state, action: PayloadAction<string | null>) => {
      console.log('action', action);
      const newQuestionId = action.payload;

      if (state.currentQuestionId) {
        state.previousQuestions.push(state.currentQuestionId);
      }

      state.currentQuestionId = newQuestionId;
    },
    saveAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetQuestionnaire: (state) => {
      state.currentQuestionId = null;
      state.answers = {};
      state.previousQuestions = [];
    },
    goToPreviousQuestion: (state) => {
      const previousQuestionId = state.previousQuestions.pop();
      if (previousQuestionId) {
        state.currentQuestionId = previousQuestionId;
      }
    },
  },
});

export const {
  initializeQuestionnaire,
  setCurrentQuestionId,
  saveAnswer,
  resetQuestionnaire,
  goToPreviousQuestion,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
