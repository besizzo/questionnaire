'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { resetQuestionnaire } from '../../store/questionnaireSlice';
import questionnaireData from '../../../public/questionnaire.json';
import { Button } from '@/components/ui/button';

const getAnswerLabel = (questionId: string, answerValue: string): string => {
  const question = questionnaireData.questions.find((q) => q.id === questionId);
  const option = question?.options?.find((opt) => opt.value === answerValue);
  return option ? option.label : 'Answer not found';
};

const SummaryPage: React.FC = () => {
  const answers = useAppSelector((state) => state.questionnaire.answers);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRestart = () => {
    dispatch(resetQuestionnaire());
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Summary of Your Answers
      </h1>
      <ul className="w-full space-y-4">
        {Object.entries(answers).map(([questionId, answerValue], index) => (
          <li key={questionId} className="p-4 bg-blue-100 rounded-lg shadow">
            <p>
              <strong>Question #{index + 1}</strong>
            </p>
            <p>{getAnswerLabel(questionId, answerValue)}</p>
          </li>
        ))}
      </ul>
      <Button onClick={handleRestart} className="mt-8" variant="outline">
        Go to the homepage
      </Button>
    </div>
  );
};

export default SummaryPage;
