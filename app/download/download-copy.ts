export type DownloadLanguage = "en" | "ml";

export const downloadCopy = {
  en: {
    eyebrow: "English reading for ages 4–10",
    title: "Build an English word.",
    titleAccent: "From Lesson 1.",
    intro: "Listen to the sounds. Build the word. Explore its meaning.",
    offer: "9 lessons free.",
    noAccount: "First 4 without an account.",
    noAds: "No advertisements",
    noSubscription: "No recurring subscription",
    preview: "Inside Lesson 1",
    previewCaption: "An actual AptyRead app screen",
    wordAlt: "Build and read sat in AptyRead Lesson 1",
    storyAlt: "Pat sat, a page from the Pat and Pip story in Lesson 9",
    sequenceTitle: "One lesson builds on another.",
    sequenceBody: "Five progressive levels. Lessons open in order, bringing familiar sounds and words into each new step.",
    storyEyebrow: "Included in your free lessons",
    storyTitle: "First words. A little story.",
    storyBody: "Meet Pat and Pip in Lesson 9. Read their story together and enjoy it again in My library.",
    accountDetail: "A free parent account lets you continue through Lessons 5–9.",
    purchaseTitle: "Continue when you’re ready.",
    purchaseBody: "From Lesson 10, continue with a one-time level purchase. Levels are bought separately, with no expiry. Your store shows the price before you buy.",
    help: "Questions before you start?",
    languageLabel: "Read in Malayalam",
  },
  ml: {
    eyebrow: "4–10 വയസ്സുള്ള കുട്ടികൾക്ക്",
    title: "ആദ്യ പാഠം മുതൽ",
    titleAccent: "ഇംഗ്ലീഷ് വായിച്ചു തുടങ്ങാം.",
    intro: "ശബ്ദങ്ങൾ കേൾക്കാം. ചേർത്ത് വാക്കുകൾ വായിക്കാം. അർത്ഥവും മനസ്സിലാക്കാം.",
    offer: "ആദ്യ 9 പാഠങ്ങൾ സൗജന്യം.",
    noAccount: "ആദ്യ 4 പാഠങ്ങൾക്ക് അക്കൗണ്ട് വേണ്ട.",
    noAds: "പരസ്യങ്ങളില്ല",
    noSubscription: "ആവർത്തിച്ചുള്ള സബ്‌സ്‌ക്രിപ്ഷനില്ല",
    preview: "ആദ്യ പാഠത്തിൽ നിന്ന്",
    previewCaption: "AptyRead ആപ്പിലെ യഥാർത്ഥ സ്ക്രീൻ",
    wordAlt: "AptyRead ആദ്യ പാഠത്തിൽ s, a, t ശബ്ദങ്ങൾ ചേർത്ത് sat വായിക്കുന്നു",
    storyAlt: "ഒൻപതാം പാഠത്തിലെ Pat and Pip കഥയിൽ നിന്നുള്ള Pat sat എന്ന പേജ്",
    sequenceTitle: "ഓരോ പാഠവും അടുത്ത ചുവടിലേക്ക്.",
    sequenceBody: "അഞ്ച് ലെവലുകളിലായി ക്രമത്തിൽ തുറക്കുന്ന പാഠങ്ങൾ. പഠിച്ച ശബ്ദങ്ങളും വാക്കുകളും അടുത്ത പാഠങ്ങളിൽ വീണ്ടും ഉപയോഗിക്കുന്നു.",
    storyEyebrow: "സൗജന്യ പാഠങ്ങളിൽ ഉൾപ്പെടുന്നു",
    storyTitle: "ആദ്യ വാക്കുകളിൽ നിന്ന് ഒരു കഥയിലേക്ക്.",
    storyBody: "ഒൻപതാം പാഠത്തിൽ Pat and Pip കഥ പരിചയപ്പെടാം. കുട്ടിയോടൊപ്പം വായിക്കാം. My library-യിൽ വീണ്ടും ആസ്വദിക്കാം.",
    accountDetail: "5–9 പാഠങ്ങൾക്ക് രക്ഷിതാവിന്റെ സൗജന്യ അക്കൗണ്ട് ആവശ്യമാണ്.",
    purchaseTitle: "തുടരാൻ തയ്യാറാകുമ്പോൾ.",
    purchaseBody: "പത്താം പാഠം മുതൽ തുടരാൻ ലെവൽ വാങ്ങാം. ഓരോ ലെവലിനും ഒറ്റത്തവണ പണമടച്ചാൽ മതി. വാങ്ങിയ ലെവലിന് കാലാവധിയില്ല. വാങ്ങുന്നതിന് മുമ്പ് സ്റ്റോറിൽ വില കാണാം.",
    help: "ചോദ്യങ്ങളുണ്ടോ?",
    languageLabel: "Read in English",
  },
} as const;

type Query = Record<string, string | string[] | undefined>;
const KERALA_CAMPAIGN = "kerala_ml_launch_202611";

export function downloadLanguage(query: Query): DownloadLanguage {
  if (query.lang === "en" || query.lang === "ml") return query.lang;
  return query.utm_campaign === KERALA_CAMPAIGN ? "ml" : "en";
}

// Keep the known ad labels when switching language, without reflecting arbitrary
// query values or personal information into the page's links.
export function downloadLanguageHref(query: Query, language: DownloadLanguage): string {
  const params = new URLSearchParams({ lang: language });
  if (query.utm_campaign === KERALA_CAMPAIGN || query.utm_campaign === "tracking_check") {
    const qa = query.utm_campaign === "tracking_check";
    params.set("utm_source", qa ? "qa" : "instagram");
    params.set("utm_medium", qa ? "test" : "paid_social");
    params.set("utm_campaign", query.utm_campaign);
    if (query.utm_content === "poster" || query.utm_content === "video") {
      params.set("utm_content", query.utm_content);
    }
  }
  return `/download?${params.toString()}`;
}