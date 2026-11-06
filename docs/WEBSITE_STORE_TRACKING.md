# Website store-button measurement

The optional GA4 website stream measures **store-button taps**, not installs,
lesson completion, or purchases. Standard GA4 provides these reports without a
Vercel upgrade. Reports cover visitors who allow Google Analytics and whose
browser permits measurement, so they are not a complete census of store taps.

## Configuration

- Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` to the dedicated website stream's `G-...`
  ID, then build/deploy. An absent or malformed ID disables this feature.
- Prepared stream: **AptyRead website**, stream ID `16283941300`, measurement
  ID `G-TBLBX54GYM`, under property `515656711`. The example environment file
  contains this public ID; it is not a credential.
- Turn **Enhanced Measurement off** for this website stream. All page views and
  store taps are sent explicitly. Automatic history, outbound-click and form
  tracking must not follow users into learning or admin routes.
- Leave existing Android/iOS streams unchanged. This implementation reuses the
  existing Google tag script and routes its new events only to the website G-ID.
- Register event-scoped custom dimensions for `store`, `ad_variant`, and
  `campaign`. Do not mark taps as purchases or import them as app installations.
- Google signals and advertising personalization are disabled in the stream's
  code configuration. No reader/account identifiers are attached.

## Reports

Filter to the dedicated website stream and `store_click`. Compare `campaign`,
`ad_variant` and `store` against event count. For the first Kerala campaign,
filter `campaign = kerala_ml_launch_202611`, then compare `poster` and `video`.
Divide each creative's Meta ad spend by its **measured** store taps to derive
cost per measured store tap. Keep Meta landing-page views as a separate metric.

The prepared URLs use `utm_source=instagram`, `utm_medium=paid_social`,
`utm_campaign=kerala_ml_launch_202611`, and `utm_content=poster` or `video`.
Only these exact labels enter the initial campaign report. Unknown or malformed
tags become `other`. Valid attribution lasts at most 30 minutes in tab session
storage, persists across internal links, and is cleared on withdrawal.

## Consent and exclusions

The website asks separately for optional Google Analytics. Before permission,
it does not configure the G-ID or send its events. The footer's Analytics
preferences button lets a visitor withdraw. This choice does not change the
pre-existing Vercel Analytics or Google Ads setup; the prompt and privacy page
say so explicitly.

Only known public pages on `aptyread.ai` and `www.aptyread.ai` can send data.
Local/preview hosts, admin, authentication, learning and app-policy routes are
excluded. Outgoing GA4 URLs contain only known public paths and approved
campaign labels, not arbitrary queries, fragments, reader IDs or referrers.

## Verification before campaign launch

1. Run `node --test scripts/test-website-analytics.cjs scripts/test-store-links.cjs scripts/test-measurement-boundaries.cjs`.
2. Check the desktop/mobile consent prompt and footer preferences locally with
   a configured ID. Local checks must not send production events.
3. After deployment, use `/download?utm_source=qa&utm_medium=test&utm_campaign=tracking_check&utm_content=poster`
   and the equivalent `video` URL. Allow analytics and click each store button.
4. Confirm `store_click` reaches the correct GA4 website stream in DebugView,
   with `campaign=tracking_check`, the chosen variant and the correct store.
   Standard reports can take 24–48 hours. A browser queue alone is not proof.
5. Decline/withdraw and repeat. No new GA4 website events should be sent. Check
   excluded routes after client navigation and verify Safari store navigation
   still works with the tracker blocked or unavailable.

Never include QA events in the paid campaign result. Existing `install_click`
is the legacy Vercel event name only; the new GA4 event deliberately uses the
more accurate `store_click` label.
