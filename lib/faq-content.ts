export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export const startItems: FaqItem[] = [
  {
    question: "How do I start?",
    answer:
      "Download AptyRead. Open the app. Start Lesson 1. No account. First lessons are free. If it is right for your child, you can buy Level 1.",
  },
  {
    question: "Do I need an account to try?",
    answer:
      "No. Start Lesson 1 with no account. A parent account comes later, if you enroll. Your child's name and age. That is all.",
  },
  {
    question: "Why does every child start at Level 1?",
    answer:
      "AptyRead is one path. Level 1 is Sound Foundations. Reading is cumulative. Everyone starts there so nothing important is missing. Children who already know some skills often move through the early lessons quickly.",
    link: {
      href: "/reading-guide/the-aptyread-path",
      label: "See the Five-Level Path",
    },
  },
  {
    question: "What age is this for?",
    answer:
      "Ages 4 to 10. The path starts with letter sounds and ends with reading books alone.",
  },
  {
    question: "Is this only English?",
    answer: "Yes. AptyRead is an English reading program.",
  },
];

export const childItems: FaqItem[] = [
  {
    question: "My child already knows the alphabet. Which level should they start at?",
    answer:
      "Level 1. Knowing A, B, C is not the same as reading. Reading needs sounds — /a/ not A, /b/ not B. Most children who know their ABCs still start at Sound Foundations. It goes quickly when the skill is firm. And it makes sure nothing is missing.",
    link: {
      href: "/reading-guide/reading-problems/child-knows-alphabet-but-cant-read",
      label: "Read: alphabet but can't read",
    },
  },
  {
    question: "What if my child already knows some skills in Level 1?",
    answer:
      "They still start at Level 1. The early lessons confirm the foundation. If a skill is already solid, they move through it faster. The path does not ask you to pick a later level as an entry point.",
  },
  {
    question: "My child speaks English well at home. Will this still help?",
    answer:
      "Yes. Speaking and reading are different skills. A child can be fluent in spoken English and still need to be taught how to read it. Speaking is learned from listening. Reading has to be taught step by step.",
  },
  {
    question: "My child is a slow learner. Will they be left behind?",
    answer:
      "No. Each lesson must be passed before the next one unlocks. A child can repeat a lesson as many times as they need. No judgement. No clock. Slow and steady is fine.",
  },
  {
    question: "My child is 9. Is it too late to start?",
    answer:
      "It is never too late. Reading can be learned at any age with the right teaching. Older children often progress faster because their language understanding is stronger. The only wrong moment to start is not starting.",
  },
  {
    question: "How is this different from other reading apps?",
    answer:
      "Most reading apps are collections of activities. Fun, but not one journey. AptyRead is an English reading program. Five levels. One path. Every lesson builds on the last. Clear start. Clear path. Clear goal: your child reading books on their own.",
  },
];

export const lessonItems: FaqItem[] = [
  {
    question: "How long is a sitting?",
    answer:
      "About fifteen minutes. You set a daily limit of 1 or 2 new lessons. Then they are done.",
  },
  {
    question: "Can they do more than one new lesson a day?",
    answer:
      "You set 1 or 2 new lessons a day. Completed lessons can be reviewed as often as they like. Review does not count against the daily limit.",
  },
  {
    question: "What if a lesson is hard?",
    answer:
      "They try again. The next lesson unlocks when they are ready. No clock. No judgement.",
  },
  {
    question: "Can they skip a level?",
    answer:
      "No. The program is cumulative. Each level builds on the previous one. They finish a level before the next one opens. Skipping creates gaps.",
  },
  {
    question: "How do I know when my child is ready for the next level?",
    answer:
      "When they finish the current level. Lessons unlock in order. You do not choose the next level. The path opens it when the work is done.",
  },
  {
    question: "How long does the whole program take?",
    answer:
      "Fifteen minutes a day. Pace is theirs. They move only when ready.",
  },
];

export const costItems: FaqItem[] = [
  {
    question: "How much does it cost?",
    answer:
      "No subscription. Buy a level once, when you are ready. The App Store or Google Play shows the price for your country.",
  },
  {
    question: "Can I try before I pay?",
    answer: "Yes. Start Lesson 1. No card. No account.",
  },
  {
    question: "What if we stop?",
    answer:
      "Nothing to cancel. If you do not buy a level, there is no charge.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Refunds go through the App Store or Google Play, where you paid.",
    link: { href: "/terms", label: "See Terms of Service" },
  },
];

export const homeItems: FaqItem[] = [
  {
    question: "What devices does it work on?",
    answer: "iPhone, iPad, and Android phones and tablets.",
  },
  {
    question: "Does it work offline?",
    answer:
      "No. Lessons stream. You need a connection to watch and listen. Progress saves when you are online.",
  },
  {
    question: "Can more than one child use it?",
    answer: "Yes. One parent account. Each child has their own path.",
  },
  {
    question: "Can we use more than one device?",
    answer:
      "Yes. Same account. One device at a time. Progress syncs when you are online. Keep the parent sign-in to yourself. Do not share it.",
  },
  {
    question: "Is it safe?",
    answer:
      "No ads. No social. No chat. No links out of the lesson. We keep only what the app needs to work.",
    link: { href: "/privacy", label: "See Privacy Policy" },
  },
  {
    question: "Why a daily limit?",
    answer:
      "So the sound can stick. So the rest of the day is theirs. AptyRead is not trying to keep them in the app.",
  },
];

export const faqGroups: { title: string; items: FaqItem[] }[] = [
  { title: "Starting", items: startItems },
  { title: "Your child", items: childItems },
  { title: "Lessons", items: lessonItems },
  { title: "Cost", items: costItems },
  { title: "At home", items: homeItems },
];

export const allFaqItems: FaqItem[] = faqGroups.flatMap((group) => group.items);

export const homepageFaqItems: FaqItem[] = [
  childItems[0],
  startItems[2],
  childItems[2],
  childItems[3],
  childItems[5],
  lessonItems[3],
];
