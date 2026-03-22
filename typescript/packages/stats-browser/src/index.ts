import { init, track } from '@codeserk/forge-stats'

/** Reads config from the current script tag's data attributes. */
function readConfig(): { baseUrl: string; sdk: string } | undefined {
  const script = document.currentScript as HTMLScriptElement | null
  const baseUrl = script?.dataset.baseUrl
  const sdk = script?.dataset.sdk

  if (!baseUrl || !sdk) {
    console.error('[forge-stats] Missing data-base-url or data-sdk on the script tag.')
    return
  }

  return { baseUrl, sdk }
}

/** Sends a page view event for the current location. */
function trackPageView(): void {
  track({
    content: [{ type: 'View', name: window.location.pathname }],
    referrer: document.referrer,
  })
}

/** Patches history.pushState to detect SPA navigation. */
function patchHistory(): void {
  const original = history.pushState.bind(history)
  history.pushState = (...args) => {
    original(...args)
    trackPageView()
  }
}

function setup(): void {
  const config = readConfig()
  if (!config) {
    return
  }

  init(config)

  // Astro View Transitions
  if (document.documentElement.dataset.astroTransition !== undefined) {
    document.addEventListener('astro:page-load', () => trackPageView())
    return
  }

  // SPA - history-based navigation
  patchHistory()
  window.addEventListener('popstate', () => trackPageView())

  // Initial page view
  trackPageView()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup)
} else {
  setup()
}
