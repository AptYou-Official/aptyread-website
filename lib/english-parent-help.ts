export type ParentHelpLanguage = 'en' | 'ml' | 'hi';

export const parentHelpLanguages: { id: ParentHelpLanguage; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'ml', label: 'മലയാളം' },
  { id: 'hi', label: 'हिन्दी' },
];

export type ParentHelpKind = 'sound' | 'find' | 'cases' | 'word' | 'sentence' | 'trace' | 'paper' | 'introduction' | 'preview' | 'review' | 'application';
export type ParentHelpCopy = { summary: string; languageLabel: string; paragraphs: string[]; audioLabel?: string };

// Parent guidance is deliberately separate from child-facing copy. These are
// natural explanations for adults, not literal translations of the English UI.
export const parentHelpContent: Record<ParentHelpKind, Record<ParentHelpLanguage, ParentHelpCopy>> = {
  sound: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'Your child first hears the recorded sound or watches the mouth model. When you hear the audio prompt “Your turn,” your child taps the hand button and tries the sound.',
        'Each turn is short. Two turns are enough; the sticker celebrates taking part. The app does not listen to, record, or score your child’s voice.',
        'Watching or hearing the model again is always available.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'കുട്ടി ആദ്യം റെക്കോർഡ് ചെയ്ത ശബ്ദം കേൾക്കുകയോ വായുടെ മാതൃക കാണുകയോ ചെയ്യും. “Your turn” എന്ന ഓഡിയോ നിർദേശം കേൾക്കുമ്പോൾ കൈയുടെ ബട്ടൺ തൊട്ട് ശബ്ദം പറയാൻ ശ്രമിക്കാം.',
        'ഓരോ ശ്രമവും കുറച്ച് സമയത്തേക്കാണ്. രണ്ട് ശ്രമങ്ങൾ മതി; സ്റ്റിക്കർ കുട്ടി പങ്കെടുത്തതിനെ ആഘോഷിക്കുന്നു. ആപ്പ് കുട്ടിയുടെ ശബ്ദം കേൾക്കുകയോ റെക്കോർഡ് ചെയ്യുകയോ സ്കോർ നൽകുകയോ ഇല്ല.',
        'മാതൃക വീണ്ടും കാണാനോ കേൾക്കാനോ എപ്പോഴും കഴിയും.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'बच्चा पहले रिकॉर्ड की गई ध्वनि सुनता है या मुँह का मॉडल देखता है। “Your turn” का ऑडियो सुनाई देने पर बच्चा हाथ वाले बटन को दबाकर ध्वनि बोलने की कोशिश करता है।',
        'हर कोशिश थोड़ी देर की होती है। दो कोशिशें पर्याप्त हैं; स्टिकर बच्चे के प्रयास का उत्सव है। ऐप बच्चे की आवाज़ सुनकर उसे रिकॉर्ड या अंक नहीं देता।',
        'मॉडल को फिर से सुनना या देखना हमेशा उपलब्ध है।',
      ],
    },
  },
  find: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'The audio prompt tells your child what to do. Your child listens to the sound, then taps the matching letter.',
        'Help is another demonstration, not a mark against progress. The app does not record or assess your child’s voice. Pause and talk in your home language whenever helpful.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ഓഡിയോ നിർദേശം കുട്ടിക്ക് അടുത്തതായി എന്ത് ചെയ്യണമെന്ന് പറയുന്നു. കുട്ടി ശബ്ദം കേട്ട് അതുമായി പൊരുത്തപ്പെടുന്ന അക്ഷരം തൊടണം.',
        'Help വീണ്ടും കാണിക്കുന്ന ഒരു മാതൃക മാത്രമാണ്; അത് പുരോഗതിക്ക് കുറവല്ല. ആപ്പ് കുട്ടിയുടെ ശബ്ദം റെക്കോർഡ് ചെയ്യുകയോ വിലയിരുത്തുകയോ ഇല്ല. ആവശ്യമെങ്കിൽ വീട്ടിലെ ഭാഷയിൽ സംസാരിച്ച് ഇടവേള നൽകാം.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'ऑडियो निर्देश बच्चे को अगला कदम बताता है। बच्चा ध्वनि सुनकर उससे मिलने वाले अक्षर को दबाता है।',
        'Help केवल एक और उदाहरण है; इससे प्रगति कम नहीं होती। ऐप बच्चे की आवाज़ रिकॉर्ड या जाँच नहीं करता। ज़रूरत हो तो अपनी घरेलू भाषा में बात करके विराम दें।',
      ],
    },
  },
  cases: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'This activity helps your child notice the big and small forms of one letter. The audio prompt names the form to find. The speaker is optional; the sound is only reinforcement.',
        'An incorrect tap simply gives another chance to look carefully. The sticker celebrates finding both forms, not a score.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ഒരു അക്ഷരത്തിന്റെ വലിയ രൂപവും ചെറിയ രൂപവും ശ്രദ്ധിക്കാൻ ഈ പ്രവർത്തനം കുട്ടിയെ സഹായിക്കുന്നു. ഏത് രൂപം കണ്ടെത്തണമെന്ന് ഓഡിയോ നിർദേശം പറയുന്നു. സ്പീക്കർ ആവശ്യമെങ്കിൽ മാത്രം ഉപയോഗിക്കാം; ശബ്ദം ഓർമ്മിപ്പിക്കാനാണ്.',
        'തെറ്റായ അക്ഷരം തൊട്ടാൽ ശ്രദ്ധിച്ച് വീണ്ടും നോക്കാനുള്ള അവസരം മാത്രമാണ് ലഭിക്കുന്നത്. രണ്ട് രൂപങ്ങളും കണ്ടെത്തിയതിനെ സ്റ്റിക്കർ ആഘോഷിക്കുന്നു; ഇത് സ്കോർ അല്ല.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'यह गतिविधि बच्चे को एक अक्षर के बड़े और छोटे रूप पहचानने में मदद करती है। ऑडियो निर्देश बताता है कि कौन-सा रूप ढूँढ़ना है। स्पीकर वैकल्पिक है; ध्वनि केवल याद दिलाने के लिए है।',
        'गलत अक्षर दबाने पर बस ध्यान से देखने का एक और मौका मिलता है। स्टिकर दोनों रूप ढूँढ़ने का उत्सव है, कोई अंक नहीं।',
      ],
    },
  },
  word: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'Let your child tap the letters from left to right. The app plays each sound, blends the word, and gives your child a chance to try reading it.',
        'Pictures and sentences help with meaning. Your child does not need to read every sentence yet; replay the audio whenever needed.',
        'The word sticker celebrates trying, not verified reading or pronunciation.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'കുട്ടി അക്ഷരങ്ങൾ ഇടത്തുനിന്ന് വലത്തേക്ക് തൊടട്ടെ. ആപ്പ് ഓരോ ശബ്ദവും കേൾപ്പിച്ച് വാക്ക് ചേർക്കുകയും അത് വായിക്കാൻ കുട്ടിക്ക് അവസരം നൽകുകയും ചെയ്യും.',
        'ചിത്രങ്ങളും വാക്യങ്ങളും അർത്ഥം മനസ്സിലാക്കാൻ സഹായിക്കും. കുട്ടി ഇപ്പോൾ എല്ലാ വാക്യങ്ങളും വായിക്കേണ്ടതില്ല; ആവശ്യമെങ്കിൽ ഓഡിയോ വീണ്ടും കേൾക്കാം.',
        'വാക്കിന്റെ സ്റ്റിക്കർ ശ്രമത്തെ ആഘോഷിക്കുന്നു; വായനയെയോ ഉച്ചാരണത്തെയോ പരിശോധിക്കുന്ന സ്കോർ അല്ല.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'बच्चे को अक्षरों को बाएँ से दाएँ दबाने दें। ऐप हर ध्वनि बजाकर शब्द बनाएगा और बच्चे को उसे पढ़ने की कोशिश करने का अवसर देगा।',
        'चित्र और वाक्य अर्थ समझने में मदद करते हैं। बच्चे को अभी हर वाक्य पढ़ना ज़रूरी नहीं है; ज़रूरत हो तो ऑडियो फिर से सुनें।',
        'शब्द का स्टिकर कोशिश का उत्सव है; यह पढ़ने या उच्चारण की जाँच का अंक नहीं है।',
      ],
    },
  },
  sentence: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language', audioLabel: 'Child audio',
      paragraphs: [
        'Let your child listen to the sentence, then find the word they hear. The other words make the sentence feel real; this is word finding, not a test of every word.',
        'Your child does not need to read the whole sentence yet. Encourage listening, looking and trying. Hear it again whenever needed.',
        'The other words help your child hear the whole sentence. They do not need to read every word yet.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ', audioLabel: 'കുട്ടിക്കുള്ള ഓഡിയോ',
      paragraphs: [
        'ആദ്യം ആപ്പ് മുഴുവൻ വാക്യം വായിക്കും. പിന്നീട് പറയുന്ന വാക്ക് കുട്ടി വാക്യത്തിൽ നിന്ന് കണ്ടെത്തി തൊടണം. എല്ലാ വാക്കുകളും വായിച്ചുകേൾപ്പിക്കാനുള്ള പരീക്ഷണമല്ല ഇത്.',
        'കുട്ടി ഇപ്പോൾ മുഴുവൻ വാക്യം വായിക്കേണ്ടതില്ല. കേൾക്കാനും നോക്കാനും ശ്രമിക്കാനും പ്രോത്സാഹിപ്പിക്കുക. ആവശ്യമെങ്കിൽ വീണ്ടും കേൾക്കാം.',
        'മറ്റു വാക്കുകൾ മുഴുവൻ വാക്യം കേൾക്കാൻ സഹായിക്കുന്നു. കുട്ടി ഇപ്പോൾ ഓരോ വാക്കും വായിക്കേണ്ടതില്ല.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा', audioLabel: 'बच्चे का ऑडियो',
      paragraphs: [
        'पहले ऐप पूरा वाक्य पढ़ेगा। फिर वह एक शब्द बोलेगा और बच्चा उस शब्द को वाक्य में ढूँढ़कर छुएगा। यह हर शब्द पढ़ने की परीक्षा नहीं है।',
        'बच्चे को अभी पूरा वाक्य पढ़ना ज़रूरी नहीं है। उसे सुनने, देखने और कोशिश करने के लिए प्रोत्साहित करें। ज़रूरत हो तो फिर से सुनें।',
        'बाकी शब्द बच्चे को पूरा वाक्य सुनने में मदद करते हैं। उसे अभी हर शब्द पढ़ने की ज़रूरत नहीं है।',
      ],
    },
  },
  trace: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'This is gentle tracing practice, not a handwriting test. The audio prompt may remind your child to start at the dot or follow the dots.',
        'There is no score, and one completed practice is enough. For pencil practice, choose Write on paper and let your child work at their own pace.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ഇത് സാവധാനത്തിലുള്ള ട്രേസിംഗ് പരിശീലനമാണ്; കൈയെഴുത്ത് പരീക്ഷണമല്ല. ഡോട്ടിൽ നിന്ന് തുടങ്ങാനോ ഡോട്ടുകൾ പിന്തുടരാനോ ഓഡിയോ നിർദേശം കുട്ടിയെ ഓർമ്മിപ്പിച്ചേക്കാം.',
        'സ്കോർ ഒന്നുമില്ല; ഒരു തവണ പൂർത്തിയാക്കിയാൽ മതി. പേപ്പറിൽ പരിശീലിക്കാൻ Write on paper തിരഞ്ഞെടുക്കുക, കുട്ടിയെ സ്വന്തം വേഗത്തിൽ എഴുതാൻ അനുവദിക്കുക.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'यह हल्का tracing अभ्यास है, लिखावट की परीक्षा नहीं। ऑडियो निर्देश बच्चे को बिंदु से शुरू करने या बिंदुओं पर चलने की याद दिला सकता है।',
        'कोई अंक नहीं हैं और एक बार पूरा करना पर्याप्त है। कागज़ पर अभ्यास के लिए Write on paper चुनें और बच्चे को अपनी गति से लिखने दें।',
      ],
    },
  },
  paper: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'Write on paper is an optional, real-world practice moment. Let your child look at the letter and try it with a relaxed grip.',
        'One attempt is enough to continue. There is no score and no handwriting accuracy test; extra practice is always welcome.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'Write on paper ഒരു ഐച്ഛികമായ പേപ്പർ പരിശീലനമാണ്. കുട്ടി അക്ഷരം നോക്കി, പേന സാവധാനം പിടിച്ച് എഴുതാൻ ശ്രമിക്കട്ടെ.',
        'തുടരാൻ ഒരു ശ്രമം മതി. സ്കോറോ കൈയെഴുത്തിന്റെ കൃത്യതാ പരിശോധനയോ ഇല്ല; കൂടുതൽ പരിശീലനം വേണമെങ്കിൽ ചെയ്യാം.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'Write on paper असली जीवन से जुड़ा वैकल्पिक अभ्यास है। बच्चे को अक्षर देखकर आराम से पेंसिल पकड़कर लिखने दें।',
        'आगे बढ़ने के लिए एक कोशिश पर्याप्त है। कोई अंक या लिखावट की शुद्धता की जाँच नहीं है; बच्चा चाहे तो और अभ्यास कर सकता है।',
      ],
    },
  },
  introduction: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'This short introduction lets your child hear the recorded sound and then gives them a turn to try it. The next topic provides the mouth model.',
        'Progress records participation in the introduction, not a watched video or confirmed sound knowledge.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ഈ ചെറിയ പരിചയപ്പെടുത്തലിൽ കുട്ടി റെക്കോർഡ് ചെയ്ത ശബ്ദം കേട്ട ശേഷം അത് പറയാൻ ശ്രമിക്കും. അടുത്ത വിഷയം വായുടെ മാതൃക കാണിക്കും.',
        'ഇത് പരിചയപ്പെടുത്തലിൽ പങ്കെടുത്തതായി മാത്രമാണ് രേഖപ്പെടുത്തുന്നത്; വീഡിയോ കണ്ടതായോ ശബ്ദം പൂർണ്ണമായി പഠിച്ചതായോ അല്ല.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'यह छोटा परिचय बच्चे को रिकॉर्ड की गई ध्वनि सुनने और फिर उसे आज़माने का अवसर देता है। अगली गतिविधि मुँह का मॉडल दिखाती है।',
        'प्रगति में केवल इस परिचय में भाग लेना दर्ज होता है; यह वीडियो देखने या ध्वनि पूरी तरह सीख लेने का प्रमाण नहीं है।',
      ],
    },
  },
  preview: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'This is a short preview of the next activity. Continuing opens the real practice; it does not mark the child as having watched a teaching video or mastered the skill.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ഇത് അടുത്ത പ്രവർത്തനത്തിന്റെ ചെറിയ പരിചയപ്പെടുത്തലാണ്. തുടരുമ്പോൾ യഥാർത്ഥ പരിശീലനം തുറക്കും; കുട്ടി പഠിപ്പിക്കുന്ന വീഡിയോ കണ്ടുവെന്നോ കഴിവ് പൂർണ്ണമായി നേടിയെന്നോ ഇത് രേഖപ്പെടുത്തുന്നില്ല.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'यह अगली गतिविधि का छोटा preview है। आगे बढ़ने पर असली अभ्यास खुलेगा; इससे बच्चे के वीडियो देखने या कौशल सीख लेने का प्रमाण नहीं मिलता।',
      ],
    },
  },
  review: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'Let your child listen first, then match the word or try reading it. The child does not need to read every sentence independently yet.',
        'The sticker celebrates participation and effort, not pronunciation accuracy. Pause and talk in your home language whenever useful.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'ആദ്യം കുട്ടിയെ കേൾക്കാൻ അനുവദിക്കുക; ശേഷം വാക്ക് പൊരുത്തപ്പെടുത്താനോ വായിക്കാൻ ശ്രമിക്കാനോ പറയാം. കുട്ടി ഇപ്പോൾ എല്ലാ വാക്യങ്ങളും സ്വതന്ത്രമായി വായിക്കേണ്ടതില്ല.',
        'സ്റ്റിക്കർ പങ്കാളിത്തത്തെയും ശ്രമത്തെയും ആഘോഷിക്കുന്നു; ഉച്ചാരണത്തിന്റെ കൃത്യത പരിശോധിക്കുന്നതല്ല. ആവശ്യമെങ്കിൽ വീട്ടിലെ ഭാഷയിൽ സംസാരിച്ച് ഇടവേള നൽകാം.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'पहले बच्चे को सुनने दें, फिर शब्द का मिलान करने या पढ़ने की कोशिश करने दें। बच्चे को अभी हर वाक्य अकेले पढ़ना ज़रूरी नहीं है।',
        'स्टिकर भागीदारी और प्रयास का उत्सव है; यह उच्चारण की शुद्धता की जाँच नहीं है। ज़रूरत हो तो अपनी घरेलू भाषा में बात करके विराम दें।',
      ],
    },
  },
  application: {
    en: {
      summary: 'For grown-ups', languageLabel: 'Help language',
      paragraphs: [
        'These familiar words give your child a chance to try reading before hearing a model or seeing a picture. Help and replay are always available.',
        '“I tried it” records a turn, not verified reading or pronunciation. The word-garden sticker celebrates effort.',
      ],
    },
    ml: {
      summary: 'മുതിർന്നവർക്കായി', languageLabel: 'സഹായ ഭാഷ',
      paragraphs: [
        'പരിചിതമായ ഈ വാക്കുകൾ കുട്ടിക്ക് മാതൃക കേൾക്കുകയോ ചിത്രം കാണുകയോ ചെയ്യുന്നതിന് മുമ്പ് വായിക്കാൻ ശ്രമിക്കാനുള്ള അവസരം നൽകുന്നു. സഹായവും വീണ്ടും കേൾക്കാനുള്ള സൗകര്യവും എപ്പോഴും ലഭ്യമാണ്.',
        '“I tried it” ഒരു ശ്രമം രേഖപ്പെടുത്തുന്നതാണ്; വായനയെയോ ഉച്ചാരണത്തെയോ പരിശോധിക്കുന്നതല്ല. വാക്കുകളുടെ തോട്ടത്തിലെ സ്റ്റിക്കർ ശ്രമത്തെ ആഘോഷിക്കുന്നു.',
      ],
    },
    hi: {
      summary: 'बड़ों के लिए', languageLabel: 'सहायता की भाषा',
      paragraphs: [
        'ये परिचित शब्द बच्चे को मॉडल सुनने या चित्र देखने से पहले पढ़ने की कोशिश करने का अवसर देते हैं। Help और replay हमेशा उपलब्ध हैं।',
        '“I tried it” केवल एक कोशिश दर्ज करता है; पढ़ने या उच्चारण की जाँच नहीं करता। शब्द-बगीचे का स्टिकर प्रयास का उत्सव है।',
      ],
    },
  },
};

export const sentenceParentHelp = {
  en: { instructions: parentHelpContent.sentence.en.paragraphs[0], reassurance: parentHelpContent.sentence.en.paragraphs[1], label: parentHelpContent.sentence.en.audioLabel! },
  ml: { instructions: parentHelpContent.sentence.ml.paragraphs[0], reassurance: parentHelpContent.sentence.ml.paragraphs[1], label: parentHelpContent.sentence.ml.audioLabel! },
  hi: { instructions: parentHelpContent.sentence.hi.paragraphs[0], reassurance: parentHelpContent.sentence.hi.paragraphs[1], label: parentHelpContent.sentence.hi.audioLabel! },
};
