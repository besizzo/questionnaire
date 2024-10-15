'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { goToPreviousQuestion } from '../../store/questionnaireSlice';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

interface QuestionLayoutProps {
  children: React.ReactNode;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const previousQuestions = useAppSelector(
    (state) => state.questionnaire.previousQuestions
  );

  const handleBackClick = () => {
    dispatch(goToPreviousQuestion());
    const previousQuestionId = previousQuestions[previousQuestions.length - 1];
    if (previousQuestionId) {
      router.push(`/question/${previousQuestionId}`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <header className="flex items-center justify-center relative w-full mb-6 container mx-auto p-4 max-w-xxl">
        {previousQuestions.length > 0 && (
          <Button
            onClick={handleBackClick}
            className="absolute left-0 rounded-full"
            variant="ghost"
          >
            <ChevronLeftIcon />
          </Button>
        )}
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
      </header>
      {children}
    </div>
  );
};

export default QuestionLayout;
