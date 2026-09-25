# Malayalam sharing image and installation support

25 September 2026

## Sharing image

The Malayalam homepage and dashboard now explicitly declare their own Open Graph and Twitter large-image card. The English homepage keeps its existing image. The new card centres a child leading a discovery in a book with her mother encouraging her. It is an illustrative AI-generated scene, not a testimonial or a photograph of an enrolled learner.

Final web asset: `public/images/aptymalayalam-social-share-v1.jpg` (1200 × 630). Generated with the built-in image-generation tool, using `public/images/aptyread-social-share.png` as a style reference. The selected output was mechanically resized and encoded as JPEG with Sharp; no photographic content or wording was changed during that export. The generated original is retained in the host's generated-images folder.

### Final generation prompt

Use case: ads-marketing. Create one polished social sharing image for AptyMalayalam, a child-led Malayalam literacy web app for Malayalam-speaking children around age 5. The supplied image is a STYLE AND BRAND REFERENCE, not an image to overwrite. Create a new finished landscape sharing card with aspect ratio 1200:630, all essential content safely inset 55 pixels. Closely match the reference's clean indigo (#173A8A), cyan/teal (#007F96), pale cyan (#E6F6FB), and warm cream palette, clear generous typography, calm premium parent appeal. LEFT half: large natural editorial photograph, softly rounded rectangular crop, showing a happy young Malayalee girl about 5-6 years old in casual modern clothing at a table at home, leading the moment herself, pointing to a simple hill illustration in an open picture book with her mother beside her smiling at the child's discovery. The child is the visual focus; mother encourages instead of directing. Bright natural window light, believable hands and proportions, warm emotional connection, no school uniform, no stereotyping. No readable text in the book, just a hill illustration; do not invent Malayalam glyphs. RIGHT half: clean pale cyan panel with high contrast indigo typography. Exact text only: brand 'AptyMalayalam' with Apty indigo and Malayalam teal; small 'by AptyRead'; large headline over three lines 'Little steps.' / 'A world of' / 'Malayalam words.'; smaller supporting line 'Learn to read Malayalam'; small teal rounded capsule text 'Explore the preview'; tiny footer 'aptyread.ai/malayalam'. Clear hierarchy, large legible headline even in a link preview. No mascot, no cartoon, no testimonials, no rating stars, no scientific claims, no badge saying app store. Finish as a coherent professional raster social card, not a mockup of a card in a device.

The reviewed output keeps the required wording, though its last headline line is wider and closer to the edge than the requested 55-pixel inset. At 1200 × 630, the words remain fully visible and legible. Existing sharing-service caches may retain an older preview until they fetch the page again.

## Installation

The manifest lives at `/malayalam/manifest.webmanifest`, has the stable ID and scope `/malayalam`, and starts at `/malayalam/dashboard` in standalone mode. The scope intentionally includes the bare homepage URL and its nested dashboard; it does not include English or Hindi. Manifest scope is a URL-prefix UI setting, not a security boundary.

Both Malayalam routes link the manifest and declare Apple web-app metadata. Installation icons preserve the existing Apty mascot identity; the social-sharing card uses the new family scene. Icons are in `public/malayalam/icons/`: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` and `apple-touch-icon.png`. The maskable export has an inset subject and an opaque background. `scripts/create-malayalam-assets.mjs` regenerates these deterministic size variants, with an optional approved source image argument to export the sharing card.

`InstallApp` presents a user-triggered native prompt when the browser supplies `beforeinstallprompt`. Otherwise, it offers installation guidance, with separate Safari instructions for iPhone/iPad. It does not claim success from merely opening or accepting a prompt: installed UI is detected through standalone mode or the browser's `appinstalled` event. It disappears inside the installed app. There are no timed pop-ups or installation gates in lessons.

Safe-area padding supports device cutouts and the home indicator. Touch buttons use manipulation behaviour while preserving pinch zoom. The current dashboard already changes its views and previews locally without navigation reloads. Saved preview position continues to use browser local storage.

## Boundaries and verification

This is an online installable-app foundation. No service worker, downloaded lessons, offline cold launch, account sync or push notifications are implemented. An open dashboard can continue using its already-loaded preview if connectivity drops; a notice explains that opening another page or reloading needs a connection. Browser online status is a connectivity hint, not proof that the server is reachable.

`scripts/check-malayalam-install.cjs` checks metadata, manifest fields, icon/image dimensions, prompt acceptance/dismissal simulations, fallback-dialog focus, iOS guidance by user-agent simulation, installed-state detection simulation, offline notices and resumption after reconnecting. It also collects Chromium's native installability diagnostics. Simulation does not replace a physical iPhone/Android installation check. `scripts/check-malayalam-preview.cjs` remains the interaction and responsive regression check.

Physical device feedback should verify home-screen installation, the standalone launch target, return after closing the app, notch/home-indicator spacing and the real sharing preview in the team's preferred apps. The reading activities still require their reviewed recordings and teaching content before learning-effectiveness testing.
