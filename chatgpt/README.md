# WAGMI HQ LLC — developer handoff

This is the latest HTML/CSS/JavaScript prototype, including the business footer update. It is NOT a Next.js implementation. Use it as the visual, copy and interaction reference for the Next.js build. The hosted review URL may still show an older version; these files match the latest local source.

## Open the prototype
Open index.html in a browser. Styles, scripts and fonts are bundled locally. A local static server also works. No npm installation or build step is needed.

## Files
- index.html: homepage markup and embedded finalized brand mark.
- styles.css: existing styling, including sequential refinement overrides. Preserve cascade order when porting; consolidate rules after visual parity.
- script.js: work-category tabs, mobile-menu controls, package selection, VSL placeholder toggle and email-draft form behavior.
- assets/: the three Manrope font files used by the prototype. Confirm font license/provenance before production; the bundle does not include a license file.
- terms.html, privacy.html, refunds.html: explicit policy PLACEHOLDERS, not completed legal documents.
- LAUNCH_CHECKLIST.md: verified owner-supplied details and missing launch inputs.
- OFFER_SCOPE_REFERENCE.md: detailed scope reference. Older layout instructions inside that document are superseded by this README and current HTML. Do not restore public pricing or the removed comparison table.

## Next.js implementation handoff
Suggested page/component boundaries, not a supplied Next.js scaffold:
- Homepage: Navigation, Hero/VSL, Clients, About, Offers, Work, WhyUs, Process, FocusedProjects, Careers, Contact, Footer.
- Separate routes for terms, privacy and refund/cancellation policy; update footer links to the chosen route paths.
- Put local assets in the Next.js public directory or use the project's local font setup.
- Convert HTML attributes and inline styles to JSX. Replace DOM event listeners with React state/handlers for tabs, mobile menu, package selection and form behavior.
- Keep the public business description and offer content readable without requiring interaction.
- The form currently opens a mailto draft. It does not send or store inquiries. Implement server-side delivery with approved provider credentials and truthful success/error states before changing that claim. No credentials are included here.

## Preserve these decisions
- Legal name: WAGMI HQ LLC. Email: aghasaad@wagmihq.com.
- Address is MAILING address: 1001 S. Main St. #12995, Kalispell, MT 59901.
- Dark green #0C1814, cream #F4F1D6, Manrope, finalized logo silhouette. Keep original restrained layout.
- Compact responsive navigation. Brand stays on one line. Careers is clickable and has no Coming soon badge.
- Three outcome-led offers with three main points each. NO public prices. No exhaustive comparison on homepage.
- VSL frame: 16:9 with a contained width, not full bleed.
- The redundant strategy/production/distribution strip is removed.
- Mini offers remain secondary. Exact catalogue is still to be supplied.
- No dummy client quotes, unverified results or invented growth guarantees. Testimonials were removed pending actual assets.
- Keep marked insertion fields until real assets/content are ready, then replace or omit the unfinished sections for public launch.

## Scope and outstanding work
See LAUNCH_CHECKLIST.md. Real policies, final media, verified client links, automatic inquiry delivery and business-domain deployment remain to be finished. This package is a development reference, not evidence of payment-provider or bank approval.
