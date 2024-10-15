import { z } from "zod";

const OptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  next: z.string().optional(),
});

const ConditionSchema = z.object({
  if: z.record(z.string(), z.string()),
  then: z.string(),
});

const QuestionSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    question: z.string(),
    options: z.array(OptionSchema).optional(),
    next: z.string().optional(),
    conditions: z.array(ConditionSchema).optional(),
  })
  .refine((data) => data.next || data.conditions, {
    message: "Either 'next' or 'conditions' must be provided",
    path: ["next", "conditions"],
  });

export const QuestionnaireSchema = z.object({
  questions: z.array(QuestionSchema),
});
