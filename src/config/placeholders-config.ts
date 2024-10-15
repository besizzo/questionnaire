export const placeholdersConfig = {
  "{gender}": (answer: string) => (answer === "male" ? "man" : "woman"),
  "{parent_status}": (answer: string) =>
    answer === "yes" ? "who have children" : "without children",
};

export const placeholderToQuestionId: Record<string, string[]> = {
  "{gender}": ["gender"],
  "{parent_status}": ["single-parent", "are-you-parent"],
};
