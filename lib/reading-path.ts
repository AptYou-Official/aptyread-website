/** Single source for the public five-level path. */

export const PATH_LEVELS = [
  {
    number: 1,
    id: "01",
    name: "Sound Foundations",
    parentProblem: "My child knows the alphabet but can't read yet.",
    outcome: "Every letter sound, before any word.",
  },
  {
    number: 2,
    id: "02",
    name: "First Reading",
    parentProblem: "My child knows the sounds but can't put them together.",
    outcome: "First words. First sentences. First stories.",
  },
  {
    number: 3,
    id: "03",
    name: "Confident Reading",
    parentProblem: "My child reads simple words but longer words are hard.",
    outcome: "Letter teams. Blends. Short passages, alone.",
  },
  {
    number: 4,
    id: "04",
    name: "Building Fluency",
    parentProblem: "My child can read, but not smoothly yet.",
    outcome: "Paragraphs that get smoother over time.",
  },
  {
    number: 5,
    id: "05",
    name: "Independent Reading",
    parentProblem: "I want them to pick up a real book alone.",
    outcome: "Three real books, cover to cover.",
  },
] as const;

export const PATH_URL = "/reading-guide/the-aptyread-path";
export const GUIDE_URL = "/reading-guide";
export const ALPHABET_ARTICLE_URL =
  "/reading-guide/reading-problems/child-knows-alphabet-but-cant-read";
