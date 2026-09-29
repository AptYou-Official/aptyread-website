export type ParentHelpLanguage = 'en' | 'ml' | 'hi';

export const parentHelpLanguages: { id: ParentHelpLanguage; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'ml', label: 'മലയാളം' },
  { id: 'hi', label: 'हिन्दी' },
];

export const sentenceParentHelp: Record<ParentHelpLanguage, { instructions: string; reassurance: string; label: string }> = {
  en: {
    instructions: 'Let your child listen to the sentence, then find the word they hear. The other words are there to make the sentence feel real; this is word finding, not a test of every word.',
    reassurance: 'Your child does not need to read the whole sentence yet. Encourage listening, looking and trying. Hear it again whenever needed.',
    label: 'Child audio',
  },
  ml: {
    instructions: 'ആദ്യം ആപ്പ് മുഴുവൻ വാക്യം വായിക്കും. പിന്നീട് പറയുന്ന വാക്ക് കുട്ടി വാക്യത്തിൽ നിന്ന് കണ്ടെത്തി തൊടണം. എല്ലാ വാക്കുകളും വായിച്ചുകേൾപ്പിക്കാനുള്ള പരീക്ഷണമല്ല ഇത്.',
    reassurance: 'കുട്ടി ഇപ്പോൾ മുഴുവൻ വാക്യം വായിക്കേണ്ടതില്ല. കേൾക്കാനും നോക്കാനും ശ്രമിക്കാനും പ്രോത്സാഹിപ്പിക്കുക. ആവശ്യമെങ്കിൽ വീണ്ടും കേൾക്കാം.',
    label: 'കുട്ടിക്കുള്ള ഓഡിയോ',
  },
  hi: {
    instructions: 'पहले ऐप पूरा वाक्य पढ़ेगा। फिर वह एक शब्द बोलेगा और बच्चा उस शब्द को वाक्य में ढूँढ़कर छुएगा। यह हर शब्द पढ़ने की परीक्षा नहीं है।',
    reassurance: 'बच्चे को अभी पूरा वाक्य पढ़ना ज़रूरी नहीं है। उसे सुनने, देखने और कोशिश करने के लिए प्रोत्साहित करें। ज़रूरत हो तो फिर से सुनें।',
    label: 'बच्चे का ऑडियो',
  },
};
