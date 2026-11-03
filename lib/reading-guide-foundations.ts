import type { GuideArticle } from "@/lib/reading-guide-types";

export const foundationArticles: GuideArticle[] = [
  {
    slug: "child-knows-alphabet-but-cant-read",
    title: "My child knows the alphabet but can't read. What comes next?",
    seoTitle: "Child Knows the Alphabet but Can't Read? | AptyRead",
    description:
      "Help your child move from letter names to reading simple words. A parent-friendly guide to sounds, blending and understanding, with an activity to try together.",
    eyebrow: "From letters to words",
    intro:
      "Your child sings the alphabet, spots letters on signs and proudly writes their name. Then a small word on a page brings them to a stop. Where do you go from here?",
    answer:
      "Knowing letter names is a useful beginning. To read a new word, children also need to connect letters with sounds and blend those sounds together. Start with a few sounds your child knows, use them in a simple word, and explore its meaning together. You do not need to finish the whole alphabet first.",
    readMinutes: 4,
    example: {
      label: "A small word to explore together",
      tiles: ["m", "a", "t"],
      word: "mat",
      meaning: "Something we can put on the floor to sit on or wipe our feet.",
      prompt: "After reading the word, ask: Where could we put a mat?",
    },
    sections: [
      {
        id: "letter-names-and-sounds",
        title: "Give familiar letters a new job",
        paragraphs: [
          "A letter has a name, and it can represent a sound in a word. The name of m is 'em'. In mat, it represents the sound you make with your lips together: /m/. Saying the letter names m, a, t does not produce the spoken word mat.",
          "The useful connection is between the print, the sounds and the word. Early reading guidance recommends teaching these connections alongside word reading and vocabulary. Your child's alphabet knowledge gives you a familiar place to begin.",
        ],
        sourceIds: ["ies-foundations"],
      },
      {
        id: "try-one-word",
        title: "Try one word, together",
        paragraphs: [
          "Choose a word made from sounds your child has already met. Here is an activity using mat. If any of its sounds are unfamiliar, introduce them first or choose a word from your child's current lessons.",
        ],
        steps: [
          {
            title: "Let your child show you what they know",
            text: "Write m, a and t on separate pieces of paper. Point to one and ask for its sound. If your child gives the name, gently model the sound and invite them to join you.",
          },
          {
            title: "Make the word together",
            text: "Put the letters in order. Say the sounds as you move your finger from left to right, then say mat. Invite your child to read with you. They can watch and listen before taking a turn.",
          },
          {
            title: "Bring the meaning into the room",
            text: "Find a mat, draw one or imagine a tiny mat for a toy. Use the word in a spoken sentence. The child is discovering what the print tells them, as well as how it sounds.",
          },
        ],
      },
      {
        id: "notice-the-next-step",
        title: "Notice where your help is needed",
        paragraphs: [
          "Does your child remember the sound when you point to a letter? Can they join you in saying the whole word? Do they know what that word means? These observations help you choose the next activity without turning home practice into a test.",
          "If a sound is unfamiliar, return to it. If each sound is clear but the word is hard to hear, model the blending again. If the word is new to your child's English vocabulary, explain it with an object, action or a familiar language.",
        ],
      },
      {
        id: "keep-sharing-stories",
        title: "Keep sharing books now",
        paragraphs: [
          "Your child can enjoy a rich story while you read the words aloud. Talk about a character, explain an interesting word or simply enjoy a favourite page together. Listening and conversation belong beside early word practice.",
          "Choose a different kind of text when your child is doing the reading: words that match the sounds they have learned. If you are unsure where to start, ask their teacher which sounds and books to practise at home. Share what you notice and agree on a manageable next step.",
        ],
        sourceIds: ["dfe-reading"],
      },
    ],
    aptyConnection:
      "AptyRead gives children aged 4–10 a structured way to put sounds to work. From Lesson 1, children practise sounds, build and read words, and explore what they mean. A parent can sit alongside the child, listen and talk about each new word.",
    relatedSlugs: [
      "how-to-teach-letter-sounds",
      "how-to-teach-child-to-blend-sounds",
      "the-aptyread-path",
    ],
    sourceIds: ["ies-foundations", "dfe-reading"],
  },
  {
    slug: "how-to-teach-child-to-blend-sounds",
    title: "How to help your child blend sounds into words",
    seoTitle: "How to Teach a Child to Blend Sounds | AptyRead",
    description:
      "Try a simple, supportive blending routine at home. Help your child connect familiar sounds into a word, then talk about what the word means.",
    eyebrow: "Sounds that come together",
    intro:
      "You point to each letter. Your child says the sounds. But the word still feels out of reach. A clear demonstration, followed by a turn together, gives you somewhere practical to begin.",
    answer:
      "To practise blending, choose a short word containing only sounds your child knows. Model joining those sounds from left to right, with as little gap as possible. Say the whole word, invite your child to join you, and check its meaning. Keep the task small enough that you can help without hurrying.",
    readMinutes: 4,
    example: {
      label: "Listen. Join the sounds. Find the meaning.",
      tiles: ["s", "u", "n"],
      word: "sun",
      meaning: "The star that gives Earth light and warmth.",
      prompt: "After reading sun, invite your child to draw a sunny sky.",
    },
    sections: [
      {
        id: "what-blending-means",
        title: "Blending is hearing the whole word",
        paragraphs: [
          "Blending means joining sounds to say a word. When reading, the child connects the letters on the page with those sounds. Reading guidance treats learning sound-letter connections and practising word reading as related parts of early literacy.",
          "You can also play with spoken sounds without showing letters. Say the sounds in a familiar word and then the whole word. This is a listening activity; when you add the written word, you are connecting that listening to print.",
        ],
        sourceIds: ["ies-foundations"],
      },
      {
        id: "a-blending-routine",
        title: "A simple routine to try with sun",
        paragraphs: [
          "Use this example only if your child has learned s, u as in up, and n. Otherwise choose a word from their current learning. Put one large, clear letter on each card and sit where you can both see the word.",
        ],
        steps: [
          {
            title: "First, let your child listen",
            text: "Point under s and make its sound. Move smoothly through the sound for u and then n. Let the sounds run into one another, then say sun naturally. Your child can hear the whole demonstration before trying.",
          },
          {
            title: "Read it together",
            text: "Move your finger under the letters again while you both say the sounds and the word. Keep your voice available as support. If your child loses their place, start together again without making the word longer or harder.",
          },
          {
            title: "Offer a turn",
            text: "Ask whether your child would like to move the pointing finger or say the word. If they need your voice again, join in. Notice a specific action: 'You followed all three letters.'",
          },
          {
            title: "Do something with the word",
            text: "Draw a sun, talk about a sunny day or make a spoken sentence together. Once the word is familiar, cover the cards and rebuild it together. Your child can point to the letters while you move them.",
          },
        ],
      },
      {
        id: "make-sounds-clear",
        title: "Listen to your own model",
        paragraphs: [
          "Keep sounds clear and avoid adding a strong 'uh' after a consonant. For example, model s as a hiss, rather than 'suh'. Extra vowel sounds can make blending harder. Some sounds can be held; others, such as t, need a brief sound rather than a stretch.",
          "A written description cannot demonstrate pronunciation fully. Use the sound examples from your child's learning programme, or ask their teacher to show you. You can listen first and practise together without needing to become a phonics expert.",
        ],
        sourceIds: ["dfe-reading"],
      },
      {
        id: "when-it-feels-hard",
        title: "Make the next turn easier",
        paragraphs: [
          "If your child gives only the last sound, return to a shared demonstration of the whole word. If a letter is unfamiliar, revisit that sound. If they seem tired or frustrated, leave the cards and enjoy something else together. There is no need to turn one difficult word into a long session.",
          "Keep reading stories aloud while blending develops. Your child can enjoy the plot, pictures and conversation now. For their own word practice, return to examples that use the sounds they have learned.",
        ],
      },
    ],
    aptyConnection:
      "In AptyRead, children take an active part in building words and exploring their meanings from Lesson 1. The sequential course brings new learning into later activities. Sit together for a lesson, listen to the sounds and give your child room to take their own turn.",
    relatedSlugs: [
      "knows-letter-sounds-but-cant-read-words",
      "how-to-teach-letter-sounds",
      "child-reads-words-but-struggles-with-sentences",
    ],
    sourceIds: ["ies-foundations", "dfe-reading"],
  },
  {
    slug: "how-to-teach-letter-sounds",
    title: "How to practise letter sounds at home",
    seoTitle: "How to Teach Letter Sounds at Home | AptyRead",
    description:
      "Start with a few useful letter sounds, follow your child's learning sequence and put sounds into words. Practical advice for parents, with optional writing ideas.",
    eyebrow: "A few sounds. Something to read.",
    intro:
      "There is no need to turn the whole alphabet into a homework task. A few familiar letters can give you plenty to listen to, notice and use together.",
    answer:
      "Follow the sound sequence your child is learning, introduce a small selection clearly and revisit it in simple words. Show the letter as you say its sound. Include the vowel sound needed for your chosen words, and use only sound-letter connections your child has met. Writing can be an optional part of the activity.",
    readMinutes: 4,
    example: {
      label: "Put a small selection to work",
      tiles: ["a", "m"],
      word: "am",
      meaning: "A word we use when talking about ourselves: I am happy.",
      prompt: "Say 'I am...' and let your child choose a feeling or an action.",
    },
    sections: [
      {
        id: "choose-a-starting-point",
        title: "Start with your child's current learning",
        paragraphs: [
          "Ask which sounds your child is meeting in class or look at their current reading lesson. Use its examples and sequence at home. Choose a useful next step without covering every letter at once.",
          "For example, if m, a as in apple, and t have already been introduced, you could revisit them and build am or mat. This is an example, not a universal teaching order. A sequence can bring in a few sounds and use them in words before introducing the rest.",
        ],
      },
      {
        id: "names-and-sounds",
        title: "Be clear about the sound you mean",
        paragraphs: [
          "Letter names help us talk about letters. Sounds help us work out words. Say, 'This letter is called em. Listen to its sound in mat.' Show m as you make the sound.",
          "English letters can represent different sounds in different words. Begin with the sound being taught in the current lesson rather than presenting every possibility at once. Use a familiar example word so your child can hear which sound you mean.",
        ],
        sourceIds: ["ies-foundations"],
      },
      {
        id: "try-it-together",
        title: "An activity with letters you already have",
        paragraphs: [
          "For this activity, write m and a on paper cards. Match the letter forms in your child's lessons, and make them large enough to point to comfortably.",
        ],
        steps: [
          {
            title: "Show and listen",
            text: "Point to m, model its sound and let your child watch your mouth. Offer a turn. Then revisit a, using its sound in apple.",
          },
          {
            title: "Let your child choose",
            text: "Place both cards on the table. Say one sound and invite your child to hand you its card. Swap roles so your child can choose a card and you can say the sound.",
          },
          {
            title: "Build something meaningful",
            text: "Arrange a and m to make am. Model joining the sounds, then say the word together. Use it in a spoken sentence: 'I am happy.' Your child can choose another feeling and act it out.",
          },
          {
            title: "Leave room for choice",
            text: "Your child might like to trace a letter, draw it in the air or write it on paper. They can also keep pointing and moving the cards. You do not need to add a handwriting task to every sound activity.",
          },
        ],
      },
      {
        id: "clear-sound-models",
        title: "Use a sound model you can both follow",
        paragraphs: [
          "Try to avoid a strong extra 'uh' after consonants. For m, close your lips and hum the sound rather than saying 'muh'. A clear model helps when sounds are joined into a word. Listen to the programme's pronunciation example if you are unsure.",
          "Keep any explanation brief. You can say, 'Let's listen again,' replay the model, and take a turn alongside your child. Ask their teacher which example to use if home practice and classroom examples seem different.",
        ],
        sourceIds: ["dfe-reading"],
      },
      {
        id: "letters-and-stories",
        title: "Keep words and stories in the picture",
        paragraphs: [
          "After revisiting a sound, look for a chance to use it in a familiar word. Talk about what the word means. Later, share a book with you reading aloud and your child joining the conversation. Home literacy can include listening, talking, word practice and the pleasure of a story.",
        ],
        sourceIds: ["fcrr-families"],
      },
    ],
    aptyConnection:
      "AptyRead introduces sound blending and word meaning from Lesson 1. In Level 1, instructional videos introduce letters, sound articulation and writing. Tracing and optional paper writing give families ways to practise, alongside interactive activities in which the child builds words.",
    relatedSlugs: [
      "child-knows-alphabet-but-cant-read",
      "how-to-teach-child-to-blend-sounds",
      "the-aptyread-path",
    ],
    sourceIds: ["ies-foundations", "dfe-reading", "fcrr-families"],
  },
];
