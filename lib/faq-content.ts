export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export type ParentFaqItem = FaqItem & { id: string };

export type FaqGroup = {
  id: string;
  title: string;
  description: string;
  items: ParentFaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "A place to begin, with room to explore.",
    items: [
      {
        id: "free-lessons",
        question: "Which lessons are free?",
        answer: "Lessons 1–9 are free. The first 4 need no account. A free parent account lets you continue through Lesson 9, including Pat and Pip, your child’s first AptyRead story. Lessons open in order. Continuing from Lesson 10 requires a Level 1 purchase.",
      },
      {
        id: "who-is-it-for",
        question: "Is AptyRead right for my child?",
        answer: "AptyRead is an interactive English reading program for children aged 4–10, available through the AptyRead app. It is for children beginning with letters and sounds, and those who need help putting sounds together into words. Explore the free lessons together to see how your child responds.",
      },
      {
        id: "beginning-with-letters",
        question: "Does my child need to know the alphabet first?",
        answer: "No. Your child can begin before knowing the alphabet. AptyRead introduces letters and their sounds, then helps children use the sounds they have learned to build and read simple words. Start with Lesson 1 and explore it together.",
      },
      {
        id: "knows-letters",
        question: "My child knows the alphabet. Where should we start?",
        answer: "Begin with Lesson 1. Knowing letter names is a useful starting point, and AptyRead helps children use letter sounds to build and read words. Every reader follows the same sequence, with opportunities to revisit and practise along the way.",
      },
      {
        id: "additional-language",
        question: "We speak another language at home. Can we use AptyRead?",
        answer: "Yes. AptyRead is also for children learning English as an additional language. Talk about pictures and meanings in a language your child knows, then listen to the English words together. Grown-up tips are available in English, Hindi and Malayalam. Reading activities are in English.",
      },
      {
        id: "download",
        question: "How do we get the app?",
        answer: "Download AptyRead from Google Play for Android or the App Store for iPhone and iPad. Open the app and begin with Lesson 1. You can explore the first 4 lessons before creating a parent account.",
        link: { href: "/#get-the-app", label: "Get AptyRead" },
      },
    ],
  },
  {
    id: "learning-together",
    title: "Learning together",
    description: "Sounds, words and meaning. One step at a time.",
    items: [
      {
        id: "interactive-learning",
        question: "What will my child do in a lesson?",
        answer: "Children listen, choose, practise sounds, build words and explore what they mean. From Lesson 1, they blend the sounds they have learned into words. Activities, illustrations and stories give them ways to use their learning. In Level 1, children explore letter names, shapes and sounds, capital and small letters, and optional writing. Short videos introduce letters, how to make each sound and letter formation.",
      },
      {
        id: "learning-order",
        question: "Why do lessons open in order?",
        answer: "The program has five progressive levels, building word reading, vocabulary and understanding. Each lesson draws on earlier learning. Completing the required activities opens the next lesson. Buying a level keeps this sequence; it does not skip ahead.",
        link: { href: "/#learning-journey", label: "Explore the five-level journey" },
      },
      {
        id: "parent-help",
        question: "How much help will my child need?",
        answer: "Stay nearby for younger children, listen together and give them time to respond. Older children can practise more independently when they are ready. Guidance within activities explains how you can help. In Grown-ups, open Account & settings to choose English, Hindi or Malayalam for grown-up tips.",
      },
      {
        id: "writing",
        question: "Does AptyRead include writing practice?",
        answer: "Yes. In Level 1, children can trace letters on screen or watch a writing video and practise with pen and paper. Writing is optional, so your child can continue the reading lessons without completing it. Handwriting is not graded by the app.",
      },
      {
        id: "learning-pace",
        question: "How much time should we spend?",
        answer: "Try around 10 minutes together to begin. Your child may prefer shorter or longer sessions. It is fine to pause, repeat or come back another day. There is no daily lesson cap or set deadline for completing the program.",
      },
      {
        id: "repeat-practice",
        question: "Can we go back to lessons and stories?",
        answer: "Yes. Reopen completed lessons for more practice. Collected words and earned books stay in My library, ready to enjoy again. Returning to a familiar word or story is part of the journey.",
      },
      {
        id: "reading-progress",
        question: "What does my child’s progress tell me?",
        answer: "In Grown-ups, you can see the selected reader’s place in the program and completed activities. This records participation, not a reading test or a measure of fluency. AptyRead gives children time to practise aloud, but it does not record their voice or assess spoken pronunciation and reading accuracy.",
      },
    ],
  },
  {
    id: "purchases",
    title: "Purchases",
    description: "Clear choices when your family is ready to continue.",
    items: [
      {
        id: "price",
        question: "How do we continue after the free lessons?",
        answer: "Purchase Level 1 within the app through Google Play or the App Store to continue from Lesson 10. The store shows your local price before you buy. Levels are purchased separately with a one-time payment, no expiry and no recurring subscription.",
      },
      {
        id: "family-sharing",
        question: "Can my children share a purchased level?",
        answer: "Yes. Create up to three reader profiles under one parent account, using a nickname and a preset avatar for each child. Each purchased level is shared by those readers. Every child keeps their own progress and place in the program.",
      },
      {
        id: "next-level",
        question: "When can we move to the next level?",
        answer: "Once one reader completes a level, you can buy the next available level for your family. Each reader must complete their own previous level before starting it. A sibling’s progress does not move another reader ahead.",
      },
      {
        id: "taking-a-break",
        question: "What if we take a break?",
        answer: "Your purchased level has no expiry or recurring charge, so there is no subscription to cancel. Return when your family is ready. Before changing devices or removing the app, check the backup for your child’s progress in Grown-ups, under Account & settings.",
      },
      {
        id: "restore-purchases",
        question: "How do I restore a purchase?",
        answer: "In Grown-ups, find Your access and choose Restore purchases. Sign in with the same AptyRead parent account and the App Store or Google Play account used for the purchase. If a payment is pending or access is missing, use Check payment or Restore purchases instead of paying again. Contact us if you need help.",
        link: { href: "/contact", label: "Get help with a purchase" },
      },
      {
        id: "refunds",
        question: "How can I request a refund?",
        answer: "Request a refund through the App Store or Google Play, depending on where you paid. The store’s rules and your applicable consumer rights apply. You can also contact our support team for help.",
        link: { href: "/terms#purchases-and-refunds", label: "Read the purchase and refund terms" },
      },
    ],
  },
  {
    id: "family-and-support",
    title: "Family & support",
    description: "Practical help for learning at home.",
    items: [
      {
        id: "another-device",
        question: "Can we use another device?",
        answer: "Yes. On your current device, open Grown-ups, then Account & settings. Check the backup status and use Back up now if needed. On the other device, sign in to the same parent account and choose the same reader. A family can register up to three devices, with up to two learning sessions at once. The same reader can learn on only one device at a time.",
      },
      {
        id: "internet",
        question: "Do we need an internet connection?",
        answer: "Use an internet connection for the full experience. Some content already stored on your device may be available offline, but not every activity will work. Videos and media that have not loaded, signing in, purchase checks and progress backups need a connection.",
      },
      {
        id: "privacy",
        question: "Are there advertisements? How is our information handled?",
        answer: "AptyRead contains no advertisements. A parent manages the account, and each reader has a nickname, a preset avatar and their own progress. Speaking practice is not recorded. Our Privacy Policy explains what information is used, why it is needed and the choices available to parents.",
        link: { href: "/privacy", label: "Read the Privacy Policy" },
      },
      {
        id: "account-removal",
        question: "Can I remove a reader or delete our account?",
        answer: "Yes. You can remove an individual reader or delete the family account in Grown-ups. Removing one reader deletes their progress while keeping the other readers and family purchases. Deleting the family account removes its readers and learning data and ends access through that account. Read the steps before confirming.",
        link: { href: "/delete-account", label: "See account and reader removal steps" },
      },
    ],
  },
];

export const allFaqItems: ParentFaqItem[] = faqGroups.flatMap((group) => group.items);

// Retained for the shared FAQ component used by older page layouts.
export const homepageFaqItems = allFaqItems.filter((item) =>
  ["free-lessons", "knows-letters", "parent-help", "price", "reading-progress", "repeat-practice"].includes(item.id),
);
