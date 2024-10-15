import Image from 'next/image';

interface QuestionLayoutProps {
  children: React.ReactNode;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <header className="flex items-center justify-center relative w-full mb-6 container mx-auto p-4 max-w-xxl">
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
      </header>
      {children}
    </div>
  );
};

export default QuestionLayout;
