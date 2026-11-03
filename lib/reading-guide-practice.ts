import type { GuideArticle } from "@/lib/reading-guide-types";

export const practiceArticles: GuideArticle[] = [
  {
    slug: "knows-letter-sounds-but-cant-read-words",
    title: "Knows the sounds. Still finding the word?",
    seoTitle: "Child Knows Letter Sounds but Can't Read Words | AptyRead",
    description:
      "Help your child move from separate letter sounds to whole words. Notice where they need help, choose a small practice step and connect reading with meaning.",
    eyebrow: "From sounds to words",
    intro:
      "Your child can tell you the sounds for m, a and p. Put the letters together, and the word still feels out of reach. You have found a useful place to begin: listening closely to what happens between the sounds and the word.",
    answer:
      "Choose one short word made from sounds your child has learned. Notice whether they need help remembering a sound, joining the sounds or understanding the word. Practise that particular step together, then read the whole word and talk about its meaning.",
    readMinutes: 4,
    example: {
      label: "One word. Something to notice.",
      tiles: ["m", "a", "p"],
      word: "map",
      meaning: "A map shows where places are.",
      prompt:
        "After reading the word together, draw a tiny map from your door to a favourite place in your home.",
    },
    sections: [
      {
        id: "listen-to-one-word",
        title: "Start with one word, not a long list",
        paragraphs: [
          "Knowing a letter sound and blending sounds to read a word are connected skills. Guidance from the Institute of Education Sciences addresses both sound-letter knowledge and teaching children to decode words. A child may need support applying what they know in a word.",
          "Write map if your child has learned those three sounds. Sit beside them and say, ‘Let's look at this together.’ Give them a chance to respond. You are gathering a small clue about the next useful activity, rather than asking them to prove what they know.",
        ],
        sourceIds: ["ies-foundations"],
      },
      {
        id: "choose-the-help",
        title: "Match your help to what you hear",
        paragraphs: [
          "There is no need to work on every part at once. Choose the description below that fits this attempt. Another word, or another day, may give you different information.",
        ],
        steps: [
          {
            title: "A sound is hard to remember",
            text: "Give that sound and invite your child to say it with you. Keep the letter visible. Use the sound in the word, rather than the letter's alphabet name. You can ask their teacher which sounds to revisit.",
          },
          {
            title: "The sounds stay separate",
            text: "Point across the letters and model joining their sounds, then say map. Invite your child to join you. If they still cannot hear the word, supply it warmly and finish with its meaning. Avoid repeating the same question until it becomes frustrating.",
          },
          {
            title: "The word is read but unfamiliar",
            text: "Explain it in everyday language. Show a map or draw one together. Invite your child to tell you what it shows, using a familiar home language if helpful. Then return to the printed English word.",
          },
        ],
      },
      {
        id: "small-repeat",
        title: "Make the next attempt manageable",
        paragraphs: [
          "Keep the same word for another turn if your child wants one. They could arrange three paper letter cards, read the result and add it to their drawing. If you introduce a different word, use sounds they already know and explain any unfamiliar meaning.",
          "Notice something specific: ‘You looked at every letter,’ or ‘You joined those sounds together.’ Skip the stopwatch. Your observation is more useful than a speed target. When attention fades, put the cards away and return another time.",
        ],
      },
      {
        id: "keep-the-bigger-picture",
        title: "Keep stories in the picture",
        paragraphs: [
          "Your child can enjoy you reading a wonderful book while they are learning to read a small word independently. Let them choose a story, talk about a character or tell you their favourite part. Word practice does not need to take over your time together.",
          "If the same difficulty keeps returning, share the exact example with their teacher: ‘They say each sound in map, but need me to join them.’ Ask for a suitable word and a model of how to help. You do not need to work it out alone.",
        ],
      },
    ],
    aptyConnection:
      "In AptyRead, children build words with the app's help and explore their meanings from Lesson 1. Lessons open in order, and completed learning can be revisited. Sit alongside your child to notice which part they can do and where they welcome support. Completing an activity does not, by itself, show independent reading fluency.",
    relatedSlugs: [
      "how-to-teach-child-to-blend-sounds",
      "how-to-teach-letter-sounds",
      "child-reads-words-but-struggles-with-sentences",
    ],
    sourceIds: ["ies-foundations"],
  },
  {
    slug: "how-to-help-child-who-struggles-with-reading",
    title: "A little support. A calmer place to begin.",
    seoTitle: "How to Help a Child Who Struggles with Reading | AptyRead",
    description:
      "A calm, practical guide for parents supporting a child who finds reading difficult. Choose manageable practice, keep enjoying stories and work with their teacher.",
    eyebrow: "When reading feels difficult",
    intro:
      "Perhaps your child avoids reading time. Perhaps they try hard, but each word takes a lot of effort. Start by making room for how it feels. You can offer useful support without turning every evening into a test.",
    answer:
      "Begin with something your child can approach with help. Choose one small focus, read together and make space for a conversation about meaning. If difficulties persist, share specific examples with their teacher and agree on the next step together.",
    readMinutes: 4,
    example: {
      label: "A small invitation",
      tiles: ["s", "u", "n"],
      word: "sun",
      meaning: "The sun gives us light and warmth.",
      prompt:
        "If these sounds are familiar, build sun together. Ask, ‘What do we like doing on a sunny day?’ You can help with both the reading and the conversation.",
    },
    sections: [
      {
        id: "begin-with-your-child",
        title: "Begin with the child beside you",
        paragraphs: [
          "Try an invitation: ‘Would you like me to read first, or shall we do a word together?’ A choice gives you a gentle way into the activity. If your child is tired or upset, pause. Reading practice can wait for a calmer moment.",
          "Ask what feels hard without supplying a label. ‘Is it remembering the sounds, putting them together, or knowing what the words mean?’ They may not know yet. Listening to a short attempt can give you something concrete to discuss with their teacher.",
        ],
      },
      {
        id: "simple-routine",
        title: "Make a small routine you can return to",
        paragraphs: [
          "The Florida Center for Reading Research describes parents and caregivers as part of a child's reading learning, alongside school. At home, a simple routine can make your role feel more manageable. Adapt this one to your child rather than treating it as a checklist.",
        ],
        steps: [
          {
            title: "Start somewhere familiar",
            text: "Bring back a word, page or activity your child recognises. Tell them what you will do together. Keep the task small enough that you can give it your attention without rushing through a whole book.",
          },
          {
            title: "Offer the help they need",
            text: "Give an unfamiliar sound or word instead of leaving them stuck. Model one example, then invite them to join in. You might say, ‘I'll help with this part. Let's read it together.’ Their teacher can suggest practice that fits current learning.",
          },
          {
            title: "Finish with a connection",
            text: "Talk about what you read. Draw an object from the sentence, act out an action or connect it to your day. Let your child answer in the language that lets them share their ideas most comfortably.",
          },
        ],
        sourceIds: ["fcrr-families"],
      },
      {
        id: "notice-the-attempt",
        title: "Notice an attempt, not a comparison",
        paragraphs: [
          "Choose a specific observation: ‘You went back to look at that word,’ or ‘You told me what happened.’ Avoid comparing with a sibling or a classmate. Your child needs to know that asking for help belongs in reading time.",
          "Keep enjoying books you read aloud, including stories beyond what your child can read independently. They can choose the book, look at the illustrations and talk with you. There is no need to earn story time by finishing practice first.",
        ],
      },
      {
        id: "work-with-the-teacher",
        title: "Make the next step a shared one",
        paragraphs: [
          "If reading remains difficult, or your child becomes increasingly reluctant, arrange a conversation with their teacher. Bring a couple of examples rather than a score from an app. Mention what your child enjoys as well as where they need help.",
        ],
        bullets: [
          "What are you noticing when my child reads at school?",
          "Which sounds, words or books would be useful to practise at home?",
          "Could you show me how you help with this particular difficulty?",
          "When shall we check in again, and is any additional support needed?",
        ],
      },
    ],
    aptyConnection:
      "AptyRead offers a structured sequence of interactive reading activities, with grown-up instructions to support you alongside your child. Writing practice is optional. Use the app as one part of reading together, alongside books and your child's school learning. The progress view records course activity; it is not a diagnosis or a measure of reading fluency.",
    relatedSlugs: [
      "knows-letter-sounds-but-cant-read-words",
      "child-reads-words-but-struggles-with-sentences",
      "the-aptyread-path",
    ],
    sourceIds: ["fcrr-families"],
  },
  {
    slug: "child-reads-words-but-struggles-with-sentences",
    title: "From reading the words to following the meaning.",
    seoTitle: "Child Reads Words but Struggles with Sentences | AptyRead",
    description:
      "Help your child bring words together into a meaningful sentence. Try shared reading, gentle rereading, vocabulary conversations and simple questions about the text.",
    eyebrow: "Making sense of sentences",
    intro:
      "Your child reads each word, but the sentence sounds like a list. Or they reach the end and cannot tell you what happened. Slow the task down. A single sentence gives you room to explore both the reading and the message.",
    answer:
      "Choose a short sentence with mostly familiar words. Help with anything unfamiliar, read it aloud together and return to it as a whole thought. Then talk about who or what it describes. Keep the focus on understanding, rather than reading faster.",
    readMinutes: 4,
    example: {
      label: "Three words. One little event.",
      tiles: ["The", "cat", "sat."],
      word: "The cat sat.",
      meaning: "A cat was sitting down.",
      prompt:
        "Read it together. Ask, ‘Who sat?’ Then invite your child to draw the event or show you what sat means with a toy.",
    },
    sections: [
      {
        id: "choose-a-sentence",
        title: "Give one sentence your attention",
        paragraphs: [
          "Reading connected text brings word reading and understanding together. The Institute of Education Sciences includes connected-text practice in its foundational reading guidance. Its comprehension guidance also encourages purposeful text choices and discussion of meaning.",
          "For your own practice, choose a brief sentence about something familiar. The cat sat is one possibility if the words fit your child's learning. Supply a word they have not learned. A sentence containing several unfamiliar words may call for you to read it aloud first.",
        ],
        sourceIds: ["ies-foundations", "ies-comprehension"],
      },
      {
        id: "hear-the-whole-thought",
        title: "Help them hear the whole thought",
        paragraphs: [
          "Try this small sequence with one sentence. Stay with it only while your child is comfortable. You can take a turn whenever they need help.",
        ],
        steps: [
          {
            title: "Read the words together",
            text: "Point to the print as you go. Pause to help with a word, then return to the sentence. If your child is working hard to work out each word, keep the sentence short and offer more of the reading yourself.",
          },
          {
            title: "Let your voice carry the meaning",
            text: "Say the complete sentence in a natural voice, with a little pause at the full stop. Invite your child to read with you. There is no need to copy a particular accent or make the reading sound like a performance.",
          },
          {
            title: "Read it again for a reason",
            text: "Say, ‘Let's read it again to see what the cat did.’ Your child can point, join in or read the sentence themselves. Use the second reading to return to its message, without timing it or asking for a faster attempt.",
          },
        ],
      },
      {
        id: "talk-about-the-message",
        title: "Make room for an answer in their own words",
        paragraphs: [
          "Ask one simple question, such as ‘Who sat?’ or ‘What did the cat do?’ Accept a spoken answer, a gesture or a drawing. If your child is unsure, point back to the sentence and answer it together. This is a conversation, not a quiz to pass.",
          "An unfamiliar English word can get in the way of the message. Explain it with an object, action or everyday example. Invite your child to talk in a familiar home language too, then connect their idea with the English word. You do not have to replace the language your family already shares.",
        ],
      },
      {
        id: "grow-the-reading",
        title: "Build a little further when it feels manageable",
        paragraphs: [
          "Another time, choose two related sentences and talk about what happened across them. Keep returning to the words on the page when you discuss the message. For an imagined extra detail, such as where the cat might sit next, make it clear that you are inventing together.",
          "Continue reading richer stories aloud yourself. Your child can enjoy characters, new ideas and conversation while their independent reading develops. If sentences remain difficult despite support, share a few examples with their teacher and ask what kind of practice would fit best.",
        ],
      },
    ],
    aptyConnection:
      "AptyRead connects sounds, words and meanings from Lesson 1, then brings reading into activities and stories. The first story, Pat and Pip, appears in Lesson 9. Read alongside your child and pause to talk about what happens. Earned books in My library give you a place to return to a familiar story together.",
    relatedSlugs: [
      "knows-letter-sounds-but-cant-read-words",
      "how-to-help-child-who-struggles-with-reading",
      "the-aptyread-path",
    ],
    sourceIds: ["ies-foundations", "ies-comprehension"],
  },
];
