"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  initializeQuestionnaire,
  saveAnswer,
  setCurrentQuestionId,
} from "../../../store/questionnaireSlice";
import { componentsMap } from "@/components/questions/";
import { getNextQuestionId, replacePlaceholders } from "@/lib";
import { Question } from "@/app/types";

interface QuestionProps {
  question: Question;
}

export const QuestionComponent: React.FC<QuestionProps> = ({ question }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentQuestionId = useAppSelector(
    (state) => state.questionnaire.currentQuestionId
  );
  const answers = useAppSelector((state) => state.questionnaire.answers);

  // Dynamically initialize the questionnaire if it's the first question
  useEffect(() => {
    if (currentQuestionId === null) {
      dispatch(initializeQuestionnaire(question.id));
    }
  }, [dispatch, currentQuestionId, question.id]);

  const handleOptionClick = (optionValue: string) => {
    const latestAnswer = { questionId: question.id, answer: optionValue };
    dispatch(saveAnswer({ questionId: question.id, answer: optionValue }));

    const nextQuestionId = getNextQuestionId(question, answers, latestAnswer);

    if (nextQuestionId === "end") {
      router.push("/summary");
      return;
    }

    if (nextQuestionId) {
      dispatch(setCurrentQuestionId(nextQuestionId));
      router.push(`/question/${nextQuestionId}`);
    } else {
      // fallback
      router.push(`/summary`);
    }
  };

  const QuestionComponent =
    componentsMap[question.type as keyof typeof componentsMap];

  if (!QuestionComponent) {
    return <div>Unknown question type: {question.type}</div>;
  }

  // Replace placeholders in the question text
  const questionText = replacePlaceholders(question.question, answers).replace(
    /^\w/,
    (c) => c.toUpperCase()
  );

  return (
    <div className='flex flex-col items-center space-y-6 container mx-auto px-4 max-w-sm'>
      <QuestionComponent
        question={questionText}
        options={question.options || []}
        onSelect={(value: string) => handleOptionClick(value)}
      />
    </div>
  );
};
