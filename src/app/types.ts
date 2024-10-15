export type Option = {
  value: string;
  label: string;
  next?: string;
};

export type Condition = {
  if: Record<string, string>;
  then: string;
};

export type Question = {
  id: string;
  type: string;
  question: string;
  options?: Option[];
  next?: string;
  conditions?: Condition[];
};
