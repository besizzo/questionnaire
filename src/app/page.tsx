"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import questionnaireData from "../../public/questionnaire.json";

const firstQuestionId = questionnaireData.questions[0]?.id;

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    if (firstQuestionId) {
      router.push(`/question/${firstQuestionId}`);
    } else {
      console.error("No questions found in the questionnaire.");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <Button onClick={handleStartClick} className='text-xl p-8'>
        Start the questionnaire
      </Button>
    </div>
  );
}
