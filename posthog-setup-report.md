# PostHog post-wizard report

The wizard has completed a deep integration of this Next.js App Router project by installing the PostHog browser and server SDKs, adding client initialization through `instrumentation-client.ts`, wiring environment variables through `.env.local`, and instrumenting core engagement events across the homepage, navigation, and featured event discovery flow. A production build was run successfully after the edits.

| Event name | Description | File |
| --- | --- | --- |
| `featured_events_viewed` | Captures when the featured events section is displayed on the homepage. | `app/page.tsx` |
| `explore_events_clicked` | Captures when a visitor clicks the primary call to action to explore events. | `components/ExlporeBtn.tsx` |
| `event_card_clicked` | Captures when a visitor opens an event card from the featured events list. | `components/EventCard.tsx` |
| `navigation_link_clicked` | Captures when a visitor uses the main navigation to move through the site. | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/513468/dashboard/1851999)
- [Featured events views (wizard)](https://us.posthog.com/project/513468/insights/Dj6FFrBO)
- [Explore CTA clicks (wizard)](https://us.posthog.com/project/513468/insights/kiYii3Qz)
- [Event card clicks by title (wizard)](https://us.posthog.com/project/513468/insights/CHBxEFIc)
- [Homepage engagement funnel (wizard)](https://us.posthog.com/project/513468/insights/J0yFRZEO)
- [Navigation clicks by label (wizard)](https://us.posthog.com/project/513468/insights/OFXMfGRD)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names added here to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or bundler upload) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
