/** Single source for the public five-level path. */

export const PATH_LEVELS = [
  {
    number: 1,
    id: "01",
    name: "Sounds into first words",
    parentProblem: "How can my child begin reading words?",
    outcome:
      "Learn letter names, shapes and sounds. Build words and explore their meanings through activities and little stories. Discover capital and small letters, with optional writing practice.",
  },
  {
    number: 2,
    id: "02",
    name: "More words, richer sentences",
    parentProblem: "How do words work together to express an idea?",
    outcome:
      "Build varied short words. Read phrases, sentences and short books. Explore who does what, where things are, and how a question or a small word changes a message.",
  },
  {
    number: 3,
    id: "03",
    name: "Letter teams and longer words",
    parentProblem: "What comes after simple words?",
    outcome:
      "Explore letters that work together, longer sound sequences and word endings. Follow a character's problem, action and result while checking that the words make sense.",
  },
  {
    number: 4,
    id: "04",
    name: "Vowel patterns and longer reading",
    parentProblem: "How can my child follow a longer piece of reading?",
    outcome:
      "Explore more vowel spellings and longer stories and factual passages. Follow connected ideas, notice feelings and find details. Practise phrasing and reread to check meaning.",
  },
  {
    number: 5,
    id: "05",
    name: "Independent reading and vocabulary",
    parentProblem: "How can my child use these skills in new books?",
    outcome:
      "Bring word reading and understanding together in suitable new books. Explore longer words and meaningful word parts, explain ideas using the text, and choose what to read next.",
  },
] as const;

export const PATH_URL = "/reading-guide/the-aptyread-path";
export const GUIDE_URL = "/reading-guide";
export const ALPHABET_ARTICLE_URL =
  "/reading-guide/reading-problems/child-knows-alphabet-but-cant-read";
export const BLEND_SOUNDS_ARTICLE_URL =
  "/reading-guide/reading-problems/how-to-teach-child-to-blend-sounds";
export const LETTER_SOUNDS_ARTICLE_URL =
  "/reading-guide/reading-problems/how-to-teach-letter-sounds";
export const SOUNDS_CANT_READ_WORDS_ARTICLE_URL =
  "/reading-guide/reading-problems/knows-letter-sounds-but-cant-read-words";
export const STRUGGLES_WITH_READING_ARTICLE_URL =
  "/reading-guide/reading-problems/how-to-help-child-who-struggles-with-reading";
export const SENTENCES_ARTICLE_URL =
  "/reading-guide/reading-problems/child-reads-words-but-struggles-with-sentences";
