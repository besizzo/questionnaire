import questionnaireData from '../../../../public/questionnaire.json';
import { QuestionComponent } from './QuestionComponent';
import { Question } from '@/app/types';
import { QuestionnaireSchema } from '@/config';

let questionnaire: Question[] = [];

try {
  questionnaire = QuestionnaireSchema.parse(questionnaireData).questions;
} catch (error) {
  console.error('Failed to load questionnaire:', error);
}
const getQuestionById = (id: string): Question | undefined => {
  return questionnaire.find((q: Question) => q.id === id);
};

export async function generateStaticParams() {
  return questionnaire.map((q) => ({
    id: q.id,
  }));
}

const QuestionPage = ({ params }: { params: { id: string } }) => {
  const question = getQuestionById(params.id);

  if (!question) {
    return <div>Question not found or invalid data!</div>;
  }

  return <QuestionComponent question={question} />;
};

export default QuestionPage;
