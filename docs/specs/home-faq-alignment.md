# Homepage FAQ alignment

Owner requested consistency with the FAQ page. Reuse its disclosure design through a shared `css/faq-disclosures.css`, retaining Home's five questions/answers and View Full FAQ link. Extract the same rules from `css/stylefaq.css`; remove Home's obsolete blue checkbox-era styles. No business-copy reconciliation, pricing, other sections or booking changes. Existing differently worded answers remain an editorial decision (the full FAQ wash/detail answer also contains an old menu reference).

Use frontend design guidance for consistent typography, whitespace and restrained chevron motion. No new images, libraries or hero changes are needed for this focused component update.

Verify five Home disclosures open/close using pointer and keyboard, independent expansion, mobile/desktop widths, same appearance as FAQ page and unchanged answer markup. Recheck one FAQ page item after shared CSS extraction. Update the brand guide with the shared stylesheet location.

Verification: all five Home items opened/closed individually in the local browser; Enter/Space opened two independent answers then closed them. Mobile screenshot inspected at 390px with document width 390px. View Full FAQ navigation and full-page disclosure regression passed. All five answer texts matched the Git baseline after whitespace normalization. `git diff --check` and existing form mock tests passed. Browser viewport reset. No deployment, booking or inquiry performed.
