"use client";

import { Button } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  question: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  question,
  options,
  onSelect,
}) => {
  return (
    <div className='flex flex-col items-center space-y-6 w-full'>
      <h1 className='text-2xl font-bold text-center mb-8'>{question}</h1>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className='w-full h-auto text-wrap active:bg-gradient-to-br active:from-[#141333] active:via-[#543C97] active:to-[#6939A2] active:text-white transition-none active:transition-none'
          variant='outline'
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
